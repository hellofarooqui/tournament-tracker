import React from "react";

import SnookerIcon from "../../src/assets/icons/billiard-ball.png";
import CarromIcon from "../../src/assets/icons/carrom.png";
import CricketIcon from "../../src/assets/icons/cricket.png";


const UpcomingTournaments = () => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between w-full text-slate-200">
        <h2 className="text-2xl font-bold text-start">New Tournaments</h2>
        <p className="text-sm underline bg-slate-200/20 px-4 py-1 rounded-full">View All</p>
      </div>
      <div className="flex flex-col items-start gap-y-4 mt-4 ">
         <div className="w-full flex justify-between text-sm bg-slate-200/20 p-4 rounded-[15px] border-1 border-slate-200/40">
          <div className="flex flex-col gap-y-2">
            <p className="text-lg font-bold text-slate-100">
              FAB Championship
            </p>
            <p className="text-slate-100/70 flex items-center">
              <img src={CarromIcon} className="inline-block w-4 h-4 mr-1" />{" "}
              Carrom
            </p>
          </div>

          <button className="bg-green-400 rounded-full p-1 px-4 text-white self-center">Join</button>
        </div>
        <div className="w-full flex justify-between text-sm bg-slate-200/20 p-4 rounded-[15px] border-1 border-slate-200/40">
          <div className="flex flex-col gap-y-2">
            <p className="text-lg font-bold text-slate-100">
              ADNOC Championship
            </p>
            <p className="text-slate-100/70 flex items-center">
              <img src={CricketIcon} className="inline-block w-4 h-4 mr-1" />{" "}
              Cricket
            </p>
          </div>

          <button className="bg-green-400 rounded-full p-1 px-4 text-white self-center">Join</button>
        </div>
      </div>
    </div>
  );
};

export default UpcomingTournaments;
