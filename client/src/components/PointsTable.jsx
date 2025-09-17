import React, { useEffect } from 'react'
import { useParams } from 'react-router';
import usePointsTable from '../hooks/usePointsTable';
import { Loader2 } from 'lucide-react';
import abbrevation from '../utils/abbrevations';

const PointsTable = () => {
  const params = useParams();
  const tournamentId = params.id;
  const { fetchTournamentPointsTable } = usePointsTable()
  const [pointsTables, setPointsTables] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const fetchPointsTable = async () => {
    setLoading(true);
    try {
      const data = await fetchTournamentPointsTable(tournamentId);
      if (data) {
        console.log("Points table fetched successfully:", data);
        setPointsTables(data);
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
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="animate-spin h-8 w-8 text-yellow-500" />
      </div>
    );
  }
  if (error) {
    return (
      <div className="w-full flex items-center justify-center py-16 font-dynapuff">
        <div className="text-red-500">Error fetching points table: {error.message}</div>
      </div>
    );
  }

  if (pointsTables.length === 0) {
    return (
      <div className="w-full flex items-center justify-center py-16 font-dynapuff">
        <div className="text-gray-500">No points table available.</div>
      </div>
    );
  }

  return (
    <div className="w-full font-dynapuff pb-6">
      <div className='flex flex-col gap-y-4 '>
        {pointsTables.map((pointsTable) => (
          <div key={pointsTable._id} className='w-full'>
            <table className="w-full text-center border-collapse">
              <thead className="">
                <tr className=" bg-light-main-blue  text-slate-200 text-sm rounded-[20px]">
                  <th className="px-2 py-3 text-center">
                    Team
                  </th>
                  <th className="px-4 py-3 text-center">
                    P
                  </th>
                  <th className="px-4 py-3 text-center">
                    W
                  </th>
                  <th className="px-4 py-3 text-center">
                    L
                  </th>
                  <th className="px-4 py-3 text-center">
                    D
                  </th>
                  <th className="px-4 py-3 text-center ">
                    Points
                  </th>
                </tr>
              </thead>
              <tbody>

                {pointsTable && pointsTable.entries.length > 0 ? (
                  pointsTable.entries.map((entry, index) => (
                    <tr
                      key={index}
                      className="hover:bg-slate-200/40 transition-colors text-[16px] border-b text-neutral-500 border-slate-200/30 last:border-b-0"
                    >
                      <td className="px-2 py-1 text-center ">
                        {abbrevation(entry.team.name)}
                      </td>
                      <td className="px-4 py-1 text-center ">
                        {entry.gamesPlayed}
                      </td>
                      <td className="px-4 py-1 text-center ">{entry.wins}</td>
                      <td className="px-4 py-1 text-center ">{entry.losses}</td>
                      <td className="px-4 py-1 text-center ">{entry.draws}</td>
                      <td className="px-6 py-1 text-center ">{entry.points}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-4 py-2 border-b border-slate-200/30 text-center"
                    >
                      No points table entries found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PointsTable
