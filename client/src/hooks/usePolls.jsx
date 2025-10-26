import React from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const server = import.meta.env.VITE_SERVER_URL;

const usePolls = () => {
    const { token } = useContext(AuthContext)


    const getPollResults = async (pollId) => {
         try {
            const response = await axios.get(
                `${server}/api/poll/${pollId}/poll-results`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }   
                }
            )
            
            if (response.status === 200) {
                //console.log("Election results fetched:", response.data)
                return response.data
            }
        } catch (error) {
            console.error("Error fetching election results:", error)
            throw new Error("Error fetching election results")
        }
    }
  return {getPollResults}
}

export default usePolls