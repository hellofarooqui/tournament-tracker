import { useState } from "react";
import { createPortal } from "react-dom";
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
    e.stopPropagation();
    onClose();
  };

  const handleUpdateWinner = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updated = await updateWinner(game._id, winner);
      if (updated) {
        toast.success("Winner updated successfully!");
        setLoading(false);
        onClose();
      }
    } catch (error) {
      setLoading(false);
      setError(error);
      toast.error("Error updating winner");
      console.error("Error updating winner:", error);
    }
  };

  const modalContent = (
    <div 
      className="fixed top-0 left-0 inset-0 z-50 bg-dark-gray/50 backdrop-blur-lg p-6"
      onClick={handleCancel}
    >
      <div 
        className="min-h-full bg-dark-black p-4 rounded-lg border-2 border-dark-white/10 shadow-lg flex flex-col gap-y-4 "
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-dark-white text-2xl font-bold">Update Winner!</h2>
        <form onSubmit={handleUpdateWinner} className="w-full flex flex-col gap-y-4">
          <label className="block text-white/70">
            Select Winner 
            </label>
            <select
            onChange={handleWinnerChange}
            className="w-full text-base mb-2 p-2 rounded-md bg-dark-blue/10 border-2 border-dark-white/10 text-dark-white/70 focus:outline-none"
          >
            <option className="bg-dark-blue/10">Select Winner</option>
            {game.teams.map((team) => (
              <option key={team._id} value={team._id}>
                {team.name}
              </option>
            ))}
          </select>
          
          <button
            type="submit"
            className=" bg-dark-blue text-white rounded-md p-1 text-sm font-semibold"
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin"/> : "Save"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="text-white bg-dark-gray rounded-md p-1 text-sm font-semibold"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default WinnerUpdateModal;