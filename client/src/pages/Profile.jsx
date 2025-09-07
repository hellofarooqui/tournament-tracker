import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Loader2, LogOut } from "lucide-react";
import ProfileGamesStats from "../components/ProfileGamesStats";
import ProfileAchievements from "../components/ProfileAchievements";

const Profile = () => {
  const { user, authLoading, logout } = useContext(AuthContext);

  if (authLoading) {
    return (
      <div>
        <Loader2 className="animate-spin" />
      </div>
    );
  }
  return (
    <div className="w-full h-screen flex py-16 font-dynapuff">
      {user && (
        <div className="w-full full  mx-auto flex flex-col text-xl font-semibold text-slate-200 bg-neutral-50 ">
          <div className="w-full relative  flex flex-col gap-y-2 items-center bg-neutral-200 p-8">
            <div className="w-28 h-28 bg-gradient-to-br from-neutral-50 to-neutral-100 shadow-sm rounded-full mx-auto flex items-center justify-center mb-4">
              <h2 className="text-5xl font-bold text-neutral-700">
                {user.firstName[0] + user.lastName[0]}
              </h2>
            </div>
            <h2 className="text-center text-2xl text-neutral-700">
              {user.firstName} {user.lastName}
            </h2>
            <p className="font-thin text-neutral-400 text-[18px]">
              {"@" + user.username}
            </p>
            <div className="w-full flex justify-between mt-4  bg-neutral-100 px-6 py-2 rounded-lg">
              <div className="flex flex-col items-center">
                <p className="text-2xl text-slate-700">0</p>
                <p className="text-sm font-thin text-neutral-500">Games</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-2xl text-slate-700">0</p>
                <p className="text-sm font-thin text-neutral-500">Wins</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-2xl text-slate-700">0</p>
                <p className="text-sm font-thin text-neutral-500">Win Rate</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-2xl text-slate-700">0</p>
                <p className="text-sm font-thin text-neutral-500">Rank</p>
              </div>
            </div>

            <button
              className="absolute right-4 top-4 p-2 rounded-lg bg-slate-200/20"
              onClick={() => logout()}
            >
              <LogOut size={16} />
            </button>
          </div>
          <div className="p-6 flex flex-col gap-y-6">
            <ProfileGamesStats />
            <ProfileAchievements />
          </div>
        </div>
      )}
    </div>
  );
};
export default Profile;
