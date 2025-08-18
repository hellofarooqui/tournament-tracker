import React from "react";
import { Link } from "react-router";
import CarromLogo from "./../assets/carrom.png";

const Home = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center py-16 font-dynapuff px-8">
      <div className="flex flex-col items-center gap-y-4 mb-8">
        <img src={CarromLogo} className="w-24 h-24 mb-12 animate-[spin_9s_linear_infinite]" />
        <h1 className="text-4xl text-center text-slate-200 leading-0.5 ">
          Carrom 
        </h1>
        <p className="text-sm text-slate-400">Championship Tracker</p>
      </div>
      <div className="w-full flex flex-col gap-y-4 text-lg font-semibold  text-white">
        <Link
          to="new-tournament"
          className="w-full bg-gradient-to-r from-[#FD6861] to-[#F05C2E]  p-2 rounded-[20px] px-8 py-4 text-center"
        >
          Create Tournament
        </Link>
        <Link
          to="all-tournaments"
          className="bg-gradient-to-r from-[#0AC2F8] to-[#3385D9] p-2 rounded-[20px] px-8 py-4 text-center"
        >
          View Tournaments
        </Link>
        <Link
          to="settings"
          className="bg-slate-100/20 border-2 border-slate-100/30 p-2 rounded-[20px] px-8 py-4 text-center"
        >
          Settings
        </Link>
      </div>
    </div>
  );
};

export default Home;
