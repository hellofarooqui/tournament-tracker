import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter, Route, Routes } from "react-router";
import RootLayout from "./layout/RootLayout";

import Home from "./pages/Home";
import NewTournament from "./pages/NewTournament";
import ViewAllTournaments from "./pages/ViewAllTournaments";
import TournamentDetails from "./pages/TournamentDetails";
import TeamDetails from "./components/TeamData";
import { Settings } from "lucide-react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TournamentRules from "./pages/TournamentRules";
import StandardRules from "./pages/StandardRules";
import Questions from "./pages/Questions";
import { urlBase64ToUint8Array } from "./utils/urlBase64ToUint8Array.js";
import Profile from "./pages/Profile.jsx";
import TournamentChat from "./components/TournamentChat.jsx";
import TournamentNewTeam from "./pages/TournamentNewTeam.jsx";
import TournamentGroup from "./pages/TournamentGroup.jsx";
import TournamentFormats from "./pages/TournamentFormats.jsx";

const server = import.meta.env.VITE_SERVER_URL;

function App() {
  const [count, setCount] = useState(0);

    // useEffect(() => {
    //   if ("serviceWorker" in navigator && "PushManager" in window) {
    //     navigator.serviceWorker.ready.then(async (reg) => {
    //       const permission = await Notification.requestPermission();
    //       if (permission === "granted") {
    //         const subscription = await reg.pushManager.subscribe({
    //           userVisibleOnly: true,
    //           applicationServerKey: urlBase64ToUint8Array(import.meta.env.VITE_VAPID_PUBLIC_KEY), // frontend env
    //         });

    //         // Send subscription to backend
    //         await fetch(`${server}/api/subscribe`, {
    //           method: "POST",
    //           headers: { "Content-Type": "application/json" },
    //           body: JSON.stringify(subscription),
    //         });
    //       }
    //     });
    //   }
    // }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/new-tournament" element={<NewTournament />} />
            <Route path="/all-tournaments" element={<ViewAllTournaments />} />

            <Route path="/tournament/:id" element={<TournamentDetails />} />
            <Route
              path="/tournament/:id/newTeam"
              element={<TournamentNewTeam />}
            />
            <Route
              path="/tournament/:id/newGame"
              element={<TournamentDetails />}
            />
            <Route path="/tournament/:id/rules" element={<TournamentRules />} />
            <Route
              path="/tournament/:id/group/:groupId"
              element={<TournamentGroup />}
            />
            <Route path="/team/:id" element={<TeamDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
            <Route path="chat" element={<TournamentChat />} />
            <Route path="standard-rules" element={<StandardRules />} />
            <Route path="questions" element={<Questions />} />
            <Route path="tournament-formats" element={<TournamentFormats />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
