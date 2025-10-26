import { use, useContext, useEffect, useState } from "react";
import useTeams from "../hooks/useTeams";
import useGame from "../hooks/useGame";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { NavbarContext } from "../context/NavbarContext";

const defaultNewGame = {
  name: "",
  tournament: "",
  teams: [],
  scheduledDate: "",
};

const TournamentNewGame = ({ setShowAddTournamentNewGame }) => {
  const params = useParams();
  const { tournamentId } = params;
    const { navbar, setNavbar } = useContext(NavbarContext);
  const [tournamentTeams, setTournamentTeams] = useState([]);
  const [newGame, setNewGame] = useState(defaultNewGame);
  const { getTournamentTeams } = useTeams();
  const { createGame } = useGame();
  const navigate = useNavigate();

  const fetchTournamentTeams = async (tournamentId) => {
    try {
      const teams = await getTournamentTeams(tournamentId);
      console.log("Teams", teams);
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
      navigate(-1);
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

  //setting navbar
  useEffect(() => {
    setNavbar({
      ...navbar,
      pageTitle: "Add New Game",
      bg_transparent: true,
      showProfileIcon: false,
    });
    return () => {
      setNavbar({ ...navbar, pageTitle: "", bg_color: "" });
    };
  }, []);

  return (
    <div className=" w-full h-full p-6">
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
        <label
          htmlFor="name"
          className="flex flex-col gap-y-2 text-dark-white/60 text-sm"
        >
          Game Name
          <input
            className="text-base mb-2 p-2 rounded-md border-2  border-dark-white/10 text-dark-white focus:outline-none focus:border-dark-white/30 "
            name="name"
            type="text"
            placeholder="Game Name"
            onChange={(e) => setNewGame({ ...newGame, name: e.target.value })}
          />
        </label>
        <label className="flex flex-col gap-y-2 text-dark-white/60 text-sm">
          Team A
          <select
            className="text-base mb-2 p-2 rounded-md border-2  border-dark-white/10 text-dark-white focus:outline-none focus:border-dark-white/30 "
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
        </label>
        <label className="flex flex-col gap-y-2 text-dark-white/60 text-sm">
          Team B
          <select
            className="text-base mb-2 p-2 rounded-md border-2  border-dark-white/10 text-dark-white focus:outline-none focus:border-dark-white/30 "
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
        </label>
        <label className="flex flex-col gap-y-2 text-dark-white/60 text-sm">
          Scheduled Date
          <input
            type="date"
            className="text-base mb-2 p-2 rounded-md border-2  border-dark-white/10 text-dark-white focus:outline-none focus:border-dark-white/30 "
            onChange={(e) =>
              setNewGame({ ...newGame, scheduledDate: e.target.value })
            }
          />
        </label>
        <button
          type="submit"
          className="bg-dark-blue text-white px-4 py-2 rounded-md"
        >
          Create Game
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="bg-dark-gray text-dark-white/60 px-4 py-2 rounded-md"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};
export default TournamentNewGame;
