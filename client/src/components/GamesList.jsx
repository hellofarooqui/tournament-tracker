import { readableDate } from "../utils/readableDate";
import GameListCard from "./GameListCard";

const GamesList = ({ games }) => {
  return (
    <div className="flex flex-col gap-y-4 pb-20">
      {games.map((game,index) => (
        
          <GameListCard key={game._id} game={game} matchNumber={index+1} />
       
      ))}
    </div>
  );
};
export default GamesList;
