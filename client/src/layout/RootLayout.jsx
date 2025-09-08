import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { Outlet, useNavigate } from "react-router";
import BottomBar from "../components/BottomBar";
import { AuthContext } from "../context/AuthContext";
import { Loader2 } from "lucide-react";

const RootLayout = () => {
  const { user, authLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!authLoading && !user) {
      console.log("No user found, redirecting to login");
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  if (authLoading) {
    return (
      <div className="w-screen h-screen flex flex-col items-center justify-center font-dynapuff pt-16">
        <div className="w-full h-full flex flex-col items-center justify-center gap-y-4 mb-8 bg-transparent rounded-t-[20px]">
	<h1 className="font-bold text-2xl">Tournario</h1>          
	<Loader2 className="animate-spin text-white" />
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="max-w-screen max-h-screen">
      <Navbar />
      <div className="w-full h-full overflow-hidden">
        <Outlet />
      </div>
      <BottomBar />
    </div>
  );
};

export default RootLayout;
