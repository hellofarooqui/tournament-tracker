import { readableDate } from "../utils/readableDate";

const GameListCard = ({ game }) => {
  return (
    <div
     
      className="bg-purple-02 rounded-md overflow-hidden flex flex-col gap-y-1"
    >
      {/* <h3 className="text-sm font-semibold">{game.teams[0].name} vs {game.teams[1].name}</h3> */}
      <div className="p-4 grid grid-cols-[40%_auto_40%] w-full items-center">
        <div className="flex flex-col gap-y-2 justify-center items-center">
            <div className="rounded-md bg-emerald-300/30 w-16 h-16">

            </div>
            <p className="text-xs text-center">{game.teams[0].name}</p>
        </div>

        <h2 className="text-center">VS</h2>

        <div className="flex flex-col gap-y-2  justify-center items-center">
            <div className="rounded-md bg-emerald-300/30 w-16 h-16">

            </div>
            <p className="text-xs text-center">{game.teams[1].name}</p>
        </div>

      </div>
      <p className="text-sm text-center p-1 bg-slate-200/30 text-gray-200/70">
        Date: {readableDate(game.scheduledDate)}
      </p>
    </div>
  );
};
export default GameListCard;
