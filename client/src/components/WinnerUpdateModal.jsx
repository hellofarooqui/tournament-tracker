import { useState } from "react";
import useGame from "../hooks/useGame";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const WinnerUpdateModal = ({ game, onClose }) => {
  const [winner, setWinner] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { updateWinner } = useGame();

  const handleWinnerChange = (e) => {
    setWinner(e.target.value);
  };

  const handleCancel = (e) => {
    //e.preventDefault();
    e.stopPropagation();
    onClose();
  };

  const handleUpdateWinner = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updated = await updateWinner(game._id, winner);
      if (updated) {
        // Handle successful update (e.g., close modal, show success message)
        toast.success("Winner updated successfully!");
        setLoading(false);
        onClose();
      }
    } catch (error) {
      setLoading("Error updating winner");
      setError(error);
      toast.error("Error updating winner");
      console.error("Error updating winner:", error);
    }
  };
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black/80 flex items-center justify-center">
      <div className="bg-dark-brown-04 p-8 rounded-lg">
        <form onSubmit={handleUpdateWinner} className="flex flex-col gap-y-4">
          <select
            onChange={handleWinnerChange}
            className="w-48 text-lg mb-2 p-2 rounded-md bg-dark-brown-01"
          >
            <option>Select Winner</option>
            {game.teams.map((team) => (
              <option key={team._id} value={team._id}>
                {team.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="text-dark-brown-01 bg-light-brown-03 rounded-md p-1"
          >
            {loading ? <Loader2 className="animate-spin"/> :"Save"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="text-light-brown-03 border-2 border-light-brown-03 rounded-md p-1"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};
export default WinnerUpdateModal;
