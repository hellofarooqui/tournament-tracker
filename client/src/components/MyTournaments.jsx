import React from "react";

import SnookerIcon from "../../src/assets/icons/billiard-ball.png";

const MyTournaments = () => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between w-full text-slate-200">
        <h2 className="text-2xl font-bold text-start">My Tournaments</h2>
        <p className="text-sm underline bg-slate-200/20 px-4 py-1 rounded-full">View All</p>
      </div>
      <div className="flex flex-col items-start gap-y-4 mt-4 ">
        <div className="w-full flex flex-col gap-y-1 text-sm bg-slate-200/20 p-4 rounded-[15px] border-1 border-slate-200/40">
          <p className="text-lg font-bold text-slate-100">MINA Championship</p>
          <p className="text-slate-100/70 flex items-center"><img src={SnookerIcon} className="inline-block w-4 h-4 mr-1" /> Snookers</p>
          <p className="text-emerald-200 bg-slate-200/20 p-1 px-2 rounded-full">Next Game: Strikers vs Panthers</p>
        </div>
        <div className="w-full flex flex-col gap-y-2 text-sm bg-slate-200/20 p-4 rounded-[15px] border-1 border-slate-200/40">
          <p className="text-lg font-bold text-slate-100">MINA Championship</p>
          <p className="text-slate-100/70 flex items-center"><img src={SnookerIcon} className="inline-block w-4 h-4 mr-1" /> Snookers</p>
         <p className="text-emerald-200 bg-slate-200/20 p-1 px-2 rounded-full">Next Game: Strikers vs Panthers</p>
        </div>
      </div>
    </div>
  );
};

export default MyTournaments;
