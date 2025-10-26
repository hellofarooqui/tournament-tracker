import PointsTable from "../models/pointsTable.js";

const updateGamesWon = async (tournamentId, winnerId, newResult) => {
    const pointsTable = await PointsTable.findOne({
        tournament: tournamentId,
    });
    if (!pointsTable) {
        return res.status(404).json({ message: "Points table not found" });
    }

    pointsTable.entries.map((entry) => {
        if (winnerId == entry.team) {
            entry.wins += 1;
            entry.points += 2;
            entry.gamesPlayed += 1;
            entry.results.push(newResult);
        }
        return entry;
    });
    await pointsTable.save()
}

export default updateGamesWon