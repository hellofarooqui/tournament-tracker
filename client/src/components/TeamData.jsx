import { useEffect, useState } from "react";
import useTeams from "../hooks/useTeams";
import { CircleX, Loader2, Trash } from "lucide-react";

const defaultNewPlayer = {
  name: "",
};

const TeamData = ({ teamId, setShowTeamData }) => {
  const [teamData, setTeamData] = useState();
  const [newPlayer, setNewPlayer] = useState(defaultNewPlayer);
  const { getTeamData, addPlayerToTeam } = useTeams();
  const [showAddPlayerForm, setShowAddPlayerForm] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleModalClose = (e) => {
    e.stopPropagation()
    console.log("Trying to close the modal")
    setShowTeamData(false);
  }

  const fetchTeamData = async (teamId) => {
    try {
      const data = await getTeamData(teamId);
      setTeamData(data);
      //setTeamData({...teamData, members: [...teamData.members, data]})
     
    } catch (error) {
      setError("Error fetching team data");
    } finally {
      setLoading(false);
    }
  };

  const handleAddPlayerSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const playerName = formData.get("playerName");
    console.log("Player name", playerName);
    // Call a function to add the player to the team
    try {
      const response = await addPlayerToTeam(teamId, newPlayer);
      //setTeamData(response);
      //setTeamData({...teamData, members: [...teamData.members, response]});
       setShowAddPlayerForm(false)
      fetchTeamData(teamId);
    } catch (error) {}
  };

  useEffect(() => {
    setLoading(true);
    fetchTeamData(teamId);
  }, []);

  if (loading) {
    return (
      <div>
        <Loader2 className="animate-spin" size={24} />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="absolute top-0 left-0 w-screen h-screen bg-gray-900/30 flex items-center justify-center p-6">
      <CircleX onClick={(e)=>handleModalClose(e)} className="absolute top-2 z-20 bg-yellow-01 text-purple-02 rounded-full" size={30}/>
      <div className="max-w-sm w-full h-full bg-purple-02 p-4 rounded-[10px] relative">
        <div className="w-full h-full p-4 border-4 border-amber-400/80 rounded-[10px]">
          <h2 className="bg-yellow-01 text-purple-02 rounded-[10px] px-4 py-2">
            {teamData.name}
          </h2>

          <div className=" mt-6 bg-purple-01 p-2 rounded-md">
            <div className="">
              <div className="flex justify-between items-center">
                <h3 className="mb-2">Players</h3>
                {teamData.members.length < 2 && <button
                  onClick={() => setShowAddPlayerForm(true)}
                  className="text-xs text-yellow-01 underline px-2 py-1 rounded-[10px] font-thin"
                >
                  + Players
                </button>}
              </div>
            </div>
            <ul className="mt-2 flex flex-col gap-y-2">
              {teamData.members.map((player,index) => (
                <li key={player._id} className=" bg-purple-02 group p-2 rounded-md flex justify-between items-center">
                  {index+1}{". "}{player.name} <Trash className="hidden group-hover:block opacity-15"/>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {showAddPlayerForm && (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900/60 p-4">
          <div className="bg-purple-02 p-4 rounded-[10px] w-full max-w-sm">
            <h2 className="mb-4">Add New Player</h2>
            <form
              onSubmit={handleAddPlayerSubmit}
              className="flex flex-col gap-y-4"
            >
              <input
                onChange={(e) =>
                  setNewPlayer({ ...newPlayer, name: e.target.value })
                }
                type="text"
                placeholder="Player Name"
                className="bg-purple-01 p-2 rounded-[10px]"
              />
              <button
                type="submit"
                className="bg-yellow-01 text-purple-02 px-2 py-2 rounded-md"
              >
                Add
              </button>
              <button
                type="submit"
                className="border-2 border-yellow-01 text-yellow-01 px-2 py-2 rounded-md"
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
export default TeamData;
