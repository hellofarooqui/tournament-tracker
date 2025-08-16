import { ShieldCheck } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router';

const TournamentCard = ({tournament}) => {
    const navigate = useNavigate()

    const handleTournamentClick = ()=>{
        navigate(`/tournament/${tournament._id}`)
    }
  return (
    <div onClick={handleTournamentClick} className="w-full group font-dynapuff text-yellow-01 bg-purple-02 p-4 rounded-lg shadow-lg cursor-pointer hover:bg-yellow-01 hover:text-purple-02 transition-colors ease-in-out duration-200">
      <div className="flex justify-between items-center">
        <h2 className='text-lg opacity-90 text-emerald-400 group-hover:text-purple-02'>{tournament.name}</h2>

        <div>
          <ShieldCheck className='text-green-500'/>
        </div>
      </div>
    </div>
  );
}

export default TournamentCard
