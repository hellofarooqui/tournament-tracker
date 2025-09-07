import React, { use, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import useTeams from "../hooks/useTeams";
import { Loader2 } from "lucide-react";
import TournamentTeamCard from "./TournamentTeamCard";
import { AuthContext } from "../context/AuthContext";


const Teams = () => {
  const { token } = useContext(AuthContext);
  const params = useParams();
  const navigate = useNavigate();
  const [teams, setTeams] = React.useState([]);

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const [showAddTeamModal, setShowAddTeamModal] = React.useState(false);

  const { getTournamentTeams, createTeam } = useTeams();
  const tournamentId = params.id;

  const fetchTeams = async () => {
    try {
      const teamsFetched = await getTournamentTeams(tournamentId);
      if (teams) {
        //console.log("Teams fetched successfully:", teamsFetched);
        setTeams(teamsFetched);
      }
    } catch (error) {
      console.error("Error fetching teams:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchTeams();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center py-16 font-dynapuff">
        <div className="flex flex-col gap-y-4 text-xl font-semibold text-light-brown-03">
          <Loader2 className="animate-spin" size={40} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center py-16 font-dynapuff">
        <div className="flex flex-col gap-y-4 text-xl font-semibold text-light-brown-03">
          Error
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen font-dynapuff">
      <div className="w-full flex flex-col gap-y-4 text-xl font-semibold text-light-brown-03 py-2">
        <div className="flex justify-between items-center pb-2">
          <h2 className="text-2xl text-neutral-700">Teams</h2>
          {token && (
            <button
              onClick={() => navigate(`newTeam`)}
              className="bg-neutral-200  text-neutral-500 px-6 py-2 rounded-full text-sm"
            >
              Add
            </button>
          )}
        </div>
        {teams.length < 1 ? (
          <p>No Teams Found</p>
        ) : (
          <div className="flex flex-col gap-y-4">
            {teams.map((team) => (
              <TournamentTeamCard key={team._id} team={team} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Teams;
