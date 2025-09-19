//libraries
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Calendar1, CircleGauge, Loader2, Trash, Trophy } from "lucide-react";
import toast from "react-hot-toast";

//contexts
import { AuthContext } from "../context/AuthContext";
import { NavbarContext } from "../context/NavbarContext";

//custom-hooks
import useTournamnet from "../hooks/useTournamnet";

//components
import Games from "../components/Games";
import PointsTable from "../components/PointsTable";
import Teams from "../components/Teams";
import EnrolledUsers from "../components/EnrolledUsers";
import LoadingScreen from "../components/LoadingScreen";

//utils
import { readableDate } from "../utils/readableDate";

//static assets
import TrophyIcon from "../assets/icons/trophy.png";
import CarromBanner from "../assets/images/carrom-banner.jpeg";
import About from "../components/Tournament/About";
import Rules from "../components/Rules";
import Groups from "../components/Tournament/Groups";

const TournamentDetails = () => {
  const { user, token } = useContext(AuthContext);
  const { navbar, setNavbar } = useContext(NavbarContext);

  const [enrolled, setEnrolled] = useState(false);
  const [enrollmentLoading, setEnrollmentLoading] = useState(false);
  const {
    getTournamentById,
    deleteTournament,
    enrollIntoTournament,
    goLiveTournament,
  } = useTournamnet();
  const params = useParams();
  const navigate = useNavigate();
  const tournamentId = params.id;

  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [goingLive, setGoingLive] = useState(false);

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
        //console.log("Fetched tournament details:", data);
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
      setEnrollmentLoading(true);
      const response = await enrollIntoTournament(tournamentId);
      if (response) {
        console.log("Successfully enrolled into tournament:", response);
        toast.success("Successfully enrolled into tournament");
      }
    } catch (error) {
      console.error("Error enrolling into tournament:", error);
    } finally {
      setEnrollmentLoading(false);
      fetchTournamentDetails(); // Refresh tournament details to update enrolled users
    }
  };

  const handleGoLive = async () => {
    try {
      setGoingLive(true);
      const updated = await goLiveTournament(tournamentId);
      if (updated) {
        toast.success("Tournament is now live");
      }
    } catch (error) {
      console.error("Error going live:", error);
    } finally {
      fetchTournamentDetails();
      setGoingLive(false);
    }
  };

  useEffect(() => {
    if (tournament && user) {
      // if (tournament.enrolledUser.find((u) => u.user._id === user._id)) {
      //   setEnrolled(true);
      // } else {
      //   setEnrolled(false);
      // }
      setEnrolled(
        tournament.enrolledUser.some((entry) => entry._id === user._id)
      );
    }
  }, [tournament]);

  useEffect(() => {
    fetchTournamentDetails();
  }, []);

  //setting navbar
  useEffect(() => {
    setNavbar({
      ...navbar,
      pageTitle: "Tournament Details",
      bg_transparent: true,
      showProfileIcon: false,
    });
    return () => {
      setNavbar({ ...navbar, pageTitle: "", bg_color: "" });
    };
  }, []);

  if (loading) return <LoadingScreen />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="min-h-screen min-w-screen w-screen font-dynapuff relative">
      <div className="w-full flex items-start gap-x-4 p-4">
        <div>
          <img
            src={CarromBanner}
            className="w-24 h-24 object-cover rounded-[10px]"
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <h2 className="flex-1 text-xl text-white font-bold">
            {tournament.name}
          </h2>
          <p className="text-dark-green">{tournament.status}</p>
          <div className="flex  gap-x-4 items-start text-sm text-dark-white/50">
            <p className="text-xs font-thin flex items-center gap-x-1">
              <CircleGauge className="inline" size={12} />
              {tournament.type}
            </p>
            <p className="text-xs font-thin flex items-center gap-x-1">
              <Trophy className="inline" size={12} />
              {tournament.format.name}
            </p>
          </div>
          <p className="text-dark-white/50 text-sm font-thin ">
            {readableDate(tournament.startDate)}
          </p>
        </div>
      </div>

      {/* Scrollable Content Container */}
      <div className="relative z-10 pb-20 min-h-screen">
        {/* Tournament Info Card */}

        {/* Main Content Card */}
        <div className="bg-transaprent overflow-hidden ">
          {tournament.status !== "scheduled" && (
            <div className="w-full text-lg overflow-x-scroll scrollbar-none border-b border-white/10">
              <ul className="w-full flex text-sm justify-around ">
                <li
                  onClick={() => setActiveTab("about")}
                  className={`cursor-pointer px-4 py-2 flex-1 ${
                    activeTab === "about"
                      ? "border-b border-dark-blue text-light-main-blue"
                      : "text-dark-white/50 font-thin"
                  }`}
                >
                  About
                </li>
                <li
                  onClick={() => setActiveTab("games")}
                  className={`cursor-pointer px-4 py-2 flex-1 ${
                    activeTab === "games"
                      ? "border-b border-dark-blue text-light-main-blue"
                      : "text-dark-white/50 font-thin"
                  }`}
                >
                  Games
                </li>
                <li
                  onClick={() => setActiveTab("points")}
                  className={`cursor-pointer px-4 py-2 flex-1 ${
                    activeTab === "points"
                      ? "border-b border-dark-blue text-light-main-blue"
                      : "text-dark-white/50 font-thin"
                  }`}
                >
                  Points
                </li>
                <li
                  onClick={() => setActiveTab("rules")}
                  className={`cursor-pointer px-4 py-2 flex-1 ${
                    activeTab === "rules"
                      ? "border-b border-dark-blue text-light-main-blue"
                      : "text-dark-white/50 font-thin"
                  }`}
                >
                  Rules
                </li>
                <li
                  onClick={() => setActiveTab("groups")}
                  className={`cursor-pointer px-4 py-2 flex-1 ${
                    activeTab === "groups"
                      ? "border-b border-dark-blue text-light-main-blue"
                      : "text-dark-white/50 font-thin"
                  }`}
                >
                  Groups
                </li>
                <li
                  onClick={() => setActiveTab("teams")}
                  className={`cursor-pointer px-4 py-2 flex-1 ${
                    activeTab === "teams"
                      ? "border-b border-dark-blue text-light-main-blue"
                      : "text-dark-white/50 font-thin"
                  }`}
                >
                  Teams
                </li>
              </ul>
            </div>
          )}

          {/* Tab Content */}
          {tournament.status === "live" ||
          tournament.status === "completed" ||
          tournament.status === "cancelled" ? (
            <div>
              {activeTab === "about" && (
                <div className="p-4">
                  <About />
                </div>
              )}
              {activeTab === "games" && (
                <div className="p-4">
                  <Games
                    tournamentId={tournament._id}
                    tournamentAdmin={tournament.tournamentAdmin}
                  />
                </div>
              )}
              {activeTab === "points" && (
                <div className="p-4">
                  <PointsTable />
                </div>
              )}
              {activeTab === "rules" && (
                <div className="p-4">
                  <Rules />
                </div>
              )}
              {activeTab === "groups" && (
                <div className="p-4">
                  <Groups />
                </div>
              )}
              {activeTab === "teams" && (
                <div className="p-4">
                  <Teams />
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 flex gap-y-4 flex-col items-start">
              <div className="w-full flex items-center gap-x-2">
                <div className="text-center text-base text-stone-500 bg-stone-200 py-1 px-4 rounded-full border-2 border-stone-300">
                  Scheduled
                </div>

                {enrolled ? (
                  <button className="bg-cyan-300 text-cyan-700 border-cyan-700 border overflow-hidden py-1 text-base px-4 rounded-full">
                    Enrolled
                  </button>
                ) : (
                  <button
                    onClick={handleEnroll}
                    className="bg-red-400 text-white px-4 py-2 rounded-full"
                  >
                    {enrollmentLoading ? (
                      <Loader2
                        className="animate-spin text-stone-100"
                        size={16}
                      />
                    ) : (
                      "Enroll"
                    )}
                  </button>
                )}
              </div>

              <EnrolledUsers players={tournament.enrolledUser} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TournamentDetails;
