import React from 'react'
import ComitteSelection from './ComitteSelection'

const TemporayPage = () => {
    return (
        <div className="w-screen h-screen fixed flex  py-16">
            <div className="w-full h-full bg-neutral-100 rounded-t-[20px] mx-auto flex flex-col gap-y-2 text-xl font-semibold text-slate-200 px-6 pt-6  overflow-y-scroll">
                <ComitteSelection />
            </div>
        </div>
    )
}

export default TemporayPage