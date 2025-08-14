import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useTournamnet from "../hooks/useTournamnet";
import { Loader2 } from "lucide-react";
import Games from "../components/Games";
import PointsTable from "../components/PointsTable";
import Teams from "../components/Teams";

const TournamentDetails = () => {
  const { getTournamentById } = useTournamnet();
  const params = useParams();
  const tournamentId = params.id;

  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showGames,setShowGames] = useState(true);
  const [showTeams,setShowTeams] = useState(false);
  const [showPointsTable,setShowPointsTable] = useState(false);
  const [activeTab, setActiveTab] = useState('games');

  const fetchTournamentDetails = async () => {
    setLoading(true);
    try {
      const data = await getTournamentById(tournamentId);
      if (data) {
        setTournament(data);
      } else {
        console.error("Tournament not found");
      }
    } catch (error) {
      console.error("Error fetching tournament details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTournamentDetails();
  }, []);

  if (loading)
    return (
      <div className="w-full h-screen flex items-center justify-center py-16 font-dynapuff">
        <div className="flex flex-col gap-y-4 text-xl font-semibold text-yellow-01">
         <Loader2 className="animate-spin" />
        </div>
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="w-full h-screen flex  py-16 font-dynapuff">
      <div className="w-full flex flex-col gap-y-4 text-xl font-semibold text-yellow-01 p-6">
        <h2>{tournament.name} </h2>
        <div className="w-full">
            <ul className="w-full flex">
                <li onClick={()=>setActiveTab("games")} className={`flex-1 text-center  p-2 ${activeTab == "games" ? "bg-yellow-01 text-purple-01" : "bg-purple-02 text-yellow-01"} `}>Games</li>
                <li onClick={()=>setActiveTab("points")} className={`flex-1 text-center  p-2 ${activeTab == "points" ? "bg-yellow-01 text-purple-01" : "bg-purple-02 text-yellow-01"} `}>Points</li>
                <li onClick={()=>setActiveTab("teams")} className={`flex-1 text-center  p-2 ${activeTab == "teams" ? "bg-yellow-01 text-purple-01" : "bg-purple-02 text-yellow-01"} `}>Teams</li>
            </ul>
        </div>
        {activeTab == "games" && <Games games={tournament.games}/>}
        {activeTab == "points" && <PointsTable/>}
        {activeTab == "teams" && <Teams/>}

      </div>
    </div>
  );
};

export default TournamentDetails;
