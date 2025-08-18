import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import TeamData from './TeamData'

const TournamentTeamCard = ({team}) => {
  const navigate = useNavigate()
  const [showTeamData,setShowTeamData] = useState(false)
  return (
    <div
      onClick={() => setShowTeamData(true)}
      className="p-4 bg-dark-brown-04 rounded-lg shadow-lg text-light-brown-03 font-dynapuff cursor-pointer"
    >
      <div className="flex gap-x-2">
        <div className="w-20 h-20 rounded-md bg-dark-brown-02"></div>
        <div className='flex flex-col gap-y-2 justify-between'>
          <h2>{team.name}</h2>
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
