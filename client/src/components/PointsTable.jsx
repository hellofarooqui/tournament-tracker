import React, { useEffect } from "react";
import { useParams } from "react-router";
import usePointsTable from "../hooks/usePointsTable";
import { Loader2 } from "lucide-react";
import abbrevation from "../utils/abbrevations";

const PointsTable = () => {
  const params = useParams();
  const tournamentId = params.id;
  const { fetchTournamentPointsTable } = usePointsTable();
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
  };

  useEffect(() => {
    fetchPointsTable();
  }, []);

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
        <div className="text-red-500">
          Error fetching points table: {error.message}
        </div>
      </div>
    );
  }

  if (pointsTables.entries.length === 0) {
    return (
      <p className="mt-4 bg-dark-blue/20 text-dark-blue/70 text-sm p-4 rounded-[10px] font-thin">
        The tournament has not started ye.
      </p>
    );
  }

  return (
    <div className="w-full font-dynapuff pb-6">
      <div className="flex flex-col gap-y-4 ">
        {pointsTables.map((pointsTable) => (
          <div key={pointsTable._id} className="w-full">
            <div className="grid grid-cols-[20px_auto_25px_25px_25px_25px_30px] gap-x-2 border-b border-dark-white/10">
              <div className="font-semibold text-sm text-dark-white/50 p-2">
                #
              </div>
              <div className="font-semibold text-sm text-dark-white/50 p-2">
                Team
              </div>
              <div className="font-semibold text-sm text-dark-white/50 p-2 text-center">
                P
              </div>
              <div className="font-semibold text-sm text-dark-white/50 p-2 text-center">
                W
              </div>
              <div className="font-semibold text-sm text-dark-white/50 p-2 text-center">
                L
              </div>
              <div className="font-semibold text-sm text-dark-white/50 p-2 text-center">
                D
              </div>
              <div className="font-semibold text-sm text-dark-white/50 p-2 text-center">
                S
              </div>
            </div>
            {pointsTable && pointsTable.entries.length > 0 ? (
              pointsTable.entries.map((entry, index) => (
                <div className="grid grid-cols-[20px_auto_25px_25px_25px_25px_30px] items-center gap-x-2 border-b border-dark-white/10">
                  <div className="p-3 text-center text-sm text-dark-white/90">
                    {index + 1}
                  </div>
                  <div className="p-3 flex items-center gap-x-2">
                    <div className="rounded-full bg-gray-700 w-8 h-8 flex justify-center items-center">
                      <span className="text-xs text-dark-white/90">
                        {abbrevation(entry.team.name)}
                      </span>
                    </div>
                    <span className="text-sm text-dark-white/90">
                      {entry.team.name.split(" ")[1]}
                    </span>
                  </div>
                  <div className="p-3 text-center text-sm text-dark-white/90">
                    {entry.gamesPlayed}
                  </div>
                  <div className="p-3 text-center text-sm text-dark-green">
                    {entry.wins}
                  </div>
                  <div className="p-3 text-center text-sm text-red-400">
                    {entry.losses}
                  </div>
                  <div className="p-3 text-center text-sm text-dark-white/90">
                    {entry.draws}
                  </div>
                  <div className="p-3 text-center text-sm font-bold text-dark-blue">
                    {entry.points}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-6 p-4 text-center text-sm text-dark-white/90">
                No points table entries found.
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PointsTable;
