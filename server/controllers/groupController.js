import Group from "../models/group.js";
import PointsTable from "../models/pointsTable.js";
import Tournament from "../models/tournament.js";

export const addMembersToGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { teamIds } = req.body;

    const groupFound = await Group.findById(groupId);
    if (!groupFound) {
      return res.status(404).json({ message: "Group not found" });
    }

    const tournament = await Tournament.findById(groupFound.tournament);
    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found for the group" });
    }

    // Add teams to group (avoid duplicates)
    const existingTeamIds = groupFound.teams.map((id) => id.toString());
    const newTeamIds = teamIds.filter(id => !existingTeamIds.includes(id));
    groupFound.teams.push(...newTeamIds);
    await groupFound.save();

    // Update tournament.teams -> assign group and status
    for (const teamId of teamIds) {
      const teamEntry = tournament.teams.find(
        (t) => t.team.toString() === teamId
      );

      if (teamEntry) {
        teamEntry.assigned = true;
        teamEntry.assignedGroup = groupFound._id;
      }
    }

    await tournament.save();

    // Add teams to existing points table (if exists)
    if (groupFound.pointsTable) {
      const pointsTable = await PointsTable.findById(groupFound.pointsTable);
     

      if (pointsTable) {
         console.log("Points Table found:", pointsTable);
        for (const teamId of teamIds) {
          const exists = pointsTable.entries.some(
            (entry) => entry.team.toString() === teamId
          );
          if (!exists) {
            pointsTable.entries.push({
              team: teamId,
              points: 0,
              gamesPlayed: 0,
              wins: 0,
              losses: 0,
              draws: 0,
              results: [],
            });
          }
        }

        await pointsTable.save();
      }
    }

    res.status(201).json({
      message: "Teams added to group successfully",
      teams: groupFound.teams,
    });
  } catch (error) {
    console.error("Error adding members to group:", error);
    res.status(500).json({
      message: "Error adding members to group",
      error: error.message,
    });
  }
};

export const getGroupDetails = async (req, res) => {
  try {
    const { groupId } = req.params;
    console.log("Fetching group details for group with ID:", groupId);
    const group = await Group.findById(groupId).populate({
      path: "teams",
      select: "name",
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
}