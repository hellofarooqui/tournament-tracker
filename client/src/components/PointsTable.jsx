import React, { useEffect } from 'react'
import { useParams } from 'react-router';
import usePointsTable from '../hooks/usePointsTable';
import { Loader2 } from 'lucide-react';
import abbrevation from '../utils/abbrevations';

const PointsTable = () => {
    const params = useParams();
    const tournamentId = params.id;
    const {fetchTournamentPointsTable} = usePointsTable()
    const [pointsTable, setPointsTable] = React.useState();
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    const fetchPointsTable = async () => {
        setLoading(true);
        try {
            const data = await fetchTournamentPointsTable(tournamentId);
            if (data) {
                console.log("Points table fetched successfully:", data.entries);
                setPointsTable(data.entries);
            } else {
                console.error("Points table not found");
            }
        } catch (error) {
            console.error("Error fetching points table:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchPointsTable();
    },[])

    if(loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <Loader2 className="animate-spin h-8 w-8 text-yellow-500" />
            </div>
        );
    }
    if(error) {
        return (
            <div className="w-full h-screen flex items-center justify-center py-16 font-dynapuff">
                <div className="text-red-500">Error fetching points table: {error.message}</div>
            </div>
        );
    }

  return (
    <div className="w-full p-4 bg-dark-brown-03 rounded-lg shadow-lg text-light-brown-03 font-dynapuff overflow-x-auto">
      <table className="w-full text-center border-collapse">
        <thead className=''>
          <tr className="bg-dark-brown-02 text-light-brown-03 rounded-md overflow-hidden">
            <th className="px-4 py-2 border-b border-light-brown-03">Team</th>
            <th className="px-4 py-2 border-b border-light-brown-03">P</th>
            <th className="px-4 py-2 border-b border-light-brown-03">W</th>
            <th className="px-4 py-2 border-b border-light-brown-03">L</th>
            <th className="px-4 py-2 border-b border-light-brown-03">D</th>
            <th className="px-4 py-2 border-b border-light-brown-03">Points</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr className="hover:bg-dark-brown-02 transition-colors">
            <td className="px-4 py-2 border-b border-light-brown-03">TA</td>
            <td className="px-4 py-2 border-b border-light-brown-03">5</td>
            <td className="px-4 py-2 border-b border-light-brown-03">1</td>
            <td className="px-4 py-2 border-b border-light-brown-03">0</td>
            <td className="px-4 py-2 border-b border-light-brown-03">15</td>
          </tr>
          <tr className="bg-dark-brown-02 hover:bg-dark-brown-02 transition-colors">
            <td className="px-4 py-2 border-b border-light-brown-03">TB</td>
            <td className="px-4 py-2 border-b border-light-brown-03">4</td>
            <td className="px-4 py-2 border-b border-light-brown-03">2</td>
            <td className="px-4 py-2 border-b border-light-brown-03">0</td>
            <td className="px-4 py-2 border-b border-light-brown-03">12</td>
          </tr> */}
          {pointsTable && pointsTable.length > 0 ? (
            pointsTable.map((entry, index) => (
              <tr key={index} className="hover:bg-dark-brown-02 transition-colors">
                <td className="px-4 py-2 border-b border-light-brown-03">
                  {abbrevation(entry.team.name)}
                </td>
                <td className="px-4 py-2 border-b border-light-brown-03">
                  {entry.gamesPlayed}
                </td>
                <td className="px-4 py-2 border-b border-light-brown-03">
                  {entry.wins}
                </td>
                <td className="px-4 py-2 border-b border-light-brown-03">
                  {entry.losses}
                </td>
                <td className="px-4 py-2 border-b border-light-brown-03">
                  {entry.draws}
                </td>
                <td className="px-4 py-2 border-b border-light-brown-03">
                  {entry.points}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                className="px-4 py-2 border-b border-light-brown-03 text-center"
              >
                No points table entries found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PointsTable
