import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import TeamData from './TeamData'
import abbrevation from '../utils/abbrevations'
import { ShieldHalf } from 'lucide-react'
import titleCase from '../utils/titleCase'

const TournamentTeamCard = ({team}) => {
  const navigate = useNavigate()
  const [showTeamData,setShowTeamData] = useState(false)
  //console.log("Tournament Team Card team",team)
  return (
    <div
      onClick={() => setShowTeamData(true)}
      className=" bg-gray-800/40 rounded-lg  shadow-md text-slate-200 cursor-pointer overflow-hidden"
    >
      <div className="flex ">
        <div className="flex justify-center items-center p-2 px-4">
          <div className="w-12 h-12 rounded-full bg-dark-gray/80  text-stone-500 flex justify-center items-center">
            <p className="text-base text-dark-white">
              <ShieldHalf />
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-y-2 p-2">
          <h2 className="text-dark-white/90 text-base">{team.name}</h2>
          <div>
            {team.members.map((member, index) => (
              <p key={index} className="text-xs font-thin text-dark-white/50">
                {index + 1} {". "}
                {titleCase(member.firstName)} {titleCase(member.lastName)}
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
