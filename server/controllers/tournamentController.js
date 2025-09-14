import { populate } from "dotenv";
import Group from "../models/group.js";
import PointsTable from "../models/pointsTable.js";
import Team from "../models/team.js";
import Tournament from "../models/tournament.js";
import TournamentFormat from "../models/TournamentFormat.js";
import User from "../models/user.js";

export const getAllTournaments = async (req, res) => {
  try {
    console.log("Fetching all tournaments");
    const tournaments = await Tournament.find({});
    res.status(200).json(tournaments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tournaments", error });
  }
};

export const createTournament = async (req, res) => {
  try {
    console.log("Creating tournament with data:", req.body, req.user);
    const tournament = await Tournament.create({ ...req.body, tournamentAdmin: req.user.id, });

    //await tournament.save();

    //check tournament Format

    const tournamentFormat = await TournamentFormat.findById(req.body.format);
    if (!tournamentFormat) {
      return res.status(400).json({ message: "Invalid tournament format" });
    }


    //add points table if not league
    if (tournamentFormat.name !== "League") {

      const pointsTable = await PointsTable.create({
        name: req.body.name + " Points Table",
        tournament: tournament._id,
        entries: [],
      });

      tournament.pointsTable.push(pointsTable._id);
      await tournament.save();
    }


    res.status(201).json(tournament);
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ message: "Error creating tournament", error });
  }
};

export const getTournamentById = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id).populate("format")
    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }

    if (tournament?.status === "completed") {
      await tournament.populate({ path: "winner", select: "name" });
    }

    if (tournament?.status === "scheduled") {
      await tournament.populate({ path: "enrolledUser.user", select: "firstName lastName" });
    }
    res.status(200).json(tournament);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tournament", error });
  }
};
export const updateTournament = async (req, res) => {
  try {
    const tournament = await Tournament.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }
    res.status(200).json(tournament);
  } catch (error) {
    res.status(500).json({ message: "Error updating tournament", error });
  }
};
export const deleteTournament = async (req, res) => {
  try {
    const tournament = await Tournament.findByIdAndDelete(req.params.id);
    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }
    res.status(200).json({ message: "Tournament deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting tournament", error });
  }
};

export const getTournamentTeams = async (req, res) => {
  console.log("Query Params:", req.query.filter);
  try {
    console.log("Fetching teams for tournament with ID:", req.params.id);
    // const tournament = await Tournament.findById(req.params.id).populate(
    //   "teams"
    // );

    const tournament = await Tournament.findById(req.params.id).populate({
      path: "teams",
      populate: [{
        path: "team",
        populate: {
          path: "members",
        }
      }],
    });

    if (!tournament) {
      console.error("Tournament not found for ID:", req.params.id);
      return res.status(404).json({ message: "Tournament not found" });
    }

    if( req.query.filter === "unassigned"){
      const unassignedTeams = tournament.teams.filter(t => !t.assigned);
      return res.status(200).json(unassignedTeams);
    }

    // If no teams yet, return an empty array
    res.status(200).json(tournament.teams || []);
  } catch (error) {
    console.error("Error fetching tournament teams:", error);
    res.status(500).json({
      message: "Error fetching tournament teams",
      error: error.message,
    });
  }
};

export const addTournamentTeam = async (req, res) => {
  try {
    console.log("Req Body:", req.body);
    console.log("Adding team to tournament with ID:", req.params.id);

    //find tournament
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }

    //const team = req.body; // Assuming team data is sent in the request body
    //const team = new Team(req.body);
    const teamCreated = await Team.create(req.body)
    tournament.teams.push(teamCreated._id);
    await tournament.save();


    //check if the tournament has points table
    if (!tournament.pointsTable || tournament.pointsTable.length === 0) {
      return res
        .status(400)
        .json({ message: "Tournament does not have a points table" });
    }

    //add team to points table if exists
    let pointsTable = await PointsTable.findById(tournament.pointsTable[0]);
    pointsTable.entries.push({
      team: teamCreated._id,
      points: 0,
      gamesPlayed: 0,
      wins: 0,
      losses: 0,
      draws: 0,
      results: [],
    });
    await pointsTable.save();

    res.status(201).json(teamCreated);
  } catch (error) {
    res.status(500).json({ message: "Error adding team to tournament", error });
  }
};

export const getPointsTable = async (req, res) => {
  try {
    console.log("Fetching points table for tournament with ID:", req.params.id);
    // const tournament = await Tournament.findById(req.params.id)
    // if (!tournament || !tournament.pointsTable) {
    //   return res.status(404).json({ message: "Points table not found", tournament:tournament });
    // }
    const tournament = await Tournament.findById(req.params.id);
    const pointsTable = await PointsTable.find({
      tournament: req.params.id,
    }).populate("entries.team", "name");

    //pointsTable.entries.sort((a, b) => b.points - a.points);

    res.status(200).json(pointsTable);
  } catch (error) {
    console.error("Error fetching points table:", error);
    res.status(500).json({ message: "Error fetching points table", error });
  }
};

export const enrollIntoTournament = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.tournamentId);
    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user is already enrolled
    // if (tournament.enrolledUser.includes(user._id)) {
    //   return res.status(400).json({ message: "User is already enrolled" });
    // }

    const existingEnrollment = tournament.enrolledUser.some(enrollment => enrollment.user.toString() === user._id.toString());

    if (existingEnrollment) {
      return res.status(400).json({ message: "User is already enrolled" });
    }

    // tournament.enrolledUser.push(user._id);
    // user.tournaments.push(tournament._id);
    // await tournament.save();
    // await user.save();

    // Create an enrollment object for the user with the associated tournament
    const enrollment = {
      user: user._id,  // The user being enrolled
      assigned: false,  // Default assigned status (you can modify this if needed)
      assignedGroup: null,  // You can assign a group if needed, otherwise null
    };

    // Add the enrollment object to the tournament's enrolledUser array
    tournament.enrolledUser.push(enrollment);

    // Add the tournament's ID to the user's tournaments array (assuming 'tournaments' exists in the User schema)
    user.tournaments.push(tournament._id);

    // Save both the tournament and user documents
    await tournament.save();
    await user.save();

    res.status(200).json({ message: "Successfully enrolled into tournament" });
  } catch (error) {
    console.error("Error enrolling into tournament:", error);
    res.status(500).json({ message: "Error enrolling into tournament", error });
  }
};

export const getTournamentPlayers = async (req, res) => {
  try {
    console.log("Fetching players for tournament with ID:", req.params.id);
    const tournament = await Tournament.findById(req.params.id).populate({
      path: "enrolledUser",
      populate: [
        { path: "user", select: "firstName lastName" },
        { path: "assignedGroup", select: "name" }, // adjust fields as needed
      ],
    });

    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }

    res.status(200).json(tournament.enrolledUser);
  } catch (error) {
    console.error("Error fetching tournament players:", error);
    res.status(500).json({
      message: "Error fetching tournament players",
      error: error.message,
    });
  }
};

export const getTournamentGroups = async (req, res) => {
  try {
    console.log("Fetching groups for tournament with ID:", req.params.id);
    const tournament = await Tournament.findById(req.params.id).populate({
      path: "groups",
      populate: "teams",
    });
    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }

    res.status(200).json(tournament.groups || []);
  } catch (error) {
    console.error("Error fetching tournament groups:", error);
    res.status(500).json({
      message: "Error fetching tournament groups",
      error: error.message,
    });
  }
  // try{
  //   const {id, groupId} = req.params;
  //   console.log("Fetching group details for group with ID:", groupId);
  //   const group = await Group.findById(groupId).populate({
  //     path: "teams",
  //     select: "name",
  //   });

  //   if (!group) {
  //     return res.status(404).json({ message: "Group not found" });
  //   }

  //   res.status(200).json(group);  
  // } catch (error) {
  //   console.error("Error fetching group details:", error);
  //   res.status(500).json({
  //     message: "Error fetching group details",
  //     error: error.message,
  //   }); 

  // }
};

export const addTournamentGroup = async (req, res) => {
  try {
    console.log("Adding group to tournament with ID:", req.params.id);
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }

    //creating group points table
    // const group = req.body; // Assuming group data is sent in the request body
    // const newGroup = new Group(group);
    const groupCreated = await Group.create({ ...req.body, tournament: req.params.id });

    //adding newly created group to tournament
    tournament.groups.push(groupCreated._id);
    await tournament.save();

    //creating points table for the group
    const pointsTable = await PointsTable.create({
      name: req.body.name + " Points",
      tournament: req.params.id,
      group: groupCreated._id,
      entries: [],
    });

    groupCreated.pointsTable = pointsTable._id;
    await groupCreated.save();

    tournament.pointsTable.push(pointsTable._id);
    await tournament.save();

    res.status(201).json(groupCreated);
  } catch (error) {
    console.log("Error: ", error);
    res
      .status(500)
      .json({ message: "Error adding group to tournament", error });
  }
};

export const getTournamentGroupDetails = async (req, res) => {
  try {
    console.log(
      "Fetching group details for group with ID:",
      req.params.groupId
    );
    const group = await Group.findById(req.params.groupId).populate({
      path: "teams",
      populate: { path: "members", select: "firstName lastName" },
    });
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    res.status(200).json(group);
  } catch (error) {
    console.error("Error fetching group details:", error);
    res.status(500).json({
      message: "Error fetching group details",
      error: error.message,
    });
  }
};

export const getAllFormats = async (req, res) => {
  // try {
  //   console.log("Fetching all tournament formats");
  //   const formats = await GameFormat.find({});
  //   res.status(200).json(formats);
  // } catch (error) {
  //   res.status(500).json({ message: "Error fetching tournament formats", error });
  // }
  res.status(200).json([
    { name: "Knockout", description: "" },
    { name: "League", description: "" },
    { name: "Round-Robin", description: "" },
    { name: "Double Round Robin", description: "" },
    { name: "Double Elimination", description: "" },
    { name: "swiss", description: "" }
  ])
}

export const goLiveTournament = async (req, res) => {
  try {
    console.log("Going live for tournament with ID:", req.params.id);
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }

    if (tournament.tournamentAdmin.toString() !== req.user.id) {
      return res.status(403).json({ message: "Only tournament admin can go live" });
    }

    tournament.status = "live";
    await tournament.save();

    res.status(200).json({ message: "Tournament is now live", tournament });
  } catch (error) {
    res.status(500).json({ message: "Error going live with tournament", error });
  }
}

export const getTournamentFormat = async (req, res) => {
  try {
    console.log("Fetching tournament format for tournament with ID:", req.params.id);
    const tournament = await Tournament.findById(req.params.id).populate('format');
    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }
    if (!tournament.format) {
      return res.status(404).json({ message: "Tournament format not found" });
    }
    res.status(200).json(tournament.format);
  } catch (error) {
    console.error("Error fetching tournament format:", error);
    res.status(500).json({
      message: "Error fetching tournament format",
      error: error.message,
    });
  }
}