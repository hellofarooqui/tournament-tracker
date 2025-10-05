import React, { useContext } from "react";
import { readableDate } from "../utils/readableDate";
import WinnerUpdateModal from "./WinnerUpdateModal";
import { CircleCheck, Crown, Frown } from "lucide-react";
import CrownIcon from "./../assets/crown.png";
import EggIcon from "./../assets/egg.png";
import { AuthContext } from "../context/AuthContext";

const GameListCard = ({ game, matchNumber }) => {
  const [showWinnerUpdateModal, setShowWinnerUpdateModal] =
    React.useState(false);

    const {user} = useContext(AuthContext);
    //console.log("User in GameListCard:", user);
  return (
    <div
      onClick={() => user.role == 'root-admin' ? setShowWinnerUpdateModal(true) : null}
      className="bg-dark-blue/8 flex flex-col gap-y-2  hover:scale-105 transition-transform ease-in-out duration-200 p-4 relative"
    >
      <div className="flex justify-between text-sm text-white">
        <p className=" text-dark-white/30 text-xs">
          {game.name ? game.name : `Game ${matchNumber}`} - {readableDate(game.scheduledDate)}
        </p>
        {game.winner ? (
          <p className="text-dark-green text-sm">Finished</p>
        ) : (
          <p className="text-orange-300/70 text-sm">Upcoming</p>
        )}
      </div>
      <div className="flex flex-col  w-full items-start">
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
