import { useEffect, useState } from "react";
import useTournamnet from "../hooks/useTournamnet";
import { useNavigate, useParams } from "react-router";
import useTeams from "../hooks/useTeams";

const defaultNewTeam = {
  name: "",
  members: [],
};

const TournamentNewTeam = () => {
  const params = useParams();
  const tournamentId = params.id;
  const { getTournamentPlayers } = useTournamnet();
  const { createTeam } = useTeams();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const [newTeam, setNewTeam] = useState(defaultNewTeam);

  const [addPlayersToggle, setAddPlayesToggle] = useState(false);

  const handlePlayerSelect = (event) => {
    const selectedPlayer = members.find(
      (player) =>
        `${player.firstName} ${player.lastName}` === event.target.value
    );
    if (selectedPlayer) {
      // Do something with the selected player
      console.log("Selected player:", selectedPlayer);
      setNewTeam({
        ...newTeam,
        members: [...newTeam.members, selectedPlayer._id],
      });
    }
  };

  const getPlayers = async () => {
    try {
      const availableMembers = await getTournamentPlayers(tournamentId);
      if (availableMembers) {
        setMembers(availableMembers);
      }
    } catch (error) {
      setError("Error in fetching players");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPlayers();
  }, []);
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
        navigate(-1);
      }
    } catch (error) {
      console.error("Error creating team:", error);
    }
  };
  return (
    <div className="w-full h-screen flex py-16 font-dynapuff">
      <div className="w-full max-w-sm mx-auto flex flex-col gap-y-4 text-xl font-semibold text-light-brown-03 p-4">
        <div>
          <h3 className="text-xl font-semibold mb-4">Add New Team</h3>
          <form onSubmit={handleAddTeam} className="flex flex-col gap-y-4">
            <input
              onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
              type="text"
              placeholder="Team Name"
              className="p-2 border border-slate-300/40 rounded-[10px] focus:outline-none focus:border-yellow-300/70"
            />

            {!addPlayersToggle && (
              <button
                onClick={() => setAddPlayesToggle(true)}
                type="button"
                className="self-start bg-slate-200/40 p-2 px-4 rounded-[10px] text-white font-thin text-sm"
              >
                Add Players
              </button>
            )}

            {addPlayersToggle && (
              <div>
                <input
                  className="p-2 border border-slate-300/40 rounded-[10px] focus:outline-none focus:border-yellow-300/70"
                  list="players-list"
                  placeholder="Select a Player"
                  onInput={(e) => handlePlayerSelect(e)}
                />
                <datalist id="players-list">
                  {members.map((player) => (
                    <option
                      key={player._id}
                      value={`${player.firstName} ${player.lastName}`}
                    />
                  ))}
                </datalist>
              </div>
            )}

            <div className="w-full flex items-center gap-x-2">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-[#FFA9CC] via-[#FEB2A4] to-[#FFC36B] p-2 rounded-[10px] text-white font-medium"
              >
                Add Team
              </button>
              <button
                type="button"
                onClick={() => setShowAddTeamModal(false)}
                className="flex-1 border-2 border-[#FFA9CC] text-[#FFA9CC] p-2 rounded-[10px]"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default TournamentNewTeam;
