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

    const getTournamentUnassignedTeams = async (tournamentId) => {
        try {
            const response = await axios.get(`${server}/api/tournaments/${tournamentId}/teams?filter=unassigned`);
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
            console.log("Creating team with data:", teamData);
            const response = await axios.post(`${server}/api/tournaments/${tournamentId}/teams`, teamData);
            if(response.status === 201) {
                console.log("Team created successfully:", response.data);
                return response.data; // Return the created team
            }
        } catch (error) {
            console.error("Error creating team:", error);
        }
    }

    const getTeamData = async (teamId) => {
      
        try {
            const response = await axios.get(`${server}/api/teams/${teamId}`);
            if(response.status === 200) {
                console.log("Team data fetched successfully:", response.data);
                return response.data; // Return the fetched team data
            }
        } catch (error) {
            console.error("Error fetching team data:", error);
        }

    }

    const addPlayerToTeam = async (teamId, newPlayer) => {
        console.log("Adding player",newPlayer," to team ",teamId)
        try {
            const response = await axios.post(`${server}/api/teams/${teamId}/players`, newPlayer);
            if(response.status === 201) {
                console.log("Player added successfully:", response.data);
                return response.data; // Return the added player data
            }
        } catch (error) {
            console.error("Error adding player to team:", error);
        }
    }

  return {getTournamentTeams, createTeam, getTeamData, addPlayerToTeam,getTournamentUnassignedTeams}
}

export default useTeams
