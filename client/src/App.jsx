import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Route, Routes } from 'react-router'
import RootLayout from './layout/RootLayout'
import Login from './pages/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout/>}>
            <Route path="/" element={<h1>Home Page</h1>} />
          </Route>
          <Route path='login' element={<Login/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
