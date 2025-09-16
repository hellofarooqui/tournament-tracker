import React from 'react'

const TournamentCard = ({title, image}) => {
    return (
        <div className="p-1 bg-white rounded-[20px]">
            <img className="w-full h-36 object-cover rounded-[20px]" src={image} />
            <div className="flex flex-col gap-y-1 px-4 py-2">
                <p className="font-semibold text-light-text-dull-01">{title}</p>
                <p className="text-sm text-light-text-dull-02">Jun 27 - Jun 29</p>
                <div className="w-full flex items-center justify-between">
                    <p className="text-[12px] text-light-text-dull-02">Participants</p>
                    <button className="bg-light-text-dull-02/30 px-6 py-1 rounded-[10px]">Join</button>
                </div>
            </div>
        </div>
    )
}

export default TournamentCard