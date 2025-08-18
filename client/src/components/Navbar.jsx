import { Link } from "react-router";

const Navbar = () => {
  return (
    <div className="h-16 font-dynapuff text-dark-brown-01 w-screen absolute top-0 left-0 bg-slate-100/20 backdrop-blur-[10px] p-4 flex justify-between z-10">
      <div className="w-full flex justify-between items-center">
        <Link to="/">
          <h1 className="text-3xl font-semibold  bg-gradient-to-r from-[#FFA9CC] via-[#FEB2A4] to-[#FFC36B] bg-clip-text text-transparent">
            Carrom
          </h1>
        </Link>
        <div>
          <ul className="flex gap-x-4 text-xl items-center">
            <Link to="all-tournaments">
              <li className="text-slate-200 text-sm py-1">
                Tournaments
              </li>
            </Link>
            <li className="text-slate-200 text-sm py-1">
              Login
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
