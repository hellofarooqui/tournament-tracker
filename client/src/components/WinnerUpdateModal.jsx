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
      className="fixed inset-0 z-50 bg-slate-200/20 backdrop-blur-lg flex items-center justify-center"
      onClick={handleCancel}
    >
      <div 
        className="bg-slate-200/20 p-8 rounded-[20px] border-2 border-slate-200/30 shadow-lg flex flex-col items-center justify-center gap-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleUpdateWinner} className="flex flex-col gap-y-4">
          <select
            onChange={handleWinnerChange}
            className="w-48 text-lg mb-2 p-2 rounded-md bg-slate-200/40 text-slate-700 focus:outline-none"
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
            className=" bg-gradient-to-r from-[#FFA9CC] via-[#FEB2A4] to-[#FFC36B] text-white rounded-md p-1"
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin"/> : "Save"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="text-white border-2 border-[#FFA9CC] rounded-md p-1"
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