import React from 'react'

const TournamentTeamCard = ({team}) => {
  return (
    <div className='p-4 bg-purple-02 rounded-lg shadow-lg text-yellow-01 font-dynapuff'>
      <h2>{team.name}</h2>
    </div>
  )
}

export default TournamentTeamCard
