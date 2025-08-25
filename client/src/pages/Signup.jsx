import React from "react";
import { Link, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import toast from "react-hot-toast";

const defaultNewUser = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const Signup = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(defaultNewUser);
  const [loading, setLoading] = useState(false);
  const { registerUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !userData.firstName ||
      !userData.lastName ||
      !userData.email ||
      !userData.password
    ) {
      toast.error("All fields are required");
      return;
    }
    try {
      setLoading(true);
      const response = await registerUser(userData);
      if (response && response.message ) {
        console.log("User created",response)
        toast.success("User registered successfully");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error registering user:", error);
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
        <h2 className="text-2xl text-white mb-2 leading-0.5">Signup</h2>
        <div className="w-full">
          <form
            onSubmit={handleSubmit}
            onReset={handleReset}
            className="w-full flex flex-col gap-y-4  items-center justify-center text-[16px]  backdrop-blur-2xl bg-slate-200/20 p-6 py-8 rounded-2xl"
          >
            <input
              placeholder="First Name"
              className="w-full p-2 px-4 bg-gradient-to-r from-[#22427D] to-[#254B8C] backdrop-blur-2xl  text-white border-2 border-slate-200/20 rounded-[10px] focus:outline-none focus:border-slate-200/40"
              onChange={(e) =>
                setUserData({ ...userData, firstName: e.target.value })
              }
            />
            <input
              placeholder="Last Name"
              type="text"
              className="w-full p-2 px-4 bg-gradient-to-r from-[#22427D] to-[#254B8C] backdrop-blur-2xl  text-white border-2 border-slate-200/20 rounded-[10px] focus:outline-none focus:border-slate-200/40"
              onChange={(e) =>
                setUserData({ ...userData, lastName: e.target.value })
              }
            />

            <input
              placeholder="Email"
              className="w-full p-2 px-4 bg-gradient-to-r from-[#22427D] to-[#254B8C] backdrop-blur-2xl  text-white border-2 border-slate-200/20 rounded-[10px] focus:outline-none focus:border-slate-200/40"
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
            <input
              placeholder="Password"
              type="password"
              className="w-full p-2 px-4 bg-gradient-to-r from-[#22427D] to-[#254B8C] backdrop-blur-2xl  text-white border-2 border-slate-200/20 rounded-[10px] focus:outline-none focus:border-slate-200/40"
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
            <div className="w-full flex gap-x-4 text-xl  text-white mt-2">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-[#0AC2F8] to-[#3385D9] py-2 rounded-[10px]"
              >
                Signup
              </button>
              <p
                onClick={() => navigate("/login")}
                className="text-center flex-1  border-2 border-[#0AC2F8] text-[#0AC2F8] py-2 rounded-[10px]"
              >
                Login
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

export default Signup;
