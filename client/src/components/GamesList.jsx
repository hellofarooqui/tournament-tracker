import { readableDate } from "../utils/readableDate"
import GameListCard from "./GameListCard"

const GamesList = ({games}) => {
  return (
    <div className="flex flex-col gap-y-6 mt-4 pb-20">
        {games.map((game) => (
          <GameListCard  key={game._id} game={game} />
        ))}
    </div>
  )
}
export default GamesList