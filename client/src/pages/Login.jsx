import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import {
  Loader2,
  Eye,
  EyeOff,
  Facebook,
  LucideFacebook,
  Twitch,
  Twitter,
} from "lucide-react"; // <-- import icons

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
    <div className="w-screen h-screen flex items-center justify-center font-dynapuff bg-dark-black">
      <div className="w-[85%] flex flex-col gap-y-4 text-xl font-semibold  ">
        <div className="flex flex-col items-center gap-y-4 mb-4">
          <Link to="/">
            <h1 className="text-[58px] font-semibold text-dark-white">
              Tournario
            </h1>
          </Link>
        </div>
        <h2 className="text-3xl font-thin text-dark-white/70 mb-2 leading-0.5">
          Login
        </h2>
        <p className="text-dark-white/40 font-thin text-sm">Welcome back!</p>
        <div className="bg-dark-gray/10 rounded-[20px]  overflow-hidden mt-2">
          <form
            onSubmit={handleSubmit}
            onReset={handleReset}
            className="flex flex-col gap-y-4  items-center justify-center text-[16px]  backdrop-blur-2xl bg-slate-200/20 p-6 py-8 rounded-2xl"
          >
            <label className="w-full flex flex-col gap-y-1 text-dark-white/50">
              Email
              <input
                placeholder="Enter Email"
                className="w-full p-2 bg-dark-gray/70   text-dark-white border-dark-white/10 rounded-[10px] focus:outline-none focus:border-slate-200/40"
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
            </label>
            <div className="w-full relative">
            <label className="w-full flex flex-col gap-y-1 text-dark-white/50">
                Password
                <input
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                className="w-full p-2 bg-dark-gray/70   text-dark-white border-dark-white/10 rounded-[10px] focus:outline-none focus:border-slate-200/40"
                  onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
                />
             
              <span
                className="absolute right-3 top-1/2 cursor-pointer "
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={0}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff size={20} className="text-slate-600" />
                ) : (
                  <Eye size={20} className="text-slate-400" />
                )}
              </span>
               </label>
            </div>
            <div className="w-full flex flex-col gap-y-4 mt-2">
              <button
                type="submit"
                className="flex-1 bg-light-main-blue text-white py-2 rounded-[10px] mt-4 text-center"
              >
                {loading ? (
                  <Loader2 className="animate-spin text-white" />
                ) : (
                  "Login"
                )}
              </button>
              <div className="flex w-full justify-center items-center">
                <p className="text-light-text-dull-02 font-semibold underline text-sm">
                  Forgot Password?
                </p>
              </div>

              <div className="flex flex-col">
                <p className="block text-center font-thin text-light-text-dull-02">
                  or
                </p>

                <button className="flex items-center bg-dark-gray text-white font-thin py-2 px-4 rounded-[10px] mt-4 text-center">
                  <LucideFacebook
                    className="bg-light-text-dull-01 p-1 rounded-full text-white"
                    size={24}
                  />{" "}
                  <span className="flex-1">Login with Facebook</span>
                </button>


                <button className="flex items-center bg-dark-gray text-white font-thin py-2 px-4 rounded-[10px] mt-4 text-center">
                  <Twitter
                    className="bg-light-text-dull-01 p-1 rounded-full text-white"
                    size={24}
                  />{" "}
                  <span className="flex-1">Login with Twitter</span>
                </button>
                <p className="text-center text-[16px] font-thin text-stone-400 mt-6">
                  Don't have an account?{" "}
                  <button
                    className="text-light-main-blue"
                    onClick={() => navigate("/register")}
                  >
                    Signup
                  </button>
                </p>
              </div>
            </div>
          </form>
        </div>
        {/* <Link to="/">
          <p className="text-sm text-slate-200/70 font-thin italic text-center underline">
            Go Back to Home
          </p>
        </Link> */}
      </div>
    </div>
  );
};

export default Login;
