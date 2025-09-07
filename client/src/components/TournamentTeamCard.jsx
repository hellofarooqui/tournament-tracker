import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import TeamData from './TeamData'

const TournamentTeamCard = ({team}) => {
  const navigate = useNavigate()
  const [showTeamData,setShowTeamData] = useState(false)
  return (
    <div
      onClick={() => setShowTeamData(true)}
      className="p-4 bg-white backdrop-blur-2xl rounded-[15px] border-2 border-neutral-100 shadow-md text-slate-200 cursor-pointer"
    >
      <div className="flex gap-x-4">
        <div className="w-16 h-16 rounded-full bg-neutral-200"></div>
        <div className='flex flex-col gap-y-2'>
          <h2 className='text-neutral-600'>{team.name}</h2>
          <div>
            {team.members.map((member, index) => (
              <p key={index} className="text-sm text-neutral-500">
                {index+1} {". "}{member.firstName} {member.lastName}
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
