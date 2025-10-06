import { User } from "lucide-react";

const EnrolledUsers = ({ players }) => {
  console.log("Enrolled players:", players);
  return (
    <div className="w-full rounded-[10px] bg-dark-gray overflow-hidden shadow-sm mt-2">
      <h3 className="text-lg text-start font-bold bg-light-main-blue text-white  p-2 px-4 flex justify-between items-center">Enrolled Users <span className="">{players.length}</span></h3>

      <ul className="my-2 flex flex-col gap-y-4 text-lg">
        {players.map((player) => (
          <li
            key={player._id}
            className="flex items-center  text-dark-white gap-x-2 rounded-lg px-4 py-2"
          >
            <span className="p-2 border border-light-text-dull-02 rounded-full">
              <User className="text-dark-white" size={18}/>
            </span>
            {player.firstName} {player.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default EnrolledUsers;
