import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import useTournamnet from "../hooks/useTournamnet";
import {
  TOURNAMENT_FORMATS,
  TOURNAMENT_STATUS,
  TOURNAMENT_TYPES,
} from "../constants/carromConstants";
import { useContext } from "react";
import { NavbarContext } from "../context/NavbarContext";

const UpdateTournamentDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tournament, setTournament] = useState(null);

  const { navbar, setNavbar } = useContext(NavbarContext);

  const { getTournamentDataForUpdate,updateTournamentDetails } = useTournamnet();

  const fetchTournamentDetails = async () => {
    setLoading(true);
    try {
      const data = await getTournamentDataForUpdate(id);
      setTournament(data);
      console.log("Tournament details:", data);
      setError(null);
    } catch (error) {
      console.error("Error fetching tournament details:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (e) => {
    e.preventDefault();
    navigate
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await updateTournamentDetails(id,tournament);
      if(response){
        alert("Tournament updated successfully");
      }
      else return alert("Failed to update tournament");
    }
    catch(error){
      console.error("Error updating tournament:", error);
      alert("Error updating tournament");
    }
  };

  //setting navbar
  useEffect(() => {
    setNavbar({
      ...navbar,
      pageTitle: "Update Tournament",
      bg_transparent: true,
      showProfileIcon: false,
    });
    return () => {
      setNavbar({ ...navbar, pageTitle: "", bg_color: "" });
    };
  }, []);

  useEffect(() => {
    fetchTournamentDetails();
  }, []);

  console.log("Params in UpdateTournamentDetails:", id);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!tournament) return <div>No tournament data available.</div>;

  return (
    <div className=" w-full h-full p-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
        
        <label
          htmlFor="name"
          className="flex flex-col gap-y-2 text-dark-white/60 text-sm"
        >
          Tournament Name
          <input
            className="text-base mb-2 p-2 rounded-md border-2  border-dark-white/10 text-dark-white focus:outline-none focus:border-dark-white/30 "
            name="name"
            type="text"
            placeholder="Tournament Name"
            value={tournament.name}
            onChange={(e) => setTournament({ ...tournament, name: e.target.value })}
          />
        </label>


        <label
          htmlFor="name"
          className="flex flex-col gap-y-2 text-dark-white/60 text-sm"
        >
          Type
          <select
            value={tournament.type}
            className="text-base mb-2 p-2 rounded-md border-2  border-dark-white/10 text-dark-white focus:outline-none focus:border-dark-white/30 "
            onChange={(e) =>setTournament({ ...tournament, type: e.target.value })}
          >
            <option value="">Select Type</option>
            {TOURNAMENT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>


        <label
          htmlFor="name"
          className="flex flex-col gap-y-2 text-dark-white/60 text-sm"
        >
          Format
          <select
            value={tournament.format}
            className="text-base mb-2 p-2 rounded-md border-2  border-dark-white/10 text-dark-white focus:outline-none focus:border-dark-white/30 "
            onChange={(e) =>setTournament({ ...tournament, format: e.target.value })}
          >
            <option value="">Select Format</option>
            {TOURNAMENT_FORMATS.map((format) => (
              <option key={format} value={format}>
                {format}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-y-2 text-dark-white/60 text-sm">
          Start Date
          <input
            type="date"
            className="text-base mb-2 p-2 rounded-md border-2  border-dark-white/10 text-dark-white focus:outline-none focus:border-dark-white/30 "
            value={tournament.startDate?.split("T")[0]}
            onChange={(e) =>
              setTournament({ ...tournament, startDate: e.target.value })
            }
          />
        </label>
        <label className="flex flex-col gap-y-2 text-dark-white/60 text-sm">
          End Date
          <input
            type="date"
            className="text-base mb-2 p-2 rounded-md border-2  border-dark-white/10 text-dark-white focus:outline-none focus:border-dark-white/30 "
            value={tournament.endDate?.split("T")[0]}
            onChange={(e) =>
              setTournament({ ...tournament, endDate: e.target.value })
            }
          />
        </label>


        {tournament.type !== 'Singles' && <label
          htmlFor="name"
          className="flex flex-col gap-y-2 text-dark-white/60 text-sm"
        >
          Winner
          <select
            value={tournament.winner}
            className="text-base mb-2 p-2 rounded-md border-2  border-dark-white/10 text-dark-white focus:outline-none focus:border-dark-white/30 "
            onChange={(e) =>setTournament({ ...tournament, winner: e.target.value })}
          >
            <option value="">Select Winner</option>
            {tournament.teams.map((team) => (
              <option key={team._id} value={team._id}>
                {team.team.name}
              </option>
            ))}
          </select>
        </label>}

        <label
          htmlFor="name"
          className="flex flex-col gap-y-2 text-dark-white/60 text-sm"
        >
          Status
          <select
            value={tournament.status}
            className="text-base mb-2 p-2 rounded-md border-2  border-dark-white/10 text-dark-white focus:outline-none focus:border-dark-white/30 "
            onChange={(e) =>setTournament({ ...tournament, status: e.target.value })}
          >
            <option value="">Select Status</option>
            {TOURNAMENT_STATUS.map((status,index) => (
              <option key={index} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          className="bg-dark-blue text-white px-4 py-2 rounded-md"
        >
          Update
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="bg-dark-gray text-dark-white/60 px-4 py-2 rounded-md"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateTournamentDetails;
