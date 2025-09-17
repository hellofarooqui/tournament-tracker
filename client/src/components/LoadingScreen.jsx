import { Loader2 } from 'lucide-react'
import React from 'react'

const LoadingScreen = () => {
    return (
        <div className="w-full h-screen flex items-center justify-center bg-light-bg-gray text-light-text-dull-01">
            <h1 className="font-bold text-2xl text-light-text-dark">Tournario</h1>
            <Loader2 className="animate-spin" />

        </div>
    )
}

export default LoadingScreen