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
import CarromBanner from "../assets/images/carrom-banner.jpeg"
import About from "../components/Tournament/About";
import Rules from "../components/Rules";

const TournamentDetails = () => {
  const { user, token } = useContext(AuthContext);
  const { navbar, setNavbar } = useContext(NavbarContext)

  const [enrolled, setEnrolled] = useState(false);
  const [enrollmentLoading, setEnrollmentLoading] = useState(false);
  const { getTournamentById, deleteTournament, enrollIntoTournament, goLiveTournament } =
    useTournamnet();
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
      setEnrollmentLoading(true);
      const response = await enrollIntoTournament(tournamentId);
      if (response) {
        console.log("Successfully enrolled into tournament:", response);
        toast.success("Successfully enrolled into tournament");
      }
    } catch (error) {
      console.error("Error enrolling into tournament:", error);
    }
    finally {
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

    }
    catch (error) {
      console.error("Error going live:", error);
    }
    finally {
      fetchTournamentDetails();
      setGoingLive(false);
    }
  }

  useEffect(() => {
    if (tournament && user) {
      // if (tournament.enrolledUser.find((u) => u.user._id === user._id)) {
      //   setEnrolled(true);
      // } else {
      //   setEnrolled(false);
      // }
      setEnrolled(tournament.enrolledUser.some((entry) => entry._id === user._id));
    }

  }, [tournament]);

  useEffect(() => {
    fetchTournamentDetails();
  }, []);

  //setting navbar
  useEffect(() => {
    setNavbar({ ...navbar, pageTitle: "", bg_transparent: true, showProfileIcon: false })
    return () => {
      setNavbar({ ...navbar, pageTitle: "", bg_color: "" })
    }
  }, [])

  if (loading)
    return (
      <LoadingScreen />
    );
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="min-h-screen w-full font-dynapuff relative">
      
      {/* Fixed Banner Background - Half screen only */}
      <div className="fixed top-0 left-0 w-full h-1/2 z-0">
        <img src={CarromBanner} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-25% via-transparent via-50% to-[rgba(231,234,244,1)] to-100%"></div>
      </div>

      {/* Scrollable Content Container */}
      <div className="relative z-10 pt-48 px-4 pb-20 min-h-screen">
        
        {/* Tournament Info Card */}
        <div className="bg-white rounded-[16px] w-full flex flex-col gap-y-1 items-start justify-end p-4 mb-4">
          <h2 className="text-lg text-light-text-dull-01 font-bold text-center w-full">
            {tournament.name}{" "}
          </h2>
          <div className="flex flex-col gap-y-2 items-start text-sm text-light-text-dull-01/70">
            <p className="text-xs font-thin flex items-center gap-x-2">
              <CircleGauge className="inline" size={16} />{tournament.type}
            </p>
            <p className="text-xs font-thin flex items-center gap-x-2">
              <Trophy className="inline" size={16} />{tournament.format.name}
            </p>
            <p className="text-xs font-thin flex items-center gap-x-2">
              <Calendar1 className="inline" size={16} />{readableDate(tournament.startDate)}
            </p>
          </div>
          <div className="flex gap-x-4 items-center justify-between">
            {(tournament.tournamentAdmin === user._id && tournament.status !== "live") && (
              <button 
                onClick={handleGoLive} 
                className="text-sm bg-red-500 text-white px-4 py-1 rounded-2xl"
              >
                {goingLive ? <Loader2 className="text-white animate-spin" size={12} /> : "Go Live"}
              </button>
            )}
          </div>
        </div>
        
        {/* Main Content Card */}
        <div className="bg-white rounded-[16px] overflow-hidden border-4 border-white">
          {tournament.status !== "scheduled" && (
            <div className="w-full text-lg overflow-x-scroll scrollbar-none">
              <ul className="w-full flex text-sm justify-around ">
                <li
                  onClick={() => setActiveTab("about")}
                  className={`text-center cursor-pointer px-4 py-2 flex-1 ${
                    activeTab === "about"
                      ? "bg-white border-b-4 border-light-main-blue text-light-main-blue"
                      : "bg-white text-light-text-dull-01"
                  }`}
                >
                  About
                </li>
                <li
                  onClick={() => setActiveTab("games")}
                  className={`text-center cursor-pointer px-4 py-2 flex-1 ${
                    activeTab === "games"
                      ? "bg-white border-b-4 border-light-main-blue text-light-main-blue"
                      : "bg-white text-light-text-dull-01"
                  }`}
                >
                  Games
                </li>
                <li
                  onClick={() => setActiveTab("points")}
                  className={`text-center cursor-pointer px-4 py-2 flex-1 ${
                    activeTab === "points"
                      ? "bg-white border-b-4 border-light-main-blue text-light-main-blue"
                      : "bg-white text-light-text-dull-01"
                  }`}
                >
                  Points
                </li>
                <li
                  onClick={() => setActiveTab("rules")}
                  className={`text-center cursor-pointer px-4 py-2 flex-1 ${
                    activeTab === "rules"
                      ? "bg-white border-b-4 border-light-main-blue text-light-main-blue"
                      : "bg-white text-light-text-dull-01"
                  }`}
                >
                  Rules
                </li>
                <li
                  onClick={() => setActiveTab("teams")}
                  className={`text-center cursor-pointer px-4 py-2 flex-1 ${
                    activeTab === "teams"
                      ? "bg-white border-b-4 border-light-main-blue text-light-main-blue"
                      : "bg-white text-light-text-dull-01"
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
                      <Loader2 className="animate-spin text-stone-100" size={16} />
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