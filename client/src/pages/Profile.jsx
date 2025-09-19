import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Loader2, LogOut } from "lucide-react";
import ProfileGamesStats from "../components/ProfileGamesStats";
import ProfileAchievements from "../components/ProfileAchievements";
import { NavbarContext } from "../context/NavbarContext";
import Avatar1 from '../assets/avatars/astronaut.png'

const Profile = () => {
  const { user, authLoading, logout } = useContext(AuthContext);

  const [activeTab, setActiveTab] = useState("about");


  if (authLoading) {
    return (
      <div>
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  const {navbar,setNavbar} = useContext(NavbarContext)
      useEffect(()=>{
        setNavbar({...navbar, pageTitle:"Profile", bg_color:"#0061ff",bg_transparent:false})
        return ()=>{
          setNavbar({...navbar, pageTitle:"", bg_color:""})
        }
      },[])

  return (
    <div className="flex font-dynapuff">
      {user && (
        <div className="w-full full  mx-auto flex flex-col text-xl font-semibold text-slate-200 ">
          <div className="w-full relative  flex flex-col gap-y-2 items-center p-6">
            <div className="w-28 h-28 bg-gradient-to-br from-neutral-50 to-neutral-100 shadow-sm rounded-full mx-auto flex items-center justify-center mb-4">
              <img className="w-full h-full object-cover" src={Avatar1} />
            </div>
            <h2 className="text-center text-xl text-dark-white leading-2">
              {user.firstName} {user.lastName}
            </h2>
            <p className="font-thin text-dark-white/50 text-sm">
              {"@" + user.username}
            </p>
            <button className="bg-dark-blue w-full text-sm p-2 rounded-lg text-dark-white/90">
              Edit profile
            </button>

            <div className="w-full">
              <div className="w-full text-lg overflow-x-scroll scrollbar-none border-b border-white/10">
                <ul className="w-full flex text-sm justify-around ">
                  <li
                    onClick={() => setActiveTab("about")}
                    className={`cursor-pointer px-4 py-2 flex-1 ${
                      activeTab === "about"
                        ? "border-b border-dark-blue text-light-main-blue"
                        : "text-dark-white/50 font-thin"
                    }`}
                  >
                    About
                  </li>
                  <li
                    onClick={() => setActiveTab("stats")}
                    className={`cursor-pointer px-4 py-2 flex-1 ${
                      activeTab === "stats"
                        ? "border-b border-dark-blue text-light-main-blue"
                        : "text-dark-white/50 font-thin"
                    }`}
                  >
                    Stats
                  </li>
                  <li
                    onClick={() => setActiveTab("accounts")}
                    className={`cursor-pointer px-4 py-2 flex-1 ${
                      activeTab === "accounts"
                        ? "border-b border-dark-blue text-light-main-blue"
                        : "text-dark-white/50 font-thin"
                    }`}
                  >
                    Accounts
                  </li>
                  <li
                    onClick={() => setActiveTab("settings")}
                    className={`cursor-pointer px-4 py-2 flex-1 ${
                      activeTab === "settings"
                        ? "border-b border-dark-blue text-light-main-blue"
                        : "text-dark-white/50 font-thin"
                    }`}
                  >
                    Settings
                  </li>
                  
                </ul>
              </div>
              <div className="w-full p-6 ">
                <ProfileGamesStats />
               
              </div>
            </div>
            <button
              className="w-full text-center p-2 text-sm text-dark-white rounded-lg bg-dark-gray"
              onClick={() => logout()}
            >
              Logout
            </button>
            <button
              className="w-full text-center p-2 text-sm text-dark-white rounded-lg bg-red-400"
              onClick={() => logout()}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Profile;
