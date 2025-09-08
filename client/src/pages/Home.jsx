import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import CarromLogo from "./../assets/carrom.png";
import GradientLogo from "../components/GradientLogo";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Loader2, User } from "lucide-react";
import MyTournaments from "../components/MyTournaments";
import UpcomingTournaments from "../components/UpcomingTournaments";

const Home = () => {
  const { user, authLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!authLoading && !user) {
  //     navigate("/login");
  //   }
  // }, []);

  if (authLoading) {
    return <Loader2 className="animate-spin" />;
  }

  return (
    <div className="w-screen h-screen flex flex-col items-start justify-start font-dynapuff overflow-y-scroll">
      <div className="h-full w-full flex flex-col items-start ">
        {/* <img src={CarromLogo} className="w-24 h-24 mb-12 animate-[spin_9s_linear_infinite]" /> */}
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
          <div className="w-full ">
            <MyTournaments />
          </div>

          <div className="w-full">
            <UpcomingTournaments />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
