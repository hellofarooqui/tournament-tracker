import PointsTable from "../models/pointsTable";

export const roundRobinPointsTable = async (name, groupId, tournamentId, teams) => {
    const numberOfTeams = teams.length;
    const pointsTableEntries = teams.map(team => ({
        teamType: 'Team',
        team: team._id,
        points: 0,
        gamesPlayed: 0,
        wins: 0,
        losses: 0,
        draws: 0,
        results: [],
    }));

    const pointsTableCreated = await PointsTable.create({
        name,
        group: groupId,
        tournament: tournamentId,
        entries: pointsTableEntries,
    });

    return pointsTableCreated;
}