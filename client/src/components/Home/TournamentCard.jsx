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
        <div className="p-1 bg-white rounded-[20px]">
            <img className="w-full h-30 object-cover rounded-[20px]" src={image} />
            <div className="flex flex-col gap-y-1 px-4 py-2">
                <p className="font-semibold text-light-text-dull-01">{title}</p>
                <p className="text-sm text-light-text-dull-02">Jun 27 - Jun 29</p>
                <div className="w-full flex items-center justify-between">
                    <div className='flex gap-x-1'>
  <div className='flex'>
    {players.map((player, index) => (
      <span 
        key={player.id || index}
        className={`text-[6px] p-1 bg-blue-300 border border-white rounded-full ${
          index > 0 ? '-ml-2' : ''
        }`}
      >
        {abbrevation(player.name)}
      </span>
    ))}
  </div>
  <p className="text-[12px] text-light-text-dull-02">+ Participants</p>
</div>
                    <button className="bg-light-text-dull-02/30 px-6 py-1 text-sm rounded-[5px]">Join</button>
                </div>
            </div>
        </div>
    )
}

export default TournamentCard