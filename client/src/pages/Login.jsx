import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import { Loader2, Eye, EyeOff } from "lucide-react"; // <-- import icons

const Login = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // <-- add state

  const { loginUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await loginUser(userData);
      if (response && response.message) {
        console.log("User logged in", response);
        toast.success("User logged in successfully");
        navigate("/");
      }
    } catch (error) {
      console.error("Error logging in user:", error);
      toast.error("Error logging in user");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
  };

  return (
    <div className="w-full h-screen flex items-start justify-center py-16 font-dynapuff">
      <div className="w-[80%] flex flex-col gap-y-4 text-xl font-semibold ">
        <div className="flex flex-col items-center gap-y-4 mb-16">
          <Link to="/">
            <h1 className="text-[58px] font-semibold  bg-gradient-to-r from-[#FFA9CC] via-[#FEB2A4] to-[#FFC36B] bg-clip-text text-transparent">
              Carrom
            </h1>
          </Link>
        </div>
        <h2 className="text-2xl text-white mb-2 leading-0.5">Login</h2>
        <div>
          <form
            onSubmit={handleSubmit}
            onReset={handleReset}
            className="flex flex-col gap-y-4  items-center justify-center text-[16px]  backdrop-blur-2xl bg-slate-200/20 p-6 py-8 rounded-2xl"
          >
            <input
              placeholder="Email"
              className="w-full p-2 px-4 bg-gradient-to-r from-[#22427D] to-[#254B8C] backdrop-blur-2xl  text-white border-2 border-slate-200/20 rounded-[10px] focus:outline-none focus:border-slate-200/40"
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
            <div className="w-full relative">
              <input
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                className="w-full p-2 px-4 bg-gradient-to-r from-[#22427D] to-[#254B8C] backdrop-blur-2xl  text-white border-2 border-slate-200/20 rounded-[10px] focus:outline-none focus:border-slate-200/40 pr-10"
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-white"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={0}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
            <div className="w-full flex gap-x-4 text-xl  text-white mt-2">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-[#0AC2F8] to-[#3385D9] py-2 rounded-[10px]"
              >
                {loading ? <Loader2 className="animate-spin" /> : "Login"}
              </button>
              <p
                onClick={() => navigate("/register")}
                className="text-center flex-1 border-2 border-[#0AC2F8] text-[#0AC2F8] py-2 rounded-[10px]"
              >
                Signup
              </p>
            </div>
          </form>
        </div>
        <Link to="/">
          <p className="text-sm text-slate-200/70 font-thin italic text-center underline">
            Go Back to Home
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Login;
