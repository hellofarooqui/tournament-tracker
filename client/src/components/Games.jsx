import React, { useEffect, useState } from "react";
import NewGameModal from "./NewGameModal";
import useGame from "../hooks/useGame";
import GamesList from "./GamesList";

const Games = ({tournamentId}) => {
  const [showAddNewGameModal, setShowAddNewGameModal] = useState(false);
  const [games,setGames] = useState([]);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null);


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
      console.log("Games fetched successfully:", games);
    }
  };

  useEffect(()=>{
    setLoading(true)
    fetchGames(tournamentId)
  },[])

  if(loading) return <div>Loading...</div>;

  if(error) return <div>Error fetching games: {error.message}</div>;

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center">
        <h2>Games</h2>
        <button onClick={()=>setShowAddNewGameModal(true)} className="text-sm bg-yellow-01 text-purple-02 px-2 rounded-md">New Game</button>
      </div>
      {games && <GamesList games={games} />}

      {showAddNewGameModal && <NewGameModal tournamentId={tournamentId} setShowAddNewGameModal={setShowAddNewGameModal} />}
    </div>
  );
};

export default Games;
