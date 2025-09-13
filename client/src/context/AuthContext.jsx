import { useEffect } from 'react';
import { createContext, useContext, useState } from 'react'
import axios from 'axios';

const server = import.meta.env.VITE_SERVER_URL;

export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    const [token,setToken] = useState(null)
    const [user,setUser] = useState(null)
    const [authLoading, setAuthLoading] = useState(true)

    // Check for token in localStorage on first mount
    useEffect(() => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
        fetchUserData(storedToken);
        //setAuthLoading(false);
      } else {
        setUser(null);
        setAuthLoading(false);
      }
    }, []);

    useEffect(()=>{
      if(token){
        fetchUserData(token)
      }
    },[token])

    const fetchUserData = async (token) => {
      setAuthLoading(true);
      try{
        const response = await axios.get(`${server}/api/auth`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          });
          const data = response.data;
          //console.log("Fetched user data:", data);
          setUser(data);
        
        }catch(error){
          console.error("Error fetching user data:", error.response.status);
          if(error.response.status == 400 || error.response.status == 401){
            localStorage.removeItem('token');
            setUser(null);
          }
          setUser(null);
        }finally{
          setAuthLoading(false);
        }
    }

    const login = (token)=>{
        setToken(token);
        localStorage.setItem('token', token);
        fetchUserData(token);
    }

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
    }
 
  return (
    <AuthContext.Provider value={{login, logout, token, user, authLoading}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;

