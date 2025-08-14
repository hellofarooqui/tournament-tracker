import { useEffect, useState } from "react";
import useTournamnet from "../hooks/useTournamnet";
import TournamentCard from "./TournamentCard";

const ViewAllTournaments = () => {
  const [allTournaments, setAllTournaments] = useState([]);
  const { getAllTournaments } = useTournamnet();

  const fetchTournaments = async () => {
    const tournaments = await getAllTournaments();
    setAllTournaments(tournaments);
  };

  useEffect(() => {
    fetchTournaments();
  }, []);

  return (
    <div className="w-full h-screen flex py-16 font-dynapuff">
      <div className="w-full flex flex-col gap-y-4 text-xl font-semibold text-yellow-01 p-4">
        <h2>All Tournaments</h2>
        {allTournaments.length >0 && <div className="flex flex-col gap-y-4 w-full">
          {allTournaments.map(tournament => <TournamentCard key={tournament._id} tournament={tournament} />)}</div>}
      </div>
    </div>
  );
};
export default ViewAllTournaments;
