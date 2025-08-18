import React, { use, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import useTeams from "../hooks/useTeams";
import { Loader2 } from "lucide-react";
import TournamentTeamCard from "./TournamentTeamCard";
import { AuthContext } from "../context/AuthContext";

const defaultNewTeam = {
  name: "",
};

const Teams = () => {
  const {token} = useContext(AuthContext);
  const params = useParams();
  const navigate = useNavigate();
  const [teams, setTeams] = React.useState([]);
  const [newTeam, setNewTeam] = React.useState(defaultNewTeam);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const [showAddTeamModal, setShowAddTeamModal] = React.useState(false);

  const { getTournamentTeams, createTeam } = useTeams();
  const tournamentId = params.id;

  const fetchTeams = async () => {
    try {
      const teamsFetched = await getTournamentTeams(tournamentId);
      if (teams) {
        console.log("Teams fetched successfully:", teamsFetched);
        setTeams(teamsFetched);
      }
    } catch (error) {
      console.error("Error fetching teams:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTeam = async (e) => {
    e.preventDefault();
    
    if (!newTeam.name.trim()) {
      alert("Please enter a team name");
      return;
    }
    try {
        console.log("Creating team with data:", newTeam);
      const createdTeam = await createTeam(tournamentId, newTeam);
      if (createdTeam) {
        console.log("Team created successfully:", createdTeam);
        setTeams((prevTeams) => [...prevTeams, createdTeam]);
        setShowAddTeamModal(false);
      }
    } catch (error) {
      console.error("Error creating team:", error);
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
        <div className="flex justify-between items-center border-b-2 border-yellow-300/40 pb-2">
          <h2 className="text-2xl">Teams</h2>
          {token && <button
            onClick={() => setShowAddTeamModal(true)}
            className="bg-yellow-01 text-purple-01 px-4 rounded-md"
          >
            Add
          </button>}
        </div>
        {teams.length < 1 ? <p>No Teams Found</p> : <div className="flex flex-col gap-y-4">{teams.map(team => <TournamentTeamCard key={team._id} team={team} />)}</div>}
      </div>
      {showAddTeamModal && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
          <div className="bg-purple-02 p-6 rounded-lg text-light-brown-03">
            <h3 className="text-xl font-semibold mb-4">Add New Team</h3>
            <form onSubmit={handleAddTeam} className="flex flex-col gap-y-4">
              <input
                onChange={(e) =>
                  setNewTeam({ ...newTeam, name: e.target.value })
                }
                type="text"
                placeholder="Team Name"
                className="p-2 border-3 border-yellow-300/40 rounded-[10px] focus:outline-none focus:border-yellow-300/70"
              />

              <button
                type="submit"
                className="bg-yellow-01 text-purple-01 p-2 rounded-[10px] mt-6"
              >
                Add Team
              </button>
              <button
                type="button"
                onClick={() => setShowAddTeamModal(false)}
                className="bg-red-500 text-white p-2 rounded-[10px]"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teams;
