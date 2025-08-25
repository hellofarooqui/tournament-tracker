import React, { useContext, useEffect, useState } from "react";
import NewGameModal from "./NewGameModal";
import useGame from "../hooks/useGame";
import GamesList from "./GamesList";
import { AuthContext } from "../context/AuthContext";
import { Loader2 } from "lucide-react";

const Games = ({tournamentId}) => {
  const [showAddNewGameModal, setShowAddNewGameModal] = useState(false);
  const [games,setGames] = useState([]);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null);

  const {token} = useContext(AuthContext)


const {getGames} = useGame();

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

  useEffect(()=>{
    setLoading(true)
    fetchGames(tournamentId)
  },[])

    if (loading) {
      return (
        <div className="w-full h-screen flex items-center justify-center py-16 font-dynapuff">
          <div className="flex flex-col gap-y-4 text-xl font-semibold text-slate-200">
            <Loader2 className="animate-spin" size={40} />
          </div>
        </div>
      );
    }

  if(error) return <div>Error fetching games: {error.message}</div>;

  return (
    <div className="mt-4 pb-6">
      <div className="flex justify-between items-center">
        <h2>Games</h2>
        {true && (
          <button
            onClick={() => setShowAddNewGameModal(true)}
            className="text-sm bg-gradient-to-r from-[#FFA9CC] via-[#FEB2A4] to-[#FFC36B] text-gray-700 px-2 py-2 rounded-md"
          >
            New Game
          </button>
        )}
      </div>
      {games.length > 0 ? (
        <GamesList games={games} />
      ) : (
        <p className="mt-4 bg-dark-brown-04 text-slate-200 text-sm p-4 rounded-[10px] font-thin">
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
