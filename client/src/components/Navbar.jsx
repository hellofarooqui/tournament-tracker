import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import SidebarMenu from "./SidebarMenu";
import {
  ArrowLeft,
  ArrowLeftCircle,
  CircleChevronLeft,
  Menu,
  MoveLeft,
  User,
} from "lucide-react";
import { NavbarContext } from "../context/NavbarContext";

const Navbar = () => {
  const { navbar, showNavbar } = useContext(NavbarContext);
  const location = useLocation();
  //console.log("location",location)
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className={`${
        navbar.showNavbar ? "block" : "hidden"
      } h-16 bg-dark-black text-dark-white font-dynapuff w-screen p-4 px-4 flex justify-between z-30 border-b border-dark-gray`}
    >
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-x-1">
          {/* <CircleChevronLeft  className=" text-stone-100 " onClick={() => navigate(-1)} size={20} /> */}
          <ArrowLeft
            onClick={() => navigate(-1)}
            className={`${location.pathname == "/" ? "hidden" : ""} text-white`}
            size={24}
          />
        </div>
        <Link to="/">
          <h2
            className={`flex-1 text-center text-white ${
              location.pathname == "/"
                ? "font-bold text-2xl"
                : "font-semibold text-xl"
            } `}
          >
            {navbar.pageTitle}
          </h2>
        </Link>

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
        {navbar.showProfileIcon ? (
          <button>
            <User
              className="bg-dark-gray text-light-main-blue p-2 rounded-full"
              size={34}
            />
          </button>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};
export default Navbar;
