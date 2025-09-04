import { Diamond, House, MessageSquareText, User } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router";

const BottomBar = () => {
  const location = useLocation();
  return (
    <div
      className={`${
        location.pathname == "/" ? "hidden" : ""
      } fixed bottom-0 w-full h-16  bg-gradient-to-r from-[#0AC2F8] to-[#3385D9] flex items-center justify-center`}
    >
      <ul className="w-full flex justify-around">
        <Link to="/">
          <li className="text-center text-white font-semibold">
            <House />
          </li>
        </Link>
        <Link to="/all-tournaments">
          <li className="text-center text-white font-semibold">
            <Diamond />
          </li>
        </Link>
        <Link to="/chat">
          <li className="text-center text-white font-semibold">
            <MessageSquareText />
          </li>
        </Link>
        <Link to="/profile">
          <li className="text-center text-white font-semibold">
            <User />
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default BottomBar;
