import Player from "../models/player.js";
import Team from "../models/team.js";

export const getAllTeams = async (req, res) => {
    try {
        const teams = await Team.find();
        res.status(200).json(teams);
    } catch (error) {
        res.status(500).json({ message: "Error fetching teams" });
    }
}

export const getTeamById = async (req, res) => {
    try{
        const team = await Team.findById(req.params.teamId).populate("members");
        if (!team) {
            return res.status(404).json({ message: "Team not found" });
        }
        res.status(200).json(team);
    } catch (error) {
        res.status(500).json({ message: "Error fetching team" });
    }
}
export const updateTeam = async (req, res) => {
    try {
        const team = await Team.findByIdAndUpdate(req.params.teamId, req.body, { new: true });
        if (!team) {
            return res.status(404).json({ message: "Team not found" });
        }
        res.status(200).json(team);
    } catch (error) {
        res.status(500).json({ message: "Error updating team" });
    }   
}
export const deleteTeam = async (req, res) => {
    try {
        const team = await Team.findByIdAndDelete(req.params.teamId);
        if (!team) {
            return res.status(404).json({ message: "Team not found" });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Error deleting team" });
    }   
}

export const addPlayerToTeam = async (req, res) => {
    //const { playerName } = req.body;
    console.log("Request body", req.body)

    const playerAdded = await Player.create(req.body)
    try {
        const team = await Team.findById(req.params.teamId);
        if (!team) {
            return res.status(404).json({ message: "Team not found" });
        }
        team.members.push(playerAdded._id);
        await team.save();
        res.status(201).json(team);
    } catch (error) {
        res.status(500).json({ message: "Error adding player to team" });
    }
}