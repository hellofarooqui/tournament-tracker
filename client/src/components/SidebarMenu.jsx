import { CircleX } from "lucide-react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

const SidebarMenu = ({ showMenu, setShowMenu }) => {
  const {user, logout} = useContext(AuthContext)
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/")
  }
  return (
    <div
      className={`w-screen h-screen flex flex-col justify-between fixed inset-0 font-dynapuff  ${
        showMenu ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out z-50 bg-light-bg-gray `}
    >
      <ul className="w-full flex flex-col text-2xl text-light-text-dull-01 font-thin px-2 py-8 text-start">
        <Link to="all-tournaments">
          <li className=" p-2 py-3 font-t border-b-2 border-light-text-dull-02/50 ">
            Tournaments
          </li>
        </Link>
        <Link to="standard-rules">
          <li className="t  p-2 py-3 border-b-2 border-light-text-dull-02/50">Rules</li>
        </Link>
        <Link to="questions">
          <li className="t  p-2 py-3 border-b-2 border-light-text-dull-02/50">Q & A</li>
        </Link>
        <Link to="all-tournaments">
          <li className="  p-2 py-3 border-b-2 border-light-text-dull-02/50">
            Settings
          </li>
        </Link>
        {user ? (
          <>
          <li className="  p-2 py-3 border-b-2 border-light-text-dull-02/50">
           <Link to='/profile'>Profile</Link>
          </li>
          <li onClick={handleLogout} className="  p-2 py-3 border-b-2 border-light-text-dull-02/50">
           Logout
          </li>
          </>
        ) : (
          <Link to="login">
            <li className="  p-2 py-3 border-b-2 border-light-text-dull-02/50">Login</li>
          </Link>
        )}
        
      </ul>

      <div className="py-6">
        <Link to="/">
          <h1 className="text-3xl font-semibold text-light-main-blue">
            Tournario
          </h1>
        </Link>
      </div>

      <CircleX
        className="fixed text-light-text-dull-01 top-4 right-4"
        onClick={() => setShowMenu(false)}
        size={32}
      />
    </div>
  );
};
export default SidebarMenu;
