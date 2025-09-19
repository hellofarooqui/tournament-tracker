import React from 'react'
import CarromLogo from "./../../assets/icons/carrom.jpg";
import Billard from "./../../assets/icons/billiard-ball.png"
import Chess from "./../../assets/icons/chess.png"
import Cricket from "./../../assets/icons/cricket.png"
import Soccer from "./../../assets/icons/soccer.png"

const Categories = () => {
    return (
        <div className="w-full flex flex-col gap-y-2 my-2">
            {/* <div className="w-full flex justify-between text-sm">
                <p className="text-light-text-dull-01 font-semibold ">Categories</p>
                <button className="text-light-main-blue/70">See all</button>
            </div> */}
            <div className="flex gap-x-4 items-center overflow-x-scroll scroll-smooth scrollbar-none">
                <div className="flex-1 flex flex-col items-center gap-y-2 text-xs text-light-text-dull-01">
                    <div className="w-12 h-12 object-contain rounded-full overflow-hidden border-2 border-dark-white/50">
                        <img src={CarromLogo} className="  object-contain" />
                    </div>
                    <p className="text-dark-white/60">Carrom</p>
                </div>
                <div className="flex-1 flex flex-col items-center gap-y-2 text-xs text-light-text-dull-01">
                    <div className="w-12 h-12 object-contain rounded-full overflow-hidden border-2 border-dark-white/50">
                        <img src={Billard} className="  object-contain" />
                    </div>
                    <p className="text-dark-white/60">Billiards</p>
                </div>
                <div className="flex-1 flex flex-col items-center gap-y-2 text-xs text-light-text-dull-01">
                    <div className="w-12 h-12 object-contain rounded-full overflow-hidden border-2 border-dark-white/50">
                        <img src={Chess} className="  object-contain" />
                    </div>
                    <p className="text-dark-white/60">Chess</p>
                </div>
                <div className="flex-1 flex flex-col items-center gap-y-2 text-xs text-light-text-dull-01">
                    <div className="w-12 h-12 object-contain rounded-full overflow-hidden border-2 border-dark-white/50">
                        <img src={Cricket} className="  object-contain" />
                    </div>
                    <p className="text-dark-white/60">Cricket</p>
                </div>
                <div className="flex-1 flex flex-col items-center gap-y-2 text-xs text-light-text-dull-01">
                    <div className="w-12 h-12 object-contain rounded-full overflow-hidden border-2 border-dark-white/50">
                        <img src={Soccer} className="  object-contain" />
                    </div>
                    <p className="text-dark-white/60">Soccer</p>
                </div>
                <div className="flex-1 flex flex-col items-center gap-y-2 text-xs text-light-text-dull-01">
                    <div className="w-12 h-12 object-contain rounded-full overflow-hidden border-2 border-dark-white/50">
                        <img src={Billard} className="  object-contain" />
                    </div>
                    <p className="text-dark-white/60">Billiards</p>
                </div>
                <div className="flex-1 flex flex-col items-center gap-y-2 text-xs text-light-text-dull-01">
                    <div className="w-12 h-12 object-contain rounded-full overflow-hidden border-2 border-dark-white/50">
                        <img src={Chess} className="  object-contain" />
                    </div>
                    <p className="text-dark-white/60">Chess</p>
                </div>
                <div className="flex-1 flex flex-col items-center gap-y-2 text-xs text-light-text-dull-01">
                    <div className="w-12 h-12 object-contain rounded-full overflow-hidden border-2 border-dark-white/50">
                        <img src={Cricket} className="  object-contain" />
                    </div>
                    <p className="text-dark-white/60">Cricket</p>
                </div>

            </div>
        </div>
    )
}

export default Categories