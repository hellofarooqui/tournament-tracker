import { useState } from "react";
import useTournamnet from "../hooks/useTournamnet";
import { Loader2, LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useSettings from "../hooks/useSettings";
import { useContext } from "react";
import { NavbarContext } from "../context/NavbarContext";
import {TOURNAMENT_FORMATS} from "../constants/carromConstants";

const defaultTournament = {
  name: "",
  description: "",
  startDate: "",
  endDate: "",
  type: "",
  format: "",
};

const NewTournament = () => {
  const [tournamentFormats, setTournamentFormats] = useState(TOURNAMENT_FORMATS);
  const [tournament, setTournament] = useState(defaultTournament);
  const [loading, setLoading] = useState(false);
  const { createTournament } = useTournamnet();
  const { getTournamentFormats } = useSettings();

    const { navbar, setNavbar } = useContext(NavbarContext);

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
    } catch (error) {
      console.error("Error fetching tournament formats:", error);
    } finally {
    }
  };

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
        navigate(-1);
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
  }, []);

    //setting navbar
    useEffect(() => {
      setNavbar({
        ...navbar,
        pageTitle: "New Tournament",
        bg_transparent: true,
        showProfileIcon: false,
      });
      return () => {
        setNavbar({ ...navbar, pageTitle: "", bg_color: "" });
      };
    }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center py-16 font-dynapuff">
        <Loader2 className="animate-spin text-yellow-01" />
      </div>
    );
  }

  return (
    <div className=" w-full h-full p-6">
      <div className="flex flex-col gap-y-4 text-xl font-semibold text-yellow-01">
        <div>
          <form
            onSubmit={handleSubmit}
            onReset={handleReset}
            className="flex flex-col gap-y-4"
          >
            <div className="flex flex-col gap-x-2 items-start w-full">
              <label className="flex flex-col gap-y-2 text-dark-white/60 text-sm">
                Name
              </label>
              <input
                placeholder="Give a name"
                className="text-base mb-2 p-2 rounded-md border-2  border-dark-white/10 text-dark-white focus:outline-none focus:border-dark-white/30 "
                onChange={(e) =>
                  setTournament({ ...tournament, name: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-x-2 items-start w-full">
              <label className="flex flex-col gap-y-2 text-dark-white/60 text-sm">
                Type
              </label>
              <select
                className="text-base mb-2 p-2 rounded-md border-2  border-dark-white/10 text-dark-white focus:outline-none focus:border-dark-white/30 "
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
              <label className="flex flex-col gap-y-2 text-dark-white/60 text-sm">
                Format
              </label>
              <select
                className="text-base mb-2 p-2 rounded-md border-2  border-dark-white/10 text-dark-white focus:outline-none focus:border-dark-white/30 "
                onChange={(e) =>
                  setTournament({ ...tournament, format: e.target.value })
                }
              >
                <option>Select Format</option>
                {tournamentFormats.map((format, index) => (
                  <option key={index} value={format}>
                    {format}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-x-2 items-start w-full">
              <label className="flex flex-col gap-y-2 text-dark-white/60 text-sm">
                Start
              </label>
              <input
                type="date"
                className="text-base mb-2 p-2 rounded-md border-2  border-dark-white/10 text-dark-white focus:outline-none focus:border-dark-white/30 "
                onChange={(e) =>
                  setTournament({ ...tournament, startDate: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col gap-x-2 items-start w-full">
              <label className="flex flex-col gap-y-2 text-dark-white/60 text-sm">
                End
              </label>
              <input
                type="date"
                className="text-base mb-2 p-2 rounded-md border-2  border-dark-white/10 text-dark-white focus:outline-none focus:border-dark-white/30 "
                onChange={(e) =>
                  setTournament({ ...tournament, endDate: e.target.value })
                }
              />
            </div>

            <button
              type="submit"
              className="bg-dark-blue text-white px-4 py-2 rounded-md text-sm"
            >
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </button>

            <button
              type="reset"
              className="bg-dark-gray text-dark-white/60 px-4 py-2 rounded-md text-sm"
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
