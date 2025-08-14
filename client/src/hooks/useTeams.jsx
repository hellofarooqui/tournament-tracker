import axios from 'axios';
import React from 'react'

const server = import.meta.env.VITE_SERVER_URL;

const useTeams = () => {

    const getTournamentTeams = async (tournamentId) => {
        try {
            const response = await axios.get(`${server}/api/tournaments/${tournamentId}/teams`);
            if(response.status === 200) {
                //console.log("Teams fetched successfully:", response.data);
                return response.data; // Return the fetched teams
            }
        } catch (error) {
            console.error("Error fetching tournament teams:", error);
        }
    }

    const createTeam = async (tournamentId, teamData) => {
        try {
            const response = await axios.post(`${server}/api/tournaments/${tournamentId}/teams`, teamData);
            if(response.status === 201) {
                console.log("Team created successfully:", response.data);
                return response.data; // Return the created team
            }
        } catch (error) {
            console.error("Error creating team:", error);
        }
    }
  return {getTournamentTeams, createTeam}
}

export default useTeams
