import React from "react";
import { readableDate } from "../utils/readableDate";
import WinnerUpdateModal from "./WinnerUpdateModal";
import { CircleCheck, Crown, Frown } from "lucide-react";
import CrownIcon from "./../assets/crown.png";
import EggIcon from "./../assets/egg.png";

const GameListCard = ({ game }) => {
  const [showWinnerUpdateModal, setShowWinnerUpdateModal] =
    React.useState(false);
  return (
    <div
      onClick={() => setShowWinnerUpdateModal(true)}
      className="bg-white backdrop-blur-2xl rounded-[20px] border-2 border-neutral-200 overflow-hidden flex flex-col gap-y-1 p-6  hover:scale-105 transition-transform ease-in-out duration-200"
    >
      {game.winner && (
        <CircleCheck className="absolute top-2 right-2 text-green-500" size={16}/>
      )}
      {/* <h3 className="text-sm font-semibold">{game.teams[0].name} vs {game.teams[1].name}</h3> */}
      <div>
        <h2 className="text-neutral-600 text-[16px] text-center bg-stone-200 rounded-[10px] mb-2 leading-10">
          {game.name && game.name}
        </h2>
      </div>
      <div className="grid grid-cols-[40%_auto_40%] w-full items-center">
        <div className="flex flex-col gap-y-2 justify-center items-center">
          <div className="rounded-[20px] bg-gradient-to-bl  from-[#FFA9CC] via-[#FEB2A4] to-[#FFC36B] w-16 h-16 flex justify-center items-center">
            {game.winner &&
              (game.winner._id === game.teams[0]._id ? (
                <img
                  src={CrownIcon}
                  className="w-10 h-10 object-cover animate-bounce"
                />
              ) : (
                <img src={EggIcon} className="w-8 h-8 object-cover" />
              ))}
          </div>
          <p className="text-sm text-center text-neutral-600">{game.teams[0].name}</p>
        </div>

        <h2 className="text-center text-neutral-700">VS</h2>

        <div className="flex flex-col gap-y-2  justify-center items-center">
          <div className="rounded-[20px]  bg-gradient-to-br from-[#3385D9] via-[#1BA9EB] to-[#0AC2F8]  w-16 h-16 flex justify-center items-center">
            {game.winner &&
              (game.winner._id === game.teams[1]._id ? (
                <img
                  src={CrownIcon}
                  className="w-10 h-10 object-cover animate-bounce"
                />
              ) : (
                <img src={EggIcon} className="w-8 h-8 object-cover" />
              ))}
          </div>
          <p className="text-sm text-center text-neutral-600">{game.teams[1].name}</p>
        </div>
      </div>
      <p className="text-center rounded-[10px] p-1 py-2 bg-neutral-100 text-neutral-500 text-sm">
        Date: {readableDate(game.scheduledDate)}
      </p>

      {showWinnerUpdateModal && (
        <WinnerUpdateModal
          game={game}
          onClose={() => setShowWinnerUpdateModal(false)}
        />
      )}
    </div>
  );
};
export default GameListCard;
