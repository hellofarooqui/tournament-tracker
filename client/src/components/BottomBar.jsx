import { Diamond, House, MessageCircle, MessageSquareText, User } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router";

const BottomBar = () => {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <div className="z-20 fixed bottom-0 w-full h-16 bg-white flex items-center justify-center border-t border-light-text-dull-02/50 shadow-sm">
      <ul className="w-full flex justify-around">
        <Link to="/">
          <li className={`text-center font-semibold flex flex-col items-center transition-colors  ${
            isActive('/') ? 'text-light-main-blue ' : 'text-light-text-dull-01'
          }`}>
            <House size={20} />
            <p className="text-xs mt-1">Home</p>
          </li>
        </Link>
        <Link to="/all-tournaments">
          <li className={`text-center font-semibold flex flex-col items-center transition-colors  ${
            isActive('/all-tournaments') ? 'text-light-main-blue ' : 'text-light-text-dull-01'
          }`}>
            <Diamond size={20} />
            <p className="text-xs mt-1">Tournaments</p>
          </li>
        </Link>
        <Link to="/chat">
          <li className={`text-center font-semibold flex flex-col items-center transition-colors  ${
            isActive('/chat') ? 'text-light-main-blue ' : 'text-light-text-dull-01'
          }`}>
            <MessageCircle size={20} />
            <p className="text-xs mt-1">Chat</p>
          </li>
        </Link>
        <Link to="/profile">
          <li className={`text-center font-semibold flex flex-col items-center transition-colors  ${
           isActive('/profile') ? 'text-light-main-blue ' : 'text-light-text-dull-01'
          }`}>
            <User size={20} />
            <p className="text-xs mt-1">Profile</p>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default BottomBar;