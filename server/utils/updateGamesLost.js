import PointsTable from "../models/pointsTable.js";

const updateGamesLost = async (tournamentId, looserId, newResult) => {
    const pointsTable = await PointsTable.findOne({
        tournament: tournamentId,
    });
    if (!pointsTable) {
        return res.status(404).json({ message: "Points table not found" });
    }

    pointsTable.entries.map((entry) => {
        if (looserId == entry.team) {
            entry.losses += 1;
            entry.gamesPlayed += 1;
            entry.results.push(newResult);
        }
        return entry;
    });
    await pointsTable.save()
}

export default updateGamesLost