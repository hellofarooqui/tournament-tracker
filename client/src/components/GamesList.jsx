import { readableDate } from "../utils/readableDate"
import GameListCard from "./GameListCard"

const GamesList = ({games}) => {
  return (
    <div className="flex flex-col mt-2 pb-20">
        {games.map((game) => (
          <div className="py-2" key={game._id}>
          <GameListCard  key={game._id} game={game} />
          </div>
        ))}
    </div>
  )
}
export default GamesList