import { createContext, useState } from 'react'

const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    const [token,setToken] = useState(null)
    const [user,setUser] = useState(null)

    const fetchUserData = async (token) => {
        // Fetch user data from the server using the token
        // This is a placeholder function; implement your API call here
        // Example: const response = await fetch('/api/user', { headers: { Authorization: `Bearer ${token}` } });
        // const data = await response.json();
        // setUser(data);
    }   

    const login = (token)=>{
        setToken(token);
        fetchUserData(token);
        //setUser({}); // Ideally, you would fetch user data based on the token
    }

    const logout = () => {
        setToken(null);
        setUser(null);
    }
 
  return (
    <AuthContext.Provider value={{login, logout, token, user}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;
