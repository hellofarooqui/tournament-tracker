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
      className="bg-white backdrop-blur-2xl rounded-[10px] border-2 border-neutral-200 overflow-hidden flex flex-col gap-y-1  hover:scale-105 transition-transform ease-in-out duration-200 pb-2 shadow-sm cursor-pointer"
    >
      {/* {game.winner && (
        <CircleCheck
          className="absolute top-2 right-2 text-green-500"
          size={16}
        />
      )} */}
      {/* <h3 className="text-sm font-semibold">{game.teams[0].name} vs {game.teams[1].name}</h3> */}
      <div className="flex justify-between text-sm text-stone-700 bg-stone-200 px-4">
        <p className=" py-1">{game.name && game.name}</p>
        <p className=" py-1 ">
         {readableDate(game.scheduledDate)}
        </p>
      </div>
      <div className="grid grid-cols-[40%_auto_40%] w-full items-center">
        <div className="flex flex-col gap-y-2 justify-center items-center mt-2">
          <div className="rounded-[5px] bg-stone-600 w-10 h-10 flex justify-center items-center">
            {game.winner &&
              (game.winner._id === game.teams[0]._id ? (
                <img
                  src={CrownIcon}
                  className="w-8 h-8 object-cover"
                />
              ) : (
                <img src={EggIcon} className="w-6 h-6 object-cover" />
              ))}
          </div>
          <p className="text-sm text-center text-neutral-600">
            {game.teams[0].name}
          </p>
        </div>

        <h2 className="text-center text-neutral-700">VS</h2>

        <div className="flex flex-col gap-y-2  justify-center items-center mt-2">
          <div className="rounded-[5px] bg-stone-700  w-10 h-10 flex justify-center items-center">
            {game.winner &&
              (game.winner._id === game.teams[1]._id ? (
                <img
                  src={CrownIcon}
                  className="w-8 h-8 object-cover"
                />
              ) : (
                <img src={EggIcon} className="w-6 h-6 object-cover" />
              ))}
          </div>
          <p className="text-sm text-center text-neutral-600">
            {game.teams[1].name}
          </p>
        </div>
      </div>

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
