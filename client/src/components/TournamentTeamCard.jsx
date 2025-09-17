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
        <div className="bg-light-main-blue/40 flex justify-center items-center p-2 px-4">
          <div className='w-8 h-8 rounded-full bg-white  text-stone-500 flex justify-center items-center'>
            <p className='text-base text-light-main-blue/40'>{abbrevation(team.name)}</p>
          </div>
        </div>
        <div className='flex flex-col gap-y-2 p-2'>
          <h2 className='text-light-main-blue/70 text-base'>{team.name}</h2>
          <div>
            {team.members.map((member, index) => (
              <p key={index} className="text-xs font-thin text-stone-500">
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
