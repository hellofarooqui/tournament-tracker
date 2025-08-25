import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Loader2 } from "lucide-react";
import ProfileGamesStats from "../components/ProfileGamesStats";
import ProfileAchievements from "../components/ProfileAchievements";

const Profile = () => {
  const { user, authLoading } = useContext(AuthContext);

  if (authLoading) {
    return (
      <div>
        <Loader2 className="animate-spin" />
      </div>
    );
  }
  return (
    <div className="w-full h-screen flex py-16 font-dynapuff">
      {user && (<div className="w-full  mx-auto flex flex-col gap-y-4 text-xl font-semibold text-slate-200 ">
        
          <div className="w-full flex flex-col gap-y-2 items-center bg-[linear-gradient(135deg,rgba(255,107,107,0.2),rgba(238,90,36,0.1))] p-8">
            <div className="w-28 h-28 bg-gradient-to-br from-[#667eea]  to-[#764ba2] rounded-full mx-auto flex items-center justify-center mb-4">
              <h2 className="text-5xl font-bold">
                {user.firstName[0] + user.lastName[0]}
              </h2>
            </div>
            <h2 className="text-center text-2xl">
              {user.firstName} {user.lastName}
            </h2>
            <p className="font-thin text-slate-200/60 text-[18px]">
              {"@" + user.username}
            </p>
            <div className="w-full flex justify-between mt-4 border-2 border-slate-200/40 bg-slate-200/10 px-6 py-2 rounded-lg">
              <div className="flex flex-col items-center">
                <p className="text-2xl text-[#00c9ff]">0</p>
                <p className="text-sm font-thin">Games</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-2xl text-[#00c9ff]">0</p>
                <p className="text-sm font-thin">Wins</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-2xl text-[#00c9ff]">0</p>
                <p className="text-sm font-thin">Win Rate</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-2xl text-[#00c9ff]">0</p>
                <p className="text-sm font-thin">Rank</p>
              </div>
            </div>
          
          </div>
            <ProfileGamesStats/>
            <ProfileAchievements/>
       
      </div> )}
    </div>
  );
};
export default Profile;
