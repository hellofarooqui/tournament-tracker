import { ShieldCheck } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router';
import CarromIcon from '../assets/carrom.png';
import CarromBanner from '../assets/images/carrom-banner.jpeg'
import { readableDate } from '../utils/readableDate';

const tournamentStatusColor = {
  scheduled: "text-purple-400 bg-purple-200",
  live: "text-emerald-400 bg-emerald-100",
  completed: "text-blue-500 bg-blue-200",
  cancelled: "text-red-500 bg-red-200",
};

const TournamentCard = ({ tournament }) => {
  const navigate = useNavigate()

  const handleTournamentClick = () => {
    navigate(`/tournament/${tournament._id}`)
  }
  return (
    <div onClick={handleTournamentClick} className="w-full group  bg-white rounded-[10px] cursor-pointer hover:scale-105 transition-transform ease-in-out duration-200 overflow-hidden shadow-md">
      <div className="flex justify-between items-center relative ">
        <div className='flex p-[4px]'>
          <img src={CarromBanner} alt="Carrom" className="w-20 hf-full object-cover rounded-[6px]" />
          <div className='flex flex-col items-start gap-2 py-2 pl-2'>
            <h2 className='text-[16px] opacity-90 text-neutral-700 group-hover:text-dark-bg-dark-brown-04'>{tournament.name}</h2>

            <p className='text-xs font-thin text-neutral-400'>{readableDate(tournament.startDate)} {" - "} {readableDate(tournament.endDate)}</p>
            <p className={`text-xs font-thin ${tournamentStatusColor[tournament.status]} px-2 rounded-full`}>{tournament.status}</p>
          </div>
        </div>

        {/* <div>
         {tournament.status == "completed" && <ShieldCheck className='text-green-500'/>}
        </div> */}

      </div>
    </div>
  );
}

export default TournamentCard
