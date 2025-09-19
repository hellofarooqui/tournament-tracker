import React, { use, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import useTeams from "../hooks/useTeams";
import { Loader2, Pencil, Plus } from "lucide-react";
import TournamentTeamCard from "./TournamentTeamCard";
import { AuthContext } from "../context/AuthContext";
import { useState } from "react";
import useGroups from "../hooks/useGroups";
import useTournamnet from "../hooks/useTournamnet";

const Teams = () => {
  const { user,token } = useContext(AuthContext);
  const params = useParams();
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);

 

  

  const [teamsLoading, setTeamsLoading] = useState(true);
  const [teamsError, setTeamsError] = useState(null);

  const [groups, setGroups] = useState([]);
  const [groupLoading, setGrouploading] = useState(true);
  const [groupError, setGroupError] = useState(null);

  const [addLoading, setAddloading] = useState(false);

  const [showAddTeamModal, setShowAddTeamModal] = useState(false);


  const { getTournamentTeams, createTeam } = useTeams();
  const { createGroup, getTournamentGroups } = useGroups();
  const { getTournamentFormat } = useTournamnet();
  const tournamentId = params.id;

  const fetchTeams = async () => {
    try {
      const teamsFetched = await getTournamentTeams(tournamentId);
      if (teamsFetched) {
        console.log("Teams fetched successfully:", teamsFetched);
        setTeams(teamsFetched);
      }
    } catch (error) {
      console.error("Error fetching teams:", error);
    } finally {
      setTeamsLoading(false);
    }
  };





  useEffect(() => {
    setTeamsLoading(true);
    fetchTeams();
  }, []);

  if (teamsLoading) {
    return (
      <div className="w-full flex items-center justify-center py-16 font-dynapuff">
        <div className="flex flex-col gap-y-4 text-xl font-semibold text-light-brown-03">
          <Loader2 className="animate-spin" size={40} />
        </div>
      </div>
    );
  }

  if (teamsError) {
    return (
      <div className="w-full flex items-center justify-center py-16 font-dynapuff">
        <div className="flex flex-col gap-y-4 text-xl font-semibold text-light-brown-03">
          Error
        </div>
      </div>
    );
  }

  return (
    <div className="w-full font-dynapuff">
      <div className="w-full flex flex-col gap-y-4 text-xl font-semibold text-light-brown-03 py-2">
        <div className="flex justify-between items-center pb-2">
          <h2 className="text-dark-white text-lg">Teams</h2>
          {user?.role == "root-admin" && (
            <button
              onClick={() =>navigate('newTeam')}
              className="fixed bottom-20 right-6 z-20 text-sm bg-dark-gray text-dark-white/50 px-2 py-2 rounded-full"
            >
              <Plus size={28} />
            </button>
          )}
        </div>
        {teams.length < 1 ? (
          <p>No Teams Found</p>
        ) : (
          <div className="flex flex-col gap-y-4 pb-6">
            {teams.map((entry) => (
              <TournamentTeamCard key={entry._id} team={entry.team} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Teams;
