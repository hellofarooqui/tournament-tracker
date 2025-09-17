import { MessageCircle } from "lucide-react";
import React, { useContext, useEffect } from "react";
import { NavbarContext } from "../context/NavbarContext";

const TournamentChat = () => {
  const {navbar,setNavbar} = useContext(NavbarContext)
    useEffect(()=>{
      setNavbar({...navbar, pageTitle:"Chat", bg_color:"#0061ff",bg_transparent:false})
      return ()=>{
        setNavbar({...navbar, pageTitle:"", bg_color:""})
      }
    },[])
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center font-dynapuff pt-16">
      <div className="w-full h-full flex flex-col items-center justify-center gap-y-4 mb-8 bg-white rounded-t-[20px]">
        <h2 className="text-2xl text-stone-600 font-bold">Tournament Chat</h2>
        <MessageCircle className="text-stone-600" size={48}/>
        <p className="text-stone-500">Coming Soon...</p>
      </div>
    </div>
  );
};

export default TournamentChat;
