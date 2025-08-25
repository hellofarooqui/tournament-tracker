import GameIcon from "./../assets/icons/games-icon.png";

const ProfileGamesStats = () => {
  return (
    <div className="w-full mt-6 p-6">
      <div className="flex gap-x-3 items-end">
        <span className="w-8 bg-slate-200/20 p-1 rounded-md">
          <img src={GameIcon} className="" alt="Game Icon" />
        </span>
        <h2 className="text-start">Games & Stats</h2>
      </div>
    </div>
  );
};
export default ProfileGamesStats;
