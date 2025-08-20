import { useEffect, useState } from "react";
import useTournamnet from "../hooks/useTournamnet";
import TournamentCard from "../components/TournamentCard";
import { useNavigate } from "react-router";
import { Loader2 } from "lucide-react";

const ViewAllTournaments = () => {
  const [allTournaments, setAllTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { getAllTournaments } = useTournamnet();
  const navigate = useNavigate();

  const fetchTournaments = async () => {
    try {
      const tournaments = await getAllTournaments();
      setAllTournaments(tournaments);
    } catch (error) {
      console.error("Error fetching tournaments:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchTournaments();
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

  return (
    <div className="w-full h-screen flex py-16 font-dynapuff">
      <div className="w-full max-w-sm mx-auto flex flex-col gap-y-4 text-xl font-semibold text-light-brown-03 p-4">
        <div className="flex justify-between items-center">
          <h2 className=" text-white">All Tournaments</h2>
          <div className="flex gap-x-2">
            
            <button
              onClick={() => navigate("/new-tournament")}
              className=" bg-gradient-to-r from-[#FFA9CC] via-[#FEB2A4] to-[#FFC36B] text-slate-700 px-4 py-2 rounded-md text-sm"
            >
              New
            </button>
          </div>
        </div>

        {allTournaments.length > 0 && (
          <div className="flex flex-col gap-y-4 w-full">
            {allTournaments.map((tournament) => (
              <TournamentCard key={tournament._id} tournament={tournament} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default ViewAllTournaments;
