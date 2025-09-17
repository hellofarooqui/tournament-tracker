import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import SidebarMenu from "./SidebarMenu";
import { ArrowLeftCircle, CircleChevronLeft, Menu, MoveLeft } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className={`${
        location.pathname == "/" ? "hidden" : ""
      } h-16 font-dynapuff text-dark-brown-01 w-screen absolute top-0 left-0 p-4 flex justify-between z-10`}
    >
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-x-1">
          {/* <CircleChevronLeft  className=" text-stone-100 " onClick={() => navigate(-1)} size={20} /> */}
             <MoveLeft  className="border-2 rounded-md p-1 border-light-main-blue/30 text-light-main-blue/30" onClick={() => navigate(-1)} size={30} />

        </div>
                  <Link to="/">
            <h1 className="text-3xl font-semibold text-light-main-blue">
              Tournario
            </h1>
          </Link>
       
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className=" bg-transparent py-1 px-2 rounded-md"
          >
            {showMenu ? "✖" : <Menu className="border-2 rounded-md p-1 border-light-main-blue/30 text-light-main-blue" size={30}/>}
            {showMenu && (<SidebarMenu showMenu={showMenu} setShowMenu={setShowMenu} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
