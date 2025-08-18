import { useEffect, useState } from "react";
import useTournamnet from "../hooks/useTournamnet";
import TournamentCard from "./TournamentCard";
import { useNavigate } from "react-router";

const ViewAllTournaments = () => {
  const [allTournaments, setAllTournaments] = useState([]);
  const { getAllTournaments } = useTournamnet();
  const navigate = useNavigate();

  const fetchTournaments = async () => {
    const tournaments = await getAllTournaments();
    setAllTournaments(tournaments);
  };

  useEffect(() => {
    fetchTournaments();
  }, []);

  return (
    <div className="w-full h-screen flex py-16 font-dynapuff">
      <div className="w-full flex flex-col gap-y-4 text-xl font-semibold text-light-brown-03 p-4">
        <div className="flex justify-between items-center">
          <h2 className="">All Tournaments</h2>
          <div className="flex gap-x-2">
            <button className="bg-dark-brown-04 hover:bg-light-brtext-light-brown-03 hover:text-purple-02 px-4 py-2 rounded-md text-sm">
              Sort
            </button>
            <button
              onClick={() => navigate("/new-tournament")}
              className="bg-dark-brown-04 hover:bg-light-brtext-light-brown-03 hover:text-purple-02 px-4 py-2 rounded-md text-sm"
            >
              Create New
            </button>
          </div>
        </div>

        {allTournaments.length > 0 && (
          <div className="flex flex-col gap-y-4 w-full">
            {allTournaments.map((tournament) => (
              <TournamentCard key={tournament._id} tournament={tournament} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default ViewAllTournaments;
