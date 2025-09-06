import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import SidebarMenu from "./SidebarMenu";
import { ArrowLeftCircle, CircleChevronLeft } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className={`${
        location.pathname == "/" ? "hidden" : ""
      } h-16 font-dynapuff text-dark-brown-01 w-screen absolute top-0 left-0 bg-slate-100/20 backdrop-blur-[10px] p-4 flex justify-between z-10`}
    >
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-x-1">
          <CircleChevronLeft  className=" text-amber-300 " onClick={() => navigate(-1)} size={20} />
          <Link to="/">
            <h1 className="text-3xl font-semibold  bg-gradient-to-r from-[#FFA9CC] via-[#FEB2A4] to-[#FFC36B] bg-clip-text text-transparent">
              Tournario
            </h1>
          </Link>
        </div>
       
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className=" bg-gradient-to-r from-[#FFA9CC] via-[#FEB2A4] to-[#FFC36B] bg-clip-text text-transparent text-2xl bg-slate-200/80  py-1 px-2 rounded-md"
          >
            {showMenu ? "✖" : "☰"}
            {showMenu && (<SidebarMenu showMenu={showMenu} setShowMenu={setShowMenu} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
