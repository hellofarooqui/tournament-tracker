import React from 'react'

export const VoteContext = React.createContext();

const VoteProvider = ({children}) => {

    const [voted,setVoted] = React.useState(false);
  return (
   <VoteContext.Provider value={{voted,setVoted}}>
    {children}
   </VoteContext.Provider>
  )
}

export default VoteProvider