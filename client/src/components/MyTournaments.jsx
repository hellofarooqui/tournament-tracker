import React from "react";

import SnookerIcon from "../../src/assets/icons/billiard-ball.png";

const MyTournaments = () => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between w-full text-stone-700">
        <h2 className="text-xl font-bold text-start">My Tournaments</h2>
        <p className="text-sm underline text-stone-400 bg-slate-200/20 px-4 py-1 rounded-full">View All</p>
      </div>
      <div className="flex flex-col items-start gap-y-4 mt-4 ">
        <div className="w-full flex flex-col gap-y-1 text-sm bg-white p-4 rounded-[15px] border-1 border-slate-200 shadow-sm">
          <p className="text-lg font-bold text-stone-700">MINA Championship</p>
          <p className="text-stone-400 flex items-center"><img src={SnookerIcon} className="inline-block w-4 h-4 mr-1" /> Snookers</p>
          <p className="bg-gradient-to-br from-stone-200 to-stone-100 text-stone-700 p-1 px-2 rounded-full">Next Game: Strikers vs Panthers</p>
        </div>
        <div className="w-full flex flex-col gap-y-1 text-sm bg-white p-4 rounded-[15px] border-1 border-slate-200 shadow-sm">
          <p className="text-lg font-bold text-stone-700">MINA Championship</p>
          <p className="text-stone-400 flex items-center"><img src={SnookerIcon} className="inline-block w-4 h-4 mr-1" /> Snookers</p>
          <p className="bg-gradient-to-br from-stone-200 to-stone-100 text-stone-700 p-1 px-2 rounded-full">Next Game: Strikers vs Panthers</p>
        </div>
      </div>
    </div>
  );
};

export default MyTournaments;
