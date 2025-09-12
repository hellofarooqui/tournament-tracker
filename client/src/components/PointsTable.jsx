import React, { useEffect } from 'react'
import { useParams } from 'react-router';
import usePointsTable from '../hooks/usePointsTable';
import { Loader2 } from 'lucide-react';
import abbrevation from '../utils/abbrevations';

const PointsTable = () => {
    const params = useParams();
    const tournamentId = params.id;
    const {fetchTournamentPointsTable} = usePointsTable()
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
    <div className="mt-4 w-full rounded-[20px] bg-slate-100/10 backdrop-blur-lg border text-light-brown-03 font-dynapuff overflow-x-auto">
      <div className='flex flex-col gap-y-4 p-4'>
        {pointsTables.map((pointsTable) => (
          <div key={pointsTable._id} className='w-full'>
            <h2 className='text-xl font-bold text-stone-800'>{pointsTable.name}</h2>
          <table className="w-full text-center border-collapse">
            <thead className="">
              <tr className=" bg-stone-800  text-slate-200 text-[16px] rounded-[20px] overflow-hidden">
                <th className="pl-6 py-3 text-center border-b border-slate-200/30">
                  Team
                </th>
                <th className="px-4 py-3 text-center border-b border-slate-200/30">
                  P
                </th>
                <th className="px-4 py-3 text-center border-b border-slate-200/30">
                  W
                </th>
                <th className="px-4 py-3 text-center border-b border-slate-200/30">
                  L
                </th>
                <th className="px-4 py-3 text-center border-b border-slate-200/30">
                  D
                </th>
                <th className="pr-6 py-3 text-center border-b border-slate-200/30">
                  Points
                </th>
              </tr>
            </thead>
            <tbody>
              {/* <tr className="hover:bg-dark-brown-02 transition-colors">
            <td className="px-4 py-2 border-b border-slate-200/30">TA</td>
            <td className="px-4 py-2 border-b border-slate-200/30">5</td>
            <td className="px-4 py-2 border-b border-slate-200/30">1</td>
            <td className="px-4 py-2 border-b border-slate-200/30">0</td>
            <td className="px-4 py-2 border-b border-slate-200/30">15</td>
          </tr>
          <tr className="bg-dark-brown-02 hover:bg-dark-brown-02 transition-colors">
            <td className="px-4 py-2 border-b border-slate-200/30">TB</td>
            <td className="px-4 py-2 border-b border-slate-200/30">4</td>
            <td className="px-4 py-2 border-b border-slate-200/30">2</td>
            <td className="px-4 py-2 border-b border-slate-200/30">0</td>
            <td className="px-4 py-2 border-b border-slate-200/30">12</td>
          </tr> */}
              {pointsTable && pointsTable.entries.length > 0 ? (
                pointsTable.entries.map((entry, index) => (
                  <tr
                    key={index}
                    className="hover:bg-slate-200/40 transition-colors text-[16px] border-b text-neutral-500 border-slate-200/30 last:border-b-0"
                  >
                    <td className="pl-6 py-3 text-center ">
                      {abbrevation(entry.team.name)}
                    </td>
                    <td className="px-4 py-3 text-center ">
                      {entry.gamesPlayed}
                    </td>
                    <td className="px-4 py-3 text-center ">{entry.wins}</td>
                    <td className="px-4 py-3 text-center ">{entry.losses}</td>
                    <td className="px-4 py-3 text-center ">{entry.draws}</td>
                    <td className="pr-6 py-3 text-center ">{entry.points}</td>
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
