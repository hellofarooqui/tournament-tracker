import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router";

import GradientLogo from "../components/GradientLogo";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Flame, Hamburger, Loader2, Menu, Search, User } from "lucide-react";
import MyTournaments from "../components/MyTournaments";
import UpcomingTournaments from "../components/UpcomingTournaments";
import TemporayPage from "./TemporayPage";

import CarromTournament from './../assets/images/carrom-tournament.png'
import Cricket01 from './../assets/images/cricket-1.jpg'

import TournamentCard from "../components/Home/TournamentCard";
import Categories from "../components/Home/Categories";
import { NavbarContext } from "../context/NavbarContext";
import LoadingScreen from "../components/LoadingScreen";

const Home = () => {
  const {navbar, setNavbar} = useContext(NavbarContext)
  const { user, authLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!authLoading && !user) {
  //     navigate("/login");
  //   }
  // }, []);

  useEffect(()=>{
    setNavbar({...navbar, pageTitle:"Tournario", bg_color:"#0061ff",bg_transparent:false})
    return ()=>{
      setNavbar({...navbar, pageTitle:"", bg_color:""})
    }
  },[])

  if (authLoading) {
    return (<LoadingScreen/>)
  }

  return (
    <div className="min-h-full flex flex-col gap-y-4 items-start justify-start font-dynapuff overflow-y-scroll p-3 pb-20 ">
      {/* <div className="h-full w-full flex flex-col items-start ">
        <img src={CarromLogo} className="w-24 h-24 mb-12 animate-[spin_9s_linear_infinite]" />
        {user && (
          <div className="w-full h-16 bg-transparent flex items-center justify-between px-6">
            <p className="text-white text-xl font-bold">
              Hi {user.firstName}{" "}
            </p>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-stone-500 via-stone-400 to-stone-300 flex items-center justify-center">
              <User className="text-white" size={20} />
            </div>
          </div>
        )}
        <div className="h-full w-full rounded-t-[20px] flex flex-col gap-y-8 bg-neutral-100 pt-4 px-6">
          <span onClick={() => navigate("/temp-page")} className="w-full flex justify-between items-center animate-pulse bg-blue-600 text-white p-1 rounded-lg px-2 cursor-pointer">
            <p>Committe Election</p><p className="text-lg ">{">>>"}</p></span>
          <div className="w-full ">
            <MyTournaments />
          </div>

          <div className="w-full">
            <UpcomingTournaments />
          </div>
        </div>
      </div> */}
      {/* <div className="w-full flex items-center">
        <Menu className="border-2 rounded-md p-1 border-light-main-blue/30 text-light-main-blue" size={30} />
        <h2 className="flex-1 text-center text-xl font-semibold text-light-text-dull-01">Discover</h2>
        <Flame className="text-light-text-dull-02" size={32} />
      </div> */}

      {/*search bar section*/}
      <div className="w-full ">
        <form className="w-full rounded-[10px] bg-dark-gray flex items-center p-2 px-4">
          <input className="w-full text-light-text-dull-01 focus:outline-none" placeholder="search" />
          <button className="text-light-text-dull-02 hover:text-light-text-dull-01 cursor-pointer"><Search className="text-dark-white/30" /></button>
        </form>
      </div>

      {/* <span onClick={() => navigate("/temp-page")} className="w-full flex justify-between items-center animate-pulse bg-blue-600 text-white p-1 rounded-lg px-2 cursor-pointer">
        <p>Committe Election</p><p className="text-lg ">{">>>"}</p></span> */}
      
      
      {/* categories section */}
      <Categories/>


      {/* Tournaments */}
      <div className="w-full flex flex-col gap-y-4 mt-2">
        <div className="w-full flex justify-between items-center text-sm">
          <p className="text-dark-white text-lg font-semibold">Tournaments</p>
          <select className="bg-dark-gray text-white/50 px-2 py-1 rounded-md">
            <option>Popular</option>
            <option>Archived</option>
            <option>Upcoming</option>
          </select>
        </div>

        <div className="flex flex-col gap-y-3">
          <TournamentCard image={CarromTournament} title={"MQH-CHAMP-01 Tournament"} />
          <TournamentCard image={Cricket01} title={"Avrioc Cricket Tournament"} />
          <TournamentCard image={CarromTournament} title={"MQH-CHAMP-02 Tournament"} />
        </div>
      </div>
    </div>
  );
};

export default Home;
