import { useState } from "react";
import { Link, useLocation } from "react-router";

const Navbar = () => {
  const location = useLocation();
  const [showMenu,setShowMenu] = useState(false)
 
  return (
    <div className={`${ location.pathname == '/' ? "hidden" : "" } h-16 font-dynapuff text-dark-brown-01 w-screen absolute top-0 left-0 bg-slate-100/20 backdrop-blur-[10px] p-4 flex justify-between z-10`}>
      <div className="w-full flex justify-between items-center">
        <Link to="/">
          <h1 className="text-3xl font-semibold  bg-gradient-to-r from-[#FFA9CC] via-[#FEB2A4] to-[#FFC36B] bg-clip-text text-transparent">
            Carrom
          </h1>
        </Link>
        <div className="relative">
          <button onClick={() => setShowMenu(!showMenu)} className=" bg-gradient-to-r from-[#FFA9CC] via-[#FEB2A4] to-[#FFC36B] bg-clip-text text-transparent text-2xl bg-slate-200/80  py-1 px-2 rounded-md">
            {showMenu ? "✖" : "☰"}
            {showMenu && <div className={`absolute top-0 right-10 bg-slate-200/80 backdrop-blur-[10px]  rounded-[10px] border-2 border-slate-200/20 `}>
          <ul className="flex flex-col text-lg items-center py-2 px-2">
            <Link to="all-tournaments">
              <li className="text-slate-700  p-2 py-1">Tournaments</li>
            </Link>
             <Link to="all-tournaments">
              <li className="text-slate-700  p-2 py-1">Rules</li>
            </Link>
             <Link to="all-tournaments">
              <li className="text-slate-700  p-2 py-1">Settings</li>
            </Link>
            <li className="text-slate-700  p-2 py-1">Login</li>
          </ul>
        </div>}
          </button>
        </div>
        
      </div>
    </div>
  );
};
export default Navbar;
