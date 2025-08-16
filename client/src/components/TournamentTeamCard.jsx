import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import TeamData from './TeamData'

const TournamentTeamCard = ({team}) => {
  const navigate = useNavigate()
  const [showTeamData,setShowTeamData] = useState(false)
  return (
    <div onClick={()=>setShowTeamData(true)} className='p-4 bg-purple-02 rounded-lg shadow-lg text-yellow-01 font-dynapuff cursor-pointer'>
      <h2>{team.name}</h2>
      {showTeamData && <TeamData teamId={team._id} setShowTeamData={setShowTeamData} />}
    </div>
  )
}

export default TournamentTeamCard
