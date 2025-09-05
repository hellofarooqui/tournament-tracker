import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";
import BottomBar from "../components/BottomBar";

const RootLayout = () => {
  return (
    <div className="max-w-screen max-h-screen">
      <Navbar />
      {/* <div className="w-full h-full overflow-y-scroll scrollbar-thin"> */}
      <div className="w-full h-full overflow-hidden">
        <Outlet />
      </div>
      <BottomBar />
    </div>
  );
};

export default RootLayout;
