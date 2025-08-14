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
    const pointsTable = new PointsTable({
      name: req.body.name + "_Points",
      entries: [],
    });

    console.log("Creating tournament with data:", req.body);
    const tournament = new Tournament({ ...req.body, pointsTable: pointsTable._id });
    
    await tournament.save();
    res.status(201).json(tournament);
  } catch (error) {
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
    const tournament = await Tournament.findById(req.params.id).populate(
      "teams"
    );

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
    res.status(201).json(teamCreated);
  } catch (error) {
    res.status(500).json({ message: "Error adding team to tournament", error });
  }
};

export const getPointsTable = async (req, res) => {
  try {
    console.log("Fetching points table for tournament with ID:", req.params.id);
    const tournament = await Tournament.findById(req.params.id).populate("pointsTable");
    if (!tournament || !tournament.pointsTable) {
      return res.status(404).json({ message: "Points table not found" });
    }
    res.status(200).json(tournament.pointsTable);
  } catch (error) {
    console.error("Error fetching points table:", error);
    res.status(500).json({ message: "Error fetching points table", error });
  }
}

