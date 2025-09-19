import React, { useContext, useEffect, useState } from "react";
import NewGameModal from "./NewGameModal";
import useGame from "../hooks/useGame";
import GamesList from "./GamesList";
import { AuthContext } from "../context/AuthContext";
import { Loader2, Plus } from "lucide-react";
import { useNavigate } from "react-router";
import LoadingScreen from "./LoadingScreen";

const Games = ({ tournamentId, tournamentAdmin }) => {
  const [showAddNewGameModal, setShowAddNewGameModal] = useState(false);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  const { user, token } = useContext(AuthContext);

  const { getGames } = useGame();

  const fetchGames = async (tournamentId) => {
    try {
      const fetchedGames = await getGames(tournamentId);
      setGames(fetchedGames);
    } catch (error) {
      console.error("Error fetching games:", error);
      setError(error);
    } finally {
      setLoading(false);
      //console.log("Games fetched successfully:", games);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchGames(tournamentId);
  }, []);

  if (loading) {
    return (
      <LoadingScreen/>
      
    );
  }

  if (error) return <div>Error fetching games: {error.message}</div>;

  return (
    <div className="pb-6">
      <div className="flex justify-between items-center">
        <h2 className="text-dark-white text-lg">Games</h2>
      </div>
      {(tournamentAdmin == user._id || user.role == "root-admin") && (
        <button
          onClick={() => navigate("newGame")}
          className="fixed bottom-20 right-6 z-20 text-sm bg-neutral-700 text-neutral-100 px-2 py-2 rounded-full"
        >
          <Plus size={28} />
        </button>
      )}

      {games.length > 0 ? (
        <GamesList games={games} />
      ) : (
        <p className="mt-4 bg-neutral-200 text-neutral-500 text-sm p-4 rounded-[10px] font-thin">
          No games found
        </p>
      )}

      {showAddNewGameModal && (
        <NewGameModal
          tournamentId={tournamentId}
          setShowAddNewGameModal={setShowAddNewGameModal}
        />
      )}
    </div>
  );
};

export default Games;
