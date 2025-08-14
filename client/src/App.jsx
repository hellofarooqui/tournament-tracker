import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Route, Routes } from 'react-router'
import RootLayout from './layout/RootLayout'
import Login from './pages/Login'
import Home from './pages/Home'
import NewTournament from './components/NewTournament'
import ViewAllTournaments from './components/ViewAllTournaments'
import TournamentDetails from './pages/TournamentDetails'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="new-tournament" element={<NewTournament />} />
            <Route path="all-tournaments" element={<ViewAllTournaments />} />
            <Route path="new-tournament" element={<NewTournament />} />
            <Route path='tournament/:id' element={<TournamentDetails />} />
          </Route>
          <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
