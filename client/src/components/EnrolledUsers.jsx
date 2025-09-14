import { User } from "lucide-react";

const EnrolledUsers = ({ players }) => {
  return (
    <div className="w-full mt-6">
      <h3 className="text-2xl text-start font-bold bg-gradient-to-br from-stone-900 via-stone-800 to-stone-700 text-stone-200 p-2 rounded-[10px] flex justify-between items-center">Enrolled Users <span className="text-[16px] bg-slate-200/20 px-2 py-1 border rounded-full">{players.length}</span></h3>

      <ul className="mt-4 flex flex-col gap-y-4 text-lg">
        {players.map((player) => (
          <li
            key={player._id}
            className="flex items-center bg-white shadow-sm text-stone-600 gap-x-2 rounded-lg px-4 py-2"
          >
            <span className="p-2  bg-gradient-to-br from-[#667eea]  to-[#764ba2] rounded-lg">
              <User className="text-white" size={18}/>
            </span>
            {player.user.firstName} {player.user.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default EnrolledUsers;
