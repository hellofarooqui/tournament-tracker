import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useTournamnet from "../hooks/useTournamnet";
import { Loader2, Trash } from "lucide-react";
import Games from "../components/Games";
import PointsTable from "../components/PointsTable";
import Teams from "../components/Teams";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import EnrolledUsers from "../components/EnrolledUsers";
import { readableDate } from "../utils/readableDate";
import TrophyIcon from "../assets/icons/trophy.png";

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
        console.log("Fetched tournament details:", data);
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
      // if (tournament.enrolledUser.find((u) => u.user._id === user._id)) {
      //   setEnrolled(true);
      // } else {
      //   setEnrolled(false);
      // }
      setEnrolled(tournament.enrolledUser.some((entry) => entry.user._id === user._id));
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
    <div className="w-screen h-screen fixed flex  py-16">
      <div className="w-full h-full bg-neutral-100 rounded-t-[20px] mx-auto flex flex-col gap-y-4 text-xl font-semibold text-slate-200 p-6  overflow-y-scroll">
        <div className="w-full bg-white border-2 border-neutral-200 rounded-[15px]  p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl text-neutral-700 font-bold">
              {tournament.name}{" "}
            </h2>
            {user && user.role === "root-admin" && (
              <button
                onClick={handleDeleteTournament}
                className="bg-gradient-to-r from-stone-800 to-stone-700 text-slate-100 p-2 rounded-[15px] text-sm"
              >
                <Trash className="" size={18} />
              </button>
            )}
          </div>
          <div className="flex gap-x-2 items-center text-sm mt-2">
            <p className="text-stone-500">{tournament.type} - {tournament.format.name}</p>
          </div>

          <p className="text-xs font-thin text-stone-500 mt-2">
            Start: {readableDate(tournament.startDate)}
          </p>
          {tournament.winner && (
            <p className="text-base bg-emerald-100 text-neutral-600 px-4 py-1 rounded-lg mt-4">
              <img src={TrophyIcon} className="inline w-6 h-6 mr-2" />
              Champions: {tournament.winner?.name}
            </p>
          )}
        </div>

        {tournament.status !== "scheduled" && (
          <div className="w-full text-lg">
            <ul className="w-full flex gap-x-4">
              <li
                onClick={() => setActiveTab("games")}
                className={`text-center cursor-pointer  px-4 py-2 flex-1 rounded-[15px] ${activeTab == "games"
                    ? "bg-gradient-to-r from-stone-800 to-stone-700 text-slate-100"
                    : "bg-neutral-200 text-neutral-500"
                  } `}
              >
                Games
              </li>
              <li
                onClick={() => setActiveTab("points")}
                className={`text-center cursor-pointer  px-4 py-2 flex-1 rounded-[15px] ${activeTab == "points"
                    ? "bg-gradient-to-r from-stone-800 to-stone-700 text-slate-100"
                    : "bg-neutral-200 text-neutral-500"
                  } `}
              >
                Points
              </li>
              <li
                onClick={() => setActiveTab("teams")}
                className={`text-center cursor-pointer  px-4 py-2 flex-1 rounded-[15px] ${activeTab == "teams"
                    ? "bg-gradient-to-r from-stone-800 to-stone-700 text-slate-100"
                    : "bg-neutral-200 text-neutral-500"
                  } `}
              >
                Teams
              </li>
            </ul>
          </div>
        )}
        {tournament.status == "live" ||
          tournament.status == "completed" ||
          tournament.status == "cancelled" ? (
          <div>
            {activeTab == "games" && (
              <Games
                tournamentId={tournament._id}
                tournamentAdmin={tournament.tournamentAdmin}
              />
            )}
            {activeTab == "points" && <PointsTable />}
            {activeTab == "teams" && <Teams />}
          </div>
        ) : (
          <div className="mt-4 flex  gap-y-4 flex-col items-start">
            <div className="flex gap-x-2 items-center text-lg">
              <div className="text-center text-stone-500 bg-stone-200 py-2 px-4 rounded-[5px]  border-2 border-stone-300">
                Upcoming
              </div>

              {enrolled ? (
                <button className="bg-cyan-300 text-cyan-950 py-2 px-4 rounded-[5px]">
                  {" "}
                  Enrolled
                </button>
              ) : (
                <button
                  onClick={handleEnroll}
                  className="bg-red-400 text-white px-4 py-2 rounded-[5px]"
                >
                  {" "}
                  Enroll
                </button>
              )}
            </div>

            <EnrolledUsers players={tournament.enrolledUser} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TournamentDetails;
