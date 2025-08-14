import React from 'react'

const Login = () => {
  return (
    <div className='w-screen font-dynapuff h-screen flex items-center justify-center bg-purple-1'>
      <div className='p-6 bg-purple-02'>
        <h2 className='text-yellow-01 font-bold text-3xl'>Login</h2>
        <form>
            <input className='text-white border-white' placeholder='Username'/>
        </form>
      </div>
    </div>
  )
}

export default Login
