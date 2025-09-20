import React, { useContext, useEffect, useState } from "react";
import NewGameModal from "./NewGameModal";
import useGame from "../hooks/useGame";
import GamesList from "./GamesList";
import { AuthContext } from "../context/AuthContext";
import { Cross, Loader2, Plus, Search, X } from "lucide-react";
import { useNavigate } from "react-router";
import LoadingScreen from "./LoadingScreen";

const Games = ({ tournamentId, tournamentAdmin }) => {
  const [showAddNewGameModal, setShowAddNewGameModal] = useState(false);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [filter,setFilter] = useState("")
  const [filteredGames,setFilteredGames] = useState([])

  const navigate = useNavigate();

  const { user, token } = useContext(AuthContext);

  const { getGames } = useGame();

  const fetchGames = async (tournamentId) => {
    try {
      const fetchedGames = await getGames(tournamentId);
      console.log("Games",fetchedGames)
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

    console.log("Filter", filter)
    if(!filter){
      setFilteredGames(games)
    }
    else setFilteredGames(games.filter(game => game.teams.some(team => team.name.toLowerCase().includes(filter))))


  },[filter,games])

  useEffect(() => {
    setLoading(true);
    fetchGames(tournamentId);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) return <div>Error fetching games: {error.message}</div>;

  return (
    <div className="pb-6">
      <div className="flex justify-between gap-x-4 items-center">
        <h2 className="text-dark-white text-lg">Games</h2>
        <div className={`${showSearchBar ? "w-full" : "w-10"} h-10 transition-width delay-25 duration-100 ease-in-out p-2   flex justify-end items-center border-2 rounded-md border-dark-white/10 mb-2`}>
          {!showSearchBar ? (
            <span onClick={()=>setShowSearchBar(true)}><Search className="text-dark-white/50" size={18} /></span>
          ) : (
            <span className="w-full flex items-center gap-x-2">
              <input onChange={(e)=>setFilter(e.target.value.toLocaleLowerCase())} className="flex-1 text-dark-white/50 focus:outline-none" placeholder="Search game ..." />
              <X onClick={()=>setShowSearchBar(false)} className="text-dark-white/50" size={16} />
            </span>
          )}
        </div>
      </div>
      {(tournamentAdmin == user._id || user.role == "root-admin") && (
        <button
          onClick={() => navigate("newGame")}
          className="fixed bottom-20 right-6 z-20 text-sm bg-dark-gray text-neutral-100 px-2 py-2 rounded-full"
        >
          <Plus className="" size={28} />
        </button>
      )}

      {games.length > 0 ? (
        <GamesList games={filteredGames} />
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
