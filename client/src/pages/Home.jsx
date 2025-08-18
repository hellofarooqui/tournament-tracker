import React from 'react'
import { Link } from 'react-router'
import CarromLogo from './../assets/carrom.png'

const Home = () => {
  return (
    <div className='w-full h-screen flex flex-col items-center justify-center py-16 font-dynapuff px-8'>
      <div className='flex flex-col items-center gap-y-4 mb-8'>
        <img src={CarromLogo} className='w-24 h-24'/>
        <h1 className='text-4xl text-center  text-light-brown-03'>Carrom Championship Tracker</h1>
      </div>
      <div className='flex flex-col gap-y-4 text-xl font-semibold text-dark-brown-01'>
        <Link to='new-tournament' className='bg-light-brown-01 p-2 rounded-[10px] px-8 py-4 text-center'>Create Tournament</Link>
        <Link to='all-tournaments' className='bg-light-brown-01 p-2 rounded-[10px] px-8 py-4 text-center'>View Tournaments</Link>
        <Link to='settings' className='bg-light-brown-01 p-2 rounded-[10px] px-8 py-4 text-center'>Settings</Link>

      </div>
    </div>
  )
}

export default Home
