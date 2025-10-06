import { User } from "lucide-react";

const EnrolledUsers = ({ players }) => {
  console.log("Enrolled players:", players);
  return (
    <div className="w-full rounded-[10px] bg-dark-gray overflow-hidden shadow-sm mt-2">
      <h3 className="text-lg text-start font-bold bg-dark-blue/20 border-dark-blue/50 text-white  p-2 px-4 flex justify-between items-center">Enrolled Users <span className="">{players.length}</span></h3>

      <ul className="my-2 flex flex-col  text-lg">
        {players.map((player) => (
          <li
            key={player._id}
            className="flex items-center  text-dark-white gap-x-2 rounded-lg px-4 py-2 text-base"
          >
            <span className="p-1 border border-light-text-dull-02 rounded-full">
              <User className="text-dark-white" size={16}/>
            </span>
            {player.firstName} {player.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default EnrolledUsers;
