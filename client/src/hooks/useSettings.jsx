import axios from 'axios';
import React from 'react'

const server = import.meta.env.VITE_SERVER_URL;

const useSettings = () => {

    const addTournamentFormat = async (formatData) => {
        try {
            const response = await axios.post(`${server}/api/settings/tournament-formats`, formatData);
            console.log("Tournament format added successfully:", response.data);
            if(response.status === 201) {
               return response.data;
            }
            else throw new Error("Failed to add tournament format", response.status);
        } catch (error) {
            console.error("Error adding tournament format:", error);
        }
    }

    const getTournamentFormats = async () => {
        try {
            const response = await axios.get(`${server}/api/settings/tournament-formats`);
            if(response.status === 200) {
                //console.log("Tournament formats fetched successfully:", response.data);
                return response.data; // Return the fetched tournament formats
            }
        } catch (error) {
            console.error("Error fetching tournament formats:", error);
        }
    }

  return {addTournamentFormat,getTournamentFormats}
}

export default useSettings