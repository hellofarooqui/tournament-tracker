import React from "react";
import { readableDate } from "../utils/readableDate";
import WinnerUpdateModal from "./WinnerUpdateModal";
import { Crown } from "lucide-react";

const GameListCard = ({ game }) => {
    const [showWinnerUpdateModal, setShowWinnerUpdateModal] = React.useState(false);
  return (
    <div
    onClick={()=>setShowWinnerUpdateModal(true)}
      className="bg-dark-brown-03 rounded-md overflow-hidden flex flex-col gap-y-1"
    >
      {/* <h3 className="text-sm font-semibold">{game.teams[0].name} vs {game.teams[1].name}</h3> */}
      <div className="p-4 grid grid-cols-[40%_auto_40%] w-full items-center">
        <div className="flex flex-col gap-y-2 justify-center items-center">
            <div className="rounded-md bg-light-brown-02 w-16 h-16 flex justify-center items-center">
                {game.winner && game.winner._id === game.teams[0]._id && (<Crown size={28}/>)}
            </div>
            <p className="text-xs text-center font-thin">{game.teams[0].name}</p>
        </div>

        <h2 className="text-center">VS</h2>

        <div className="flex flex-col gap-y-2  justify-center items-center">
            <div className="rounded-md bg-light-brown-02 w-16 h-16 flex justify-center items-center">
                {game.winner && game.winner._id === game.teams[1]._id && (<Crown size={28}/>)}

            </div>
            <p className="text-xs text-center font-thin">{game.teams[1].name}</p>
        </div>

      </div>
      <p className="text-sm text-center font-thin p-1 bg-light-brown-02 text-gray-200/70">
        Date: {readableDate(game.scheduledDate)}
      </p>

      {showWinnerUpdateModal && <WinnerUpdateModal game={game} onClose={() => setShowWinnerUpdateModal(false)} />}
    </div>
  );
};
export default GameListCard;
