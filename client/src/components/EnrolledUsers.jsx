import { User } from "lucide-react";

const EnrolledUsers = ({ players }) => {
  console.log("Enrolled players:", players);
  return (
    <div className="w-full rounded-[10px] bg-white overflow-hidden shadow-sm mt-2">
      <h3 className="text-2xl text-start font-bold bg-gradient-to-br from-stone-900 via-stone-800 to-stone-700 text-stone-200 py-4 px-4 flex justify-between items-center">Enrolled Users <span className="text-[16px] bg-slate-200/20 px-2 py-1 border rounded-full">{players.length}</span></h3>

      <ul className="my-2 flex flex-col gap-y-4 text-lg">
        {players.map((player) => (
          <li
            key={player._id}
            className="flex items-center  text-stone-600 gap-x-2 rounded-lg px-4 py-2"
          >
            <span className="p-2  bg-gradient-to-br from-stone-300 via-stone-200 to-stone-100 rounded-lg">
              <User className="text-stone-700" size={18}/>
            </span>
            {player.firstName} {player.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default EnrolledUsers;
