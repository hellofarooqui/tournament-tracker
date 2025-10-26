import React from 'react'
import axios from 'axios';

const server = import.meta.env.VITE_SERVER_URL;

const usePointsTable = () => {
    const fetchTournamentPointsTable = async (tournamentId) => {
        try {
            const response = await axios.get(
              `${server}/api/tournaments/${tournamentId}/points-table`
            );
            if (response.status === 200) {
                //console.log("Points table fetched successfully:", response.data);
                return response.data; // Return the fetched points table
            }
        } catch (error) {
            console.error("Error fetching points table:", error);
        }
    }

  return { fetchTournamentPointsTable }
}

export default usePointsTable
