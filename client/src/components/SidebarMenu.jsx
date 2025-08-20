import { CircleX } from "lucide-react";
import { Link } from "react-router";

const SidebarMenu = ({ showMenu, setShowMenu }) => {
  return (
    <div
      className={`w-screen h-screen flex flex-col justify-between fixed inset-0 font-dynapuff  ${
        showMenu ? "translate-x-0" : "-translate-x-[100%]"
      } transition-all duration-150 ease-in-out z-50 bg-gradient-to-b from-[#22427D] via-[] to-[#254B8C]   backdrop-blur-2xl `}
    >
      <ul className="w-full flex flex-col text-2xl text-slate-200/80 font-thin px-2 py-8 text-start">
        <Link to="all-tournaments">
          <li className=" p-2 py-3 font-t border-b-2 border-slate-200/30 ">
            Tournaments
          </li>
        </Link>
        <Link to="standard-rules">
          <li className="t  p-2 py-3 border-b-2 border-slate-200/30">Rules</li>
        </Link>
        <Link to="questions">
          <li className="t  p-2 py-3 border-b-2 border-slate-200/30">Q & A</li>
        </Link>
        <Link to="all-tournaments">
          <li className="  p-2 py-3 border-b-2 border-slate-200/30">
            Settings
          </li>
        </Link>
        <li className="  p-2 py-3 border-b-2 border-slate-200/30">Login</li>
      </ul>

      <div className="py-6">
        <Link to="/">
          <h1 className="text-3xl font-semibold  bg-gradient-to-r from-[#FFA9CC] via-[#FEB2A4] to-[#FFC36B] bg-clip-text text-transparent">
            Carrom
          </h1>
        </Link>
      </div>

      <CircleX
        className="fixed text-gray-200 top-4 right-4"
        onClick={() => setShowMenu(false)}
        size={32}
      />
    </div>
  );
};
export default SidebarMenu;
