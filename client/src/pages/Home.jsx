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

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, []);

  if (authLoading) {
    return <Loader2 className="animate-spin" />;
  }

  return (
    <div className="w-screen h-screen flex flex-col items-start justify-start font-dynapuff ">
      <div className="w-full flex flex-col items-start gap-y-4 ">
        {/* <img src={CarromLogo} className="w-24 h-24 mb-12 animate-[spin_9s_linear_infinite]" /> */}
        {user && (
          <div className="w-full p-6 bg-transparent flex items-center justify-between">
            <p className="text-white text-3xl font-bold">
              Hi {user.firstName}{" "}
            </p>
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FFA9CC] via-[#FEB2A4] to-[#FFC36B] flex items-center justify-center">
              <User className="text-white" size={20} />
            </div>
          </div>
        )}
        <div className="w-full px-4">
          <MyTournaments />
        </div>

        <div className="w-full p-4">
          <UpcomingTournaments />
        </div>
      </div>
    </div>
  );
};

export default Home;
