import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import TeamData from './TeamData'

const TournamentTeamCard = ({team}) => {
  const navigate = useNavigate()
  const [showTeamData,setShowTeamData] = useState(false)
  return (
    <div
      onClick={() => setShowTeamData(true)}
      className="p-4 bg-slate-200/20 backdrop-blur-2xl rounded-[20px] border-2 border-slate-200/20 text-slate-200 cursor-pointer"
    >
      <div className="flex gap-x-4">
        <div className="w-20 h-20 rounded-[20px] bg-slate-200/40"></div>
        <div className='flex flex-col gap-y-2 justify-between'>
          <h2 className='text-white'>{team.name}</h2>
          <div>
            {team.members.map((member, index) => (
              <p key={index} className="text-sm text-gray-300">
                {index+1} {". "}{member.name}
              </p>
            ))} 
          </div>
        </div>
      </div>

      {showTeamData && (
        <TeamData teamId={team._id} setShowTeamData={setShowTeamData} />
      )}
    </div>
  );
}

export default TournamentTeamCard
