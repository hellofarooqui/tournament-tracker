import PointsTable from "../models/pointsTable.js";
import Team from "../models/team.js";
import Tournament from "../models/tournament.js";

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
    console.log("Creating tournament with data:", req.body);
    const tournament = await Tournament.create({ ...req.body });

    //await tournament.save();

    const pointsTable = await PointsTable.create({
      name: req.body.name + "_Points",
      tournament: tournament._id,
      entries: [],
    });

    tournament.pointsTable = pointsTable._id;
    await tournament.save();

    res.status(201).json(tournament);
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ message: "Error creating tournament", error });
  }
};

export const getTournamentById = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found" });
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
  try {
    console.log("Fetching teams for tournament with ID:", req.params.id);
    // const tournament = await Tournament.findById(req.params.id).populate(
    //   "teams"
    // );

    const tournament = await Tournament.findById(req.params.id).populate({
      path: "teams",
      populate: {
        path: "members",
        select: "name",
      },
    });

    if (!tournament) {
      console.error("Tournament not found for ID:", req.params.id);
      return res.status(404).json({ message: "Tournament not found" });
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
    console.log("Adding team to tournament with ID:", req.params.id);
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }
    //const team = req.body; // Assuming team data is sent in the request body
    const team = new Team(req.body);
    const teamCreated = await team.save();
    tournament.teams.push(teamCreated._id);
    await tournament.save();

    let pointsTable = await PointsTable.findById(tournament.pointsTable);
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
    const pointsTable = await PointsTable.findById(
      tournament.pointsTable
    ).populate("entries.team", "name");

    pointsTable.entries.sort((a, b) => b.points - a.points);
    
    res.status(200).json(pointsTable);
  } catch (error) {
    console.error("Error fetching points table:", error);
    res.status(500).json({ message: "Error fetching points table", error });
  }
};
