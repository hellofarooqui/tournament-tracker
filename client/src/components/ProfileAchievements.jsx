import Badge from './../assets/icons/badge-icon.png'
const ProfileAchievements = () => {
  return (
    <div className="w-full p-6 bg-white shadow-sm rounded-[15px] border-1 border-stone-100">
        <div className="flex gap-x-3 items-end">
          <span className="w-8  p-1 rounded-md">
            <img src={Badge} className="" alt="Game Icon" />
          </span>
          <h2 className="text-start text-neutral-700">Achievements</h2>
        </div>
      </div>
    );
}
export default ProfileAchievements