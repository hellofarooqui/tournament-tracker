import {  useState } from "react";
import useTournamnet from "../hooks/useTournamnet";
import { LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const defaultTournament = {
  name: "",
  description: "",
  startDate: "",
  endDate: "",
};

const NewTournament = () => {
  const [tournament, setTournament] = useState(defaultTournament);
  const [loading, setLoading] = useState(false);
  const { createTournament } = useTournamnet();
  const navigate = useNavigate();

  const handleReset = () => {
    setTournament(defaultTournament);
    navigate(-1); // Navigate back to the previous page
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const created = await createTournament(tournament);
      if(created) {
        console.log("Tournament created successfully:", created);
        navigate(-1)
      }
     
    } catch (error) {
      console.error("Error creating tournament:", error);
    } finally {
      setTournament(defaultTournament);
      setLoading(false);
    }
  };
  return (
    <div className="w-full h-screen flex items-center justify-center py-16 font-dynapuff text-yellow-01">
      <div className="flex flex-col gap-y-4 text-xl font-semibold text-yellow-01">
        <h2>New Tournament</h2>
        <div>
          <form
            onSubmit={handleSubmit}
            onReset={handleReset}
            className="flex flex-col gap-y-4"
          >
            <div className="flex gap-x-2 items-center w-full">
              <input
                placeholder="Give a name"
                className="p-2 border-3 border-yellow-300/40 rounded-[10px] focus:outline-none focus:border-yellow-300/70"
                onChange={(e) =>
                  setTournament({ ...tournament, name: e.target.value })
                }
              />
            </div>

            <div className="flex gap-x-2 items-center w-full">
              <label>Start</label>
              <input
                type="date"
                placeholder="Give a name"
                className="w-full p-2 border-3 border-yellow-300/40 rounded-[10px] focus:outline-none focus:border-yellow-300/70"
                onChange={(e) =>
                  setTournament({ ...tournament, startDate: e.target.value })
                }
              />
            </div>

            <div className="flex gap-x-2 items-center w-full">
              <label>End</label>
              <input
                type="date"
                placeholder="Give a name"
                className="w-full p-2 border-3 border-yellow-300/40 rounded-[10px] focus:outline-none focus:border-yellow-300/70"
                onChange={(e) =>
                  setTournament({ ...tournament, endDate: e.target.value })
                }
              />
            </div>

            <button
              type="submit"
              className="bg-yellow-01 text-purple-01 p-2 rounded-[10px]"
            >
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </button>

            <button
              type="reset"
              className="border-yellow-01 border-2 text-yellow-01 p-2 rounded-[10px]"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default NewTournament;
