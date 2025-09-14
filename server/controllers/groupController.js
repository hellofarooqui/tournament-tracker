import Group from "../models/group.js";
import PointsTable from "../models/pointsTable.js";

export const addMembersToGroup = async (req, res) => {
  try {
    const { groupId } = req.params; // Group ID
    //const { groupId, teamIds } = req.body; // Expecting groupId and an array of teamIds in the request body
    const groupFound = await Group.findById(groupId);
    if (!groupFound) {
      return res.status(404).json({ message: "Group not found" });
    }

    const tournament = await Tournament.findById(groupFound.tournament);
    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found for the group" });
    }

    const { teamIds } = req.body;

    groupFound.teams.push(...teamIds);
    await groupFound.save();

    //check if the group has points table

    if (groupFound.pointsTable) {
      const pointsTable = await PointsTable.create({
        name: groupFound.name + " Points Table",
        tournament: tournament._id,
        group: groupFound._id,
        entries: [],
      });

      groupFound.pointsTable = pointsTable._id;
      await groupFound.save();


      tournament.pointsTable.push(pointsTable._id);
      await tournament.save();
    }






    //add team to points table if exists
    let pointsTable = await PointsTable.findById(groupFound.pointsTable);

    teamIds.forEach(async (teamId) => {
      if (!pointsTable.entries.some(entry => entry.team.toString() === teamId)) {
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
    });
    await pointsTable.save();

    res.status(201).json({ message: "Teams added to group successfully", teams: groupFound.teams });
  } catch (error) {
    console.error("Error adding members to group:", error);
    res.status(500).json({
      message: "Error adding members to group",
      error: error.message,
    });
  }
}

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