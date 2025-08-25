import Badge from './../assets/icons/badge-icon.png'
const ProfileAchievements = () => {
  return (
      <div className="w-full mt-6 p-6">
        <div className="flex gap-x-3 items-end">
          <span className="w-8 bg-slate-200/20 p-1 rounded-md">
            <img src={Badge} className="" alt="Game Icon" />
          </span>
          <h2 className="text-start">Achievements</h2>
        </div>
      </div>
    );
}
export default ProfileAchievements