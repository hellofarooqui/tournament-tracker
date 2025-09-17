import React from 'react'
import CarromLogo from "./../../assets/icons/carrom.png";
import Billard from "./../../assets/icons/billiard-ball.png"
import Chess from "./../../assets/icons/chess.png"
import Cricket from "./../../assets/icons/cricket.png"

const Categories = () => {
    return (
        <div className="w-full flex flex-col gap-y-2">
            <div className="w-full flex justify-between">
                <p className="text-light-text-dull-01 font-semibold">Categories</p>
                <button className="text-light-main-blue/70">See all</button>
            </div>
            <div className="flex gap-x-4 items-center overflow-x-scroll scroll-smooth scrollbar-none">
                <div className="flex-1 flex flex-col items-center gap-y-2">
                    <div className="w-12 h-12 object-contain rounded-[20px] overflow-hidden border-2 border-light-text-dull-02">
                        <img src={CarromLogo} className="  object-contain" />
                    </div>
                    <p>Carrom</p>
                </div>
                <div className="flex-1 flex flex-col items-center gap-y-2">
                    <div className="w-12 h-12 object-contain rounded-[20px] overflow-hidden border-2 border-light-text-dull-02">
                        <img src={Billard} className="  object-contain" />
                    </div>
                    <p>Billiards</p>
                </div>
                <div className="flex-1 flex flex-col items-center gap-y-2">
                    <div className="w-12 h-12 object-contain rounded-[20px] overflow-hidden border-2 border-light-text-dull-02">
                        <img src={Chess} className="  object-contain" />
                    </div>
                    <p>Chess</p>
                </div>
                <div className="flex-1 flex flex-col items-center gap-y-2">
                    <div className="w-12 h-12 object-contain rounded-[20px] overflow-hidden border-2 border-light-text-dull-02">
                        <img src={Cricket} className="  object-contain" />
                    </div>
                    <p>Cricket</p>
                </div>
                <div className="flex-1 flex flex-col items-center gap-y-2">
                    <div className="w-12 h-12 object-contain rounded-[20px] overflow-hidden border-2 border-light-text-dull-02">
                        <img src={CarromLogo} className="  object-contain" />
                    </div>
                    <p>Carrom</p>
                </div>
                <div className="flex-1 flex flex-col items-center gap-y-2">
                    <div className="w-12 h-12 object-contain rounded-[20px] overflow-hidden border-2 border-light-text-dull-02">
                        <img src={Billard} className="  object-contain" />
                    </div>
                    <p>Billiards</p>
                </div>
                <div className="flex-1 flex flex-col items-center gap-y-2">
                    <div className="w-12 h-12 object-contain rounded-[20px] overflow-hidden border-2 border-light-text-dull-02">
                        <img src={Chess} className="  object-contain" />
                    </div>
                    <p>Chess</p>
                </div>
                <div className="flex-1 flex flex-col items-center gap-y-2">
                    <div className="w-12 h-12 object-contain rounded-[20px] overflow-hidden border-2 border-light-text-dull-02">
                        <img src={Cricket} className="  object-contain" />
                    </div>
                    <p>Cricket</p>
                </div>

            </div>
        </div>
    )
}

export default Categories