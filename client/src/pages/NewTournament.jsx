import { useState } from "react";
import useTournamnet from "../hooks/useTournamnet";
import { Loader2, LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useSettings from "../hooks/useSettings";

const defaultTournament = {
  name: "",
  description: "",
  startDate: "",
  endDate: "",
  type: "",
  format: "",
};

const NewTournament = () => {
  const [tournamentFormats, setTournamentFormats] = useState([]);
  const [tournament, setTournament] = useState(defaultTournament);
  const [loading, setLoading] = useState(false);
  const { createTournament } = useTournamnet();
  const {getTournamentFormats} = useSettings();

  const navigate = useNavigate();

  const fetchTournamentFormats = async () => {
    try {
      console.log("Fetching tournament formats");
      const formats = await getTournamentFormats();
      if (formats) {
        console.log("Fetched tournament formats:", formats);
        setTournamentFormats(formats);
        setLoading(false);
      }

    }
    catch (error) {
      console.error("Error fetching tournament formats:", error);
    }
    finally {

    }
  }

  const handleReset = () => {
    setTournament(defaultTournament);
    navigate(-1); // Navigate back to the previous page
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const created = await createTournament(tournament);
      if (created) {
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

  useEffect(() => {
    fetchTournamentFormats();
  }, [])

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center py-16 font-dynapuff">
        <Loader2 className="animate-spin text-yellow-01" />
      </div>
    )
  }


  return (
    <div className="w-full h-screen flex items-center justify-center py-16 font-dynapuff">
      <div className="flex flex-col gap-y-4 text-xl font-semibold text-yellow-01">
        <h2 className="text-3xl text-white text-center mb-6">New <br></br> Tournament</h2>
        <div>
          <form
            onSubmit={handleSubmit}
            onReset={handleReset}
            className="flex flex-col gap-y-4 items-center justify-center text-[16px]"
          >
            <div className="flex flex-col gap-x-2 items-start w-full">
              <label className="text-amber-300">Name</label>
              <input
                placeholder="Give a name"
                className="p-2 px-4 bg-slate-200/20 backdrop-blur-2xl  text-white border-2 border-slate-200/20 rounded-[10px] focus:outline-none focus:border-slate-200/40"
                onChange={(e) =>
                  setTournament({ ...tournament, name: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-x-2 items-start w-full">
              <label className="text-amber-300">Type</label>
              <select

                className="p-2 px-4 bg-slate-200/20 backdrop-blur-2xl  text-white border-2 border-slate-200/20 rounded-[10px] focus:outline-none focus:border-slate-200/40"
                onChange={(e) =>
                  setTournament({ ...tournament, type: e.target.value })
                }
              >
                <option>Select Type</option>
                <option value="Single">Single</option>
                <option value="Team">Team</option>
              </select>
            </div>
            <div className="flex flex-col gap-x-2 items-start w-full">
              <label className="text-amber-300">Format</label>
              <select

                className="p-2 px-4 bg-slate-200/20 backdrop-blur-2xl  text-white border-2 border-slate-200/20 rounded-[10px] focus:outline-none focus:border-slate-200/40"
                onChange={(e) =>
                  setTournament({ ...tournament, format: e.target.value })
                }
              >
                <option>Select Format</option>
                {tournamentFormats.map((format,index) => (
                  <option key={format._id} value={format._id}>{format.name}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-x-2 items-start w-full">
              <label className="text-amber-300">Start</label>
              <input
                type="date"

                className="w-full p-2 px-4 bg-slate-200/20 backdrop-blur-2xl  text-white border-2 border-slate-200/20 rounded-[10px] focus:outline-none focus:border-slate-200/40"
                onChange={(e) =>
                  setTournament({ ...tournament, startDate: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col gap-x-2 items-start w-full">
              <label className="text-amber-300">End</label>
              <input
                type="date"

                className="w-full  p-2 px-4 bg-slate-200/20 backdrop-blur-2xl  text-white border-2 border-slate-200/20 rounded-[10px] focus:outline-none focus:border-slate-200/40"
                onChange={(e) =>
                  setTournament({ ...tournament, endDate: e.target.value })
                }
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#FFA9CC] via-[#FEB2A4] to-[#FFC36B] text-slate-700 p-2 mt-6 py-3 rounded-[20px]"
            >
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </button>

            <button
              type="reset"
              className="w-full border-slate-200/30 border-2 text-slate-200 p-2 rounded-[20px]"
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
