import { readableDate } from "../utils/readableDate"

const GamesList = ({games}) => {
  return (
    <div className="flex flex-col gap-y-4 mt-4">
        {games.map((game) => (
          <div key={game._id} className="bg-purple-02 p-4 rounded-md flex flex-col gap-y-1">
            <h3 className="text-sm font-semibold">{game.name}</h3>
            <p className="text-sm text-gray-200/70">Date: {readableDate(game.scheduledDate)}</p>
            
          </div>
        ))}
    </div>
  )
}
export default GamesList