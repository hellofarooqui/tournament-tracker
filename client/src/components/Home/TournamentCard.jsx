import React from 'react'
import abbrevation from '../../utils/abbrevations'

const players = [
  { id: 0, name: "Mubasshir Farooqui" },
  { id: 1, name: "Arsalan Khan" },
  { id: 2, name: "Zafar Ali" },
  { id: 3, name: "Sanaullah Qureshi" },
  { id: 4, name: "Mustafa Said" }
]

const TournamentCard = ({ title, image }) => {
  return (
    <div className="p-1 bg-dark-gray rounded-[20px]">
      <img className="w-full h-30 object-cover rounded-[16px]" src={image} />
      <div className="flex flex-col px-4 py-2">
        <p className="font-semibold text-dark-white">{title}</p>
        <p className="text-xs text-dark-white/50">Jun 27 - Jun 29</p>
        <div className="w-full flex items-center justify-between">
          <div className='flex gap-x-1'>
            
            <p className="text-xs text-light-text-dull-02">{players.length} Participants</p>
          </div>
          <button className="bg-dark-blue/20 px-6 py-1 text-sm text-dark-blue rounded-[5px]">Join</button>
        </div>
      </div>
    </div>
  )
}

export default TournamentCard