import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import SidebarMenu from "./SidebarMenu";
import { ArrowLeftCircle, CircleChevronLeft, Menu, MoveLeft, User } from "lucide-react";
import { NavbarContext } from "../context/NavbarContext";

const Navbar = () => {
  const { navbar } = useContext(NavbarContext)
  const location = useLocation();
  //console.log("location",location)
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className={`h-16 font-dynapuff text-dark-brown-01 w-screen absolute top-0 left-0 p-4 px-4 flex justify-between z-30`}
      style={{ backgroundColor: navbar.bg_transparent ? "transparent" : (navbar.bg_color ? navbar.bg_color : "#0061ff") }}
    >
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-x-1">
          {/* <CircleChevronLeft  className=" text-stone-100 " onClick={() => navigate(-1)} size={20} /> */}
          <MoveLeft onClick={() => navigate(-1)} className={`${location.pathname =="/" ? "hidden":""} text-white`} size={24} />
          <Link to="/">
            <h2 className={`flex-1 text-center text-white ${location.pathname =="/" ? "font-bold text-2xl" :"font-semibold text-xl"} `}>
              {navbar.pageTitle}
            </h2>
          </Link>
        </div>


        {/* <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className=" bg-gradient-to-r  from-stone-200 via-stone-100 to-stone-50 bg-clip-text text-transparent text-2xl bg-slate-200/80  py-1 px-2 rounded-md"
          >
            {showMenu ? "✖" : <Menu className="border-2 rounded-md p-1 border-light-main-blue/30 text-light-main-blue" size={30} />}
            {showMenu && (<SidebarMenu showMenu={showMenu} setShowMenu={setShowMenu} />
            )}
          </button>
        </div> */}
        <button className={`${navbar.showProfileIcon ? "" : "hidden"}`}><User className="bg-white text-light-main-blue p-1 rounded-full" size={30} /></button>
      </div>
    </div>
  );
};
export default Navbar;
