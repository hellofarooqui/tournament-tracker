import React, { createContext, useState } from 'react'

export const NavbarContext = createContext(null)


const NavbarProvider = ({children}) => {

    const [navbar,setNavbar] = useState({
        pageTitle:"",
        bg_color:"",
        bg_transparent:false,
        showProfileIcon: true
    })
  return (
    <NavbarContext.Provider value={{navbar,setNavbar}}>
        {children}
    </NavbarContext.Provider>
  )
}

export default NavbarProvider