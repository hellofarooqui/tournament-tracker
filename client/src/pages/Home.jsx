import React from 'react'
import { Link } from 'react-router'

const Home = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center py-16 font-dynapuff'>
      <div className='flex flex-col gap-y-4 text-xl font-semibold text-yellow-01'>
        <Link to='new-tournament' className='bg-purple-02 p-2 rounded-[10px] px-8 py-4 text-center'>Create Tournament</Link>
        <Link to='all-tournaments' className='bg-purple-02 p-2 rounded-[10px] px-8 py-4 text-center'>View Tournaments</Link>
        <Link to='settings' className='bg-purple-02 p-2 rounded-[10px] px-8 py-4 text-center'>Settings</Link>

      </div>
    </div>
  )
}

export default Home
