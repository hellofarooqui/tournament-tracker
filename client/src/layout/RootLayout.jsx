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
    return <Loader2 className="animate-spin" />;
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
