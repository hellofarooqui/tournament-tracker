import PointsTable from "../models/pointsTable.js";

 const updateGamesPlayed = async (tournamentId, teams) => {
     const pointsTable = await PointsTable.findOne({
          tournament: tournamentId,
        });
        if (!pointsTable) {
          return res.status(404).json({ message: "Points table not found" });
        }
    
        //find the teams and update gamesPlayed by one
        pointsTable.entries.map((entry) => {
          if (teams.includes(entry.team)) {
            entry.gamesPlayed += 1;
          }
          return entry;
        });
        await pointsTable.save()
}

export default updateGamesPlayed