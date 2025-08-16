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
    <div className="w-full p-4 bg-purple-02 rounded-lg shadow-lg text-yellow-01 font-dynapuff overflow-x-auto">
      <table className="w-full text-center border-collapse">
        <thead className=''>
          <tr className="bg-purple-700 text-yellow-200 rounded-md overflow-hidden">
            <th className="px-4 py-2 border-b border-purple-500">Team</th>
            <th className="px-4 py-2 border-b border-purple-500">W</th>
            <th className="px-4 py-2 border-b border-purple-500">L</th>
            <th className="px-4 py-2 border-b border-purple-500">D</th>
            <th className="px-4 py-2 border-b border-purple-500">Points</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr className="hover:bg-purple-800 transition-colors">
            <td className="px-4 py-2 border-b border-purple-500">TA</td>
            <td className="px-4 py-2 border-b border-purple-500">5</td>
            <td className="px-4 py-2 border-b border-purple-500">1</td>
            <td className="px-4 py-2 border-b border-purple-500">0</td>
            <td className="px-4 py-2 border-b border-purple-500">15</td>
          </tr>
          <tr className="bg-purple-900 hover:bg-purple-800 transition-colors">
            <td className="px-4 py-2 border-b border-purple-500">TB</td>
            <td className="px-4 py-2 border-b border-purple-500">4</td>
            <td className="px-4 py-2 border-b border-purple-500">2</td>
            <td className="px-4 py-2 border-b border-purple-500">0</td>
            <td className="px-4 py-2 border-b border-purple-500">12</td>
          </tr> */}
          {pointsTable && pointsTable.length > 0 ? (
            pointsTable.map((entry, index) => (
              <tr key={index} className="hover:bg-purple-800 transition-colors">
                <td className="px-4 py-2 border-b border-purple-500">
                  {abbrevation(entry.team.name)}
                </td>
                <td className="px-4 py-2 border-b border-purple-500">
                  {entry.wins}
                </td>
                <td className="px-4 py-2 border-b border-purple-500">
                  {entry.losses}
                </td>
                <td className="px-4 py-2 border-b border-purple-500">
                  {entry.draws}
                </td>
                <td className="px-4 py-2 border-b border-purple-500">
                  {entry.points}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                className="px-4 py-2 border-b border-purple-500 text-center"
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
