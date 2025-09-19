import { Loader2 } from 'lucide-react'
import React from 'react'

const LoadingScreen = () => {
    return (
        <div className="fixed top-0 left-0 w-screen h-screen flex flex-col items-center justify-center bg-dark-black text-dark-white/60">
            <h1 className="font-bold text-2xl text-dark-white/80">Tournario</h1>
            <Loader2 className="animate-spin" />

        </div>
    )
}

export default LoadingScreen