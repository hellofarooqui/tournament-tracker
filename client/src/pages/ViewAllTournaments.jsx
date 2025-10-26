import { useEffect, useState } from "react";
import useTournamnet from "../hooks/useTournamnet";
import TournamentCard from "../components/TournamentCard";
import { useNavigate } from "react-router";
import { Loader2, Plus } from "lucide-react";
import useAuth from "../hooks/useAuth";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { NavbarContext } from "../context/NavbarContext";

const ViewAllTournaments = () => {
  const { user } = useContext(AuthContext);
  const { navbar, setNavbar } = useContext(NavbarContext)

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

  //setting navbar
  useEffect(() => {
    setNavbar({ ...navbar, pageTitle: "All Tournaments", bg_color: "#0061ff", bg_transparent:false })
    return () => {
      setNavbar({ ...navbar, pageTitle: "", bg_color: "" })
    }
  }, [])

  if (loading) {
    return (
      <div className="w-full min-h-full flex items-center justify-center py-16 font-dynapuff">
        <div className="flex flex-col gap-y-4 text-xl font-semibold text-light-brown-03">
          <Loader2 className="animate-spin text-light-text-dark" size={40} />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex font-dynapuff p-3">
      <div className="w-full h-full rounded-t-[20px] flex flex-col gap-y-4 text-xl font-semibold text-light-brown-03">
        

          {(user && user.role === 'root-admin') && <button
            onClick={() => navigate("/new-tournament")}
            className="fixed bottom-20 right-4 bg-light-main-blue text-white rounded-full p-2 text-sm"
          >
            <Plus />
          </button>}
       


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
