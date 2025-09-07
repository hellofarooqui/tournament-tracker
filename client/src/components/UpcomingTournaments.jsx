import React from "react";

import SnookerIcon from "../../src/assets/icons/billiard-ball.png";
import CarromIcon from "../../src/assets/icons/carrom.png";
import CricketIcon from "../../src/assets/icons/cricket.png";


const UpcomingTournaments = () => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between w-full text-slate-200">
        <h2 className="text-xl text-stone-700 font-bold text-start">New Tournaments</h2>
        <p className="text-sm text-stone-400 underline bg-stone-200/20 px-4 py-1 rounded-full">View All</p>
      </div>
      <div className="flex flex-col items-start gap-y-4 mt-4 ">
         <div className="w-full flex justify-between text-sm bg-white shadow-sm p-4 rounded-[15px] border-1 border-stone-200">
          <div className="flex flex-col gap-y-2">
            <p className="text-lg font-bold text-stone-700">
              FAB Championship
            </p>
            <p className="text-stone-400 flex items-center ">
              <img src={CarromIcon} className="inline-block w-4 h-4 mr-1" />{" "}
              Carrom
            </p>
          </div>

          <button className="bg-green-400 rounded-full p-1 px-4 text-white self-center">Join</button>
        </div>
         <div className="w-full flex justify-between text-sm bg-white shadow-sm p-4 rounded-[15px] border-1 border-stone-200">
          <div className="flex flex-col gap-y-2">
            <p className="text-lg font-bold text-stone-700">
              ADNOC Championship
            </p>
            <p className="text-stone-400/70 flex items-center">
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
