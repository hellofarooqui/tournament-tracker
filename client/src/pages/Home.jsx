import React from "react";
import { Link } from "react-router";
import CarromLogo from "./../assets/carrom.png";
import GradientLogo from "../components/GradientLogo";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Home = () => {

  const { user } = useContext(AuthContext)

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center font-dynapuff px-8">
      <div className="flex flex-col items-center gap-y-4 mb-8">
        {/* <img src={CarromLogo} className="w-24 h-24 mb-12 animate-[spin_9s_linear_infinite]" /> */}
        <GradientLogo/>
        <h1 className="mt-6 text-4xl text-center text-slate-200 leading-0.5 ">
          Carrom 
        </h1>
        <p className="text-sm text-slate-400">Championship Tracker</p>
      </div>
      <div className="w-full max-w-sm flex flex-col gap-y-4 text-lg font-semibold  text-white">
        
        <Link
          to="all-tournaments"
          className=" bg-gradient-to-r from-[#0AC2F8] to-[#3385D9] p-2 rounded-[20px] px-8 py-4 text-center"
        >
          View Tournaments
        </Link>
        {user && <Link
          to="/profile"
          className="bg-gradient-to-bl to-[#7689df] from-[#9a62d2]  p-2 rounded-[20px] px-8 py-4 text-center"
        >
          Profile
        </Link>}
        {user ? <h2 className="text-center mt-4">Welcome, {user.username}!</h2> :<Link
          to="login"
          className=" bg-slate-100/20 border-2 border-slate-100/30 p-2 rounded-[20px] px-8 py-4 text-center"
        >
          Login
        </Link>}
      </div>
    </div>
  );
};

export default Home;
