import GameIcon from "./../assets/icons/games-icon.png";

const ProfileGamesStats = () => {
  return (
    <div className="w-full p-6 bg-dark-gray shadow-sm rounded-[15px] border-2 border-dark-white/10">
      <div className="flex gap-x-3 items-end">
        <span className="w-8 p-1 rounded-md">
          <img src={GameIcon} className="" alt="Game Icon" />
        </span>
        <h2 className="text-start text-dark-white/90">Games & Stats</h2>
      </div>
    </div>
  );
};
export default ProfileGamesStats;
