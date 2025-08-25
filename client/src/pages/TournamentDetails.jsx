import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useTournamnet from "../hooks/useTournamnet";
import { Loader2 } from "lucide-react";
import Games from "../components/Games";
import PointsTable from "../components/PointsTable";
import Teams from "../components/Teams";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

const TournamentDetails = () => {
  const { user, token } = useContext(AuthContext);
  const [enrolled, setEnrolled] = useState(false);
  const { getTournamentById, deleteTournament, enrollIntoTournament } =
    useTournamnet();
  const params = useParams();
  const navigate = useNavigate();
  const tournamentId = params.id;

  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showGames, setShowGames] = useState(true);
  const [showTeams, setShowTeams] = useState(false);
  const [showPointsTable, setShowPointsTable] = useState(false);
  const [activeTab, setActiveTab] = useState("games");

  const fetchTournamentDetails = async () => {
    setLoading(true);
    try {
      const data = await getTournamentById(tournamentId);
      if (data) {
        setTournament(data);
      } else {
        console.error("Tournament not found");
      }
    } catch (error) {
      console.error("Error fetching tournament details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTournament = async () => {
    if (window.confirm("Are you sure you want to delete this tournament?")) {
      try {
        const response = await deleteTournament(tournamentId);
        if (response) {
          console.log("Tournament deleted successfully:", response);
          toast.success("Tournament deleted successfully");
          navigate("/all-tournaments"); // Redirect to tournaments list
          // Optionally, redirect or update state after deletion
        }
      } catch (error) {
        console.error("Error deleting tournament:", error);
      }
    }
  };

  const handleEnroll = async () => {
    if (!user || !token) {
      toast.error("User is not authenticated");
      navigate("/login");
      return;
    }

    try {
      const response = await enrollIntoTournament(tournamentId);
      if (response) {
        console.log("Successfully enrolled into tournament:", response);
        toast.success("Successfully enrolled into tournament");
      }
    } catch (error) {
      console.error("Error enrolling into tournament:", error);
    }
  };

  useEffect(() => {
    if (tournament && user) {
      if (tournament.enrolledUser.includes(user._id)) {
        setEnrolled(true);
      } else {
        setEnrolled(false);
      }
    }
  }, [tournament]);

  useEffect(() => {
    fetchTournamentDetails();
  }, []);

  if (loading)
    return (
      <div className="w-full h-screen flex items-center justify-center py-16 font-dynapuff">
        <div className="flex flex-col gap-y-4 text-xl font-semibold text-slate-200">
          <Loader2 className="animate-spin" />
        </div>
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="w-full h-screen flex  py-16">
      <div className="w-full max-w-sm mx-auto flex flex-col gap-y-4 text-xl font-semibold text-slate-200 p-6">
        <div className="w-full flex justify-between items-center">
          <h2 className="text-2xl text-slate-200">{tournament.name} </h2>
          {user && user.role === "root-admin" && (
            <button
              onClick={handleDeleteTournament}
              className="bg-gradient-to-r from-[#FD6861] to-[#F05C2E] text-slate-100 px-4 py-2 rounded-full text-sm"
            >
              Delete
            </button>
          )}
        </div>

        {tournament.status == "ongoing" && (
          <div className="w-full text-lg">
            <ul className="w-full flex gap-x-4">
              <li
                onClick={() => setActiveTab("games")}
                className={`text-center cursor-pointer  px-4 py-2 flex-1 rounded-full ${
                  activeTab == "games"
                    ? "bg-gradient-to-r from-[#FD6861] to-[#F05C2E] text-slate-100"
                    : "bg-slate-200/30 text-slate-100"
                } `}
              >
                Games
              </li>
              <li
                onClick={() => setActiveTab("points")}
                className={`text-center cursor-pointer  px-4 py-2 flex-1 rounded-full ${
                  activeTab == "points"
                    ? "bg-gradient-to-r from-[#FD6861] to-[#F05C2E] text-slate-100"
                    : "bg-slate-200/30 text-slate-100"
                } `}
              >
                Points
              </li>
              <li
                onClick={() => setActiveTab("teams")}
                className={`text-center cursor-pointer  px-4 py-2 flex-1 rounded-full ${
                  activeTab == "teams"
                    ? "bg-gradient-to-r from-[#FD6861] to-[#F05C2E] text-slate-100"
                    : "bg-slate-200/30 text-slate-100"
                } `}
              >
                Teams
              </li>
            </ul>
          </div>
        )}
        {tournament.status == "ongoing" ? (
          <div>
            {activeTab == "games" && <Games tournamentId={tournament._id} />}
            {activeTab == "points" && <PointsTable />}
            {activeTab == "teams" && <Teams />}
          </div>
        ) : (
          <div className="py-12 flex  gap-y-4 flex-col items-center">
            <div className="text-center text-slate-200 bg-yellow-200/20 p-2 rounded-lg border-yellow-200/40 border-2">
              Upcoming Tournament
            </div>
            <button
              onClick={handleEnroll}
              className="bg-emerald-200 text-emerald-950 px-8 py-2 rounded-lg"
            >
              {enrolled ? "Enrolled" : "Enroll"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TournamentDetails;
