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
      className="bg-dark-blue/8 flex flex-col gap-y-2  hover:scale-105 transition-transform ease-in-out duration-200 p-4"
    >
      <div className="flex justify-between text-sm text-white">
        <p className=" text-dark-white/50">
          {game.name && game.name} - {readableDate(game.scheduledDate)}
        </p>
        {game.winner ? (
          <p className="text-dark-green text-sm">Finished</p>
        ) : (
          <p className="text-orange-300/70 text-sm">Upcoming</p>
        )}
      </div>
      <div className="flex flex-col  w-full items-start">
        {/* <div className="flex  gap-x-2 justify-center items-center mt-2">
          <div className="rounded-full bg-light-main-blue/30 w-10 h-10 flex justify-center items-center">
            {game.winner &&
              (game.winner._id === game.teams[0]._id && (
                <Crown className="text-dark-white/50" size={18} />
              ))}
          </div>
          <p className="text-xs text-center text-light-text-dull-01 line-clamp-1">
            {game.teams[0].name}
          </p>
        </div>

        <div className="flex gap-x-2  justify-center items-center mt-2">
          <div className="rounded-full bg-light-main-blue/30  w-10 h-10 flex justify-center items-center">
            {game.winner &&
              (game.winner._id === game.teams[1]._id && (
                <Crown className="text-dark-white/50" size={18} />
              ))}
          </div>
          <p className="text-xs text-center text-light-text-dull-01 line-clamp-1">
            {game.teams[1].name}
          </p>
        </div> */}
        {game.teams.map((team) => (<div key={team._id} className="w-full flex gap-x-2 p-2  items-center first:border-b border-dark-white/10">
          <div className="rounded-full bg-gray-700  w-8 h-8 flex justify-center items-center">
            {game.winner &&
              (game.winner._id === team._id && (
                <Crown className="text-emerald-400" size={18} />
              ))}
          </div>
          <p className="text-sm text-center text-dark-white/89 line-clamp-1">
            {team.name}
          </p>
        </div>))}
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
