import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router'

const RootLayout = () => {
  return (
    <div className='max-w-screen max-h-screen'>
      <Navbar/>
      <div className='w-full h-full overflow-y-scroll scrollbar-thin'>
 <Outlet/>
      </div>
     
    </div>
  )
}

export default RootLayout
