import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { Outlet, useNavigate } from "react-router";
import BottomBar from "../components/BottomBar";
import { AuthContext } from "../context/AuthContext";
import { Loader2 } from "lucide-react";
import LoadingScreen from "../components/LoadingScreen";

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
    return <LoadingScreen />;
  }

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
      <BottomBar />
    </div>
  );
};

export default RootLayout;
