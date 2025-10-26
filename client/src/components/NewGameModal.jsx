import { useEffect, useState } from "react";
import useTeams from "../hooks/useTeams";
import useGame from "../hooks/useGame";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const defaultNewGame = {
  name: "",
  tournament: "",
  teams: [],
  scheduledDate: "",
};

const NewGameModal = ({ tournamentId, setShowAddNewGameModal }) => {
  const [tournamentTeams, setTournamentTeams] = useState([]);
  const [newGame, setNewGame] = useState(defaultNewGame);
  const { getTournamentTeams } = useTeams();
  const { createGame } = useGame();
  const navigate = useNavigate();

  const fetchTournamentTeams = async (tournamentId) => {
    try {
      const teams = await getTournamentTeams(tournamentId);
      console.log("Teams",teams)
      setTournamentTeams(teams);
    } catch (error) {
      console.error("Error fetching tournament teams:", error);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      //setNewGame({...newGame, name: newGame.teams[0] + " vs " + newGame.teams[1]});
      const createdGame = await createGame(tournamentId, newGame);
      console.log("Game created successfully:", createdGame);
      toast.success("Game Created");
      setNewGame(defaultNewGame);
      setShowAddNewGameModal(false);
    } catch (error) {
      console.error("Error creating game:", error);
      toast.error("Error creating game");
    }
  };

  const handleCancel = () => {
    setNewGame(defaultNewGame);
    navigate(-1); // Navigate back to the previous page
  };

  useEffect(() => {
    setNewGame({ ...newGame, tournament: tournamentId });
    fetchTournamentTeams(tournamentId);
  }, []);
  return (
    <div className="absolute top-0  left-0 w-full h-full bg-light-bg-gray flex justify-center items-center">
      <div className="p-4 bg-white rounded-lg">
        <div className=" border-yellow-01 rounded-lg p-4">
          <h2 className="text-2xl font-bold mb-4 text-light-text-dull-01">New Game</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
            {/* <input
              list="teams"
              placeholder="First Team"
              className="text-lg mb-2 p-2 rounded-md bg-purple-02"
              onChange={(e) =>
                setNewGame({
                  ...newGame,
                  teams: [e.target.key, ...newGame.teams],
                  name: e.target.value + " vs ",
                })
              }
            />
            <input
              list="teams"
              placeholder="Second Team"
              className="text-lg mb-2 p-2 rounded-md bg-purple-02"
              onChange={(e) =>
                setNewGame({
                  ...newGame,
                  teams: [...newGame.teams, e.target.key],
                  name: newGame.name + e.target.value,
                })
              }
            /> */}
            {/* <datalist id="teams">
              {tournamentTeams.map((team) => (
                <option key={team._id} value={team.name} />
              ))}
            </datalist> */}
            <input
              className="text-lg mb-2 p-2 rounded-md border-b-2  border-light-text-dull-01/30 text-light-text-dull-02"
              type="text"
              placeholder="Game Name"
              onChange={(e) => setNewGame({ ...newGame, name: e.target.value })}
            />
            <select
              className="text-lg mb-2 p-2 rounded-md border-b-2  border-light-text-dull-01/30 text-light-text-dull-02"
              onChange={(e) =>
                setNewGame({
                  ...newGame,
                  teams: [e.target.value, newGame.teams[1] || ""], // fix index 0
                })
              }
            >
              <option value="">Select First Team</option>
              {tournamentTeams.map((entry) => (
                 <option key={entry.team._id} value={entry.team._id}>
                  {entry.team.name}
                </option>
              ))}
            </select>
            <select
              className="text-lg mb-2 p-2 rounded-md border-b-2  border-light-text-dull-01/30 text-light-text-dull-02"
              onChange={(e) =>
                setNewGame({
                  ...newGame,
                  teams: [newGame.teams[0] || "", e.target.value], // fix index 1
                })
              }
            >
              <option value="">Select Second Team</option>
              {tournamentTeams.map((entry) => (
                <option key={entry.team._id} value={entry.team._id}>
                  {entry.team.name}
                </option>
              ))}
            </select>
            <input
              type="date"
              className="text-lg mb-2 p-2 rounded-md border-b-2  border-light-text-dull-01/30 text-light-text-dull-02"
              onChange={(e) =>
                setNewGame({ ...newGame, scheduledDate: e.target.value })
              }
            />
            <button
              type="submit"
              className="bg-light-text-dull-02 text-white px-4 py-2 rounded-md"
            >
              Create Game
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="border-3 border-light-text-dull-02/30 text-light-text-dull-01 px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default NewGameModal;
