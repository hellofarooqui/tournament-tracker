import { useState } from "react";
import useGame from "../hooks/useGame";
import toast from "react-hot-toast";

const WinnerUpdateModal = ({ game ,onClose}) => {
  const [winner, setWinner] = useState(null);
  const {updateWinner} = useGame();

  const handleWinnerChange = (e) => {
    setWinner(e.target.value);
  };

  const handleUpdateWinner = async (e) => {
    e.preventDefault();
    try{
        const updated = await updateWinner(game._id, winner);
        if(updated){
            // Handle successful update (e.g., close modal, show success message)
            toast.success("Winner updated successfully!");
            onClose()
        }
    }catch(error){
        toast.error("Error updating winner");
        console.error("Error updating winner:", error);
    }
  };
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black/80 flex items-center justify-center">
      <div className="bg-purple-02 p-6 rounded-lg">
        <form onSubmit={handleUpdateWinner} className="flex flex-col gap-y-4">
          <select onChange={handleWinnerChange}  className="text-lg mb-2 p-2 rounded-md bg-purple-01">
            <option>Select Winner</option>
          {game.teams.map((team) => (
            <option key={team._id} value={team._id}>
              {team.name}
            </option>
          ))}
          </select>
          <button type="submit" className="bg-yellow-01 text-purple-01 rounded-md p-1">Save</button>
        </form>
      </div>
    </div>
  );
};
export default WinnerUpdateModal;
