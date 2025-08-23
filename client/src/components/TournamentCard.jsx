import { ShieldCheck } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router';
import CarromIcon from '../assets/carrom.png';
import { readableDate } from '../utils/readableDate';

const TournamentCard = ({tournament}) => {
    const navigate = useNavigate()

    const handleTournamentClick = ()=>{
        navigate(`/tournament/${tournament._id}`)
    }
  return (
    <div onClick={handleTournamentClick} className="w-full group text-white bg-slate-200/20 backdrop-blur-2xl border-2 border-slate-200/30 p-4 rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-transform ease-in-out duration-200">
      <div className="flex justify-between items-center">
        <div className='flex gap-x-4 '>
          <img src={CarromIcon} alt="Carrom" className="w-12 h-12" />
          <div className='flex flex-col justify-between'>
          <h2 className='text-lg opacity-90 text-white group-hover:text-dark-bg-dark-brown-04'>{tournament.name}</h2>
          <p className='text-xs font-thin text-slate-200/60'>{readableDate(tournament.startDate)} {" - "} {readableDate(tournament.endDate)}</p>
          </div>
        </div>

        <div>
         {tournament.status == "completed" && <ShieldCheck className='text-green-500'/>}
        </div>
      </div>
    </div>
  );
}

export default TournamentCard
