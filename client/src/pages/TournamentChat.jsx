import { MessageCircle } from "lucide-react";
import React, { useContext, useEffect } from "react";
import { NavbarContext } from "../context/NavbarContext";

const TournamentChat = () => {
  const { navbar, setNavbar } = useContext(NavbarContext);
  useEffect(() => {
    setNavbar({
      ...navbar,
      pageTitle: "Chat",
      bg_color: "#0061ff",
      bg_transparent: false,
    });
    return () => {
      setNavbar({ ...navbar, pageTitle: "", bg_color: "" });
    };
  }, []);
  return (
    <div className="w-full h-full flex flex-col items-center justify-center font-dynapuff py-8">
      <h2 className="text-2xl text-dark-white/40 font-bold ">
        Tournament Chat
      </h2>
      <MessageCircle className="text-dark-blue my-6" size={48} />
      <p className="text-dark-blue">Coming Soon...</p>
    </div>
  );
};

export default TournamentChat;
