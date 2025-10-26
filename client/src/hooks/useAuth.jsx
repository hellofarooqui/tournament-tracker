import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const server = import.meta.env.VITE_SERVER_URL;

const useAuth = () => {
  const {login, logout, token, user} = useContext(AuthContext)

  const registerUser = async (userData) => {
    try {
      const response = await axios.post(`${server}/api/auth/register`, userData);
      if (response.status == 201) {
        console.log("Response",response)
        return response.data;
      }
      if (response.status == 500) {
         console.log("Response",response)
        throw new Error("Error registering user");
      }
    // if(response){
    //     console.log("Response",response)
    // }
      
    } catch (error) {
      console.error("Error registering user:", error);
      throw new Error(error);
    }
  };

  const loginUser = async (credentials) => {
    try {
      const response = await axios.post(
        `${server}/api/auth/login`,
        credentials
      );

      if(response.status == 200){
        login(response.data.token)
        return response.data;
      }
      if (response.status == 500) {
         console.log("Response",response)
        throw new Error("Error in loggin in");
      }

      
    } catch (error) {
      console.error("Error logging in user:", error);
    }
  };

  return {
    loginUser,
    registerUser,
  };
};
export default useAuth;
