import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import TeamData from './TeamData'
import abbrevation from '../utils/abbrevations'

const TournamentTeamCard = ({team}) => {
  const navigate = useNavigate()
  const [showTeamData,setShowTeamData] = useState(false)
  console.log("Tournament Team Card team",team)
  return (
    <div
      onClick={() => setShowTeamData(true)}
      className=" bg-white rounded-[15px]  shadow-md text-slate-200 cursor-pointer overflow-hidden"
    >
      <div className="flex gap-x-4">
        <div className=" bg-gradient-to-br from-stone-800 to-stone-700 flex justify-center items-center p-4">
          <div className='w-12 h-12 rounded-full bg-white  text-stone-500 flex justify-center items-center'>
            {abbrevation(team.name)}
          </div>
        </div>
        <div className='flex flex-col gap-y-2 p-2'>
          <h2 className='text-stone-500'>{team.name}</h2>
          <div>
            {team.members.map((member, index) => (
              <p key={index} className="text-sm text-stone-500">
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
