import React from 'react'
import axios from 'axios';

const server = import.meta.env.VITE_SERVER_URL;
const token = localStorage.getItem("token");

const useTournamnet = () => {
    // const [tournaments,setTournaments] = React.useState([]);

    const getAllTournaments = async () => {
        try {
            const response = await axios.get(`${server}/api/tournaments`);
            //setTournaments(response.data);
            if(response.status === 200) {
                //console.log("Tournaments fetched successfully:", response.data);
                return response.data; // Return the fetched tournaments
            }
           
        }
        catch (error) {
            console.error("Error fetching tournaments:", error);
        }
    }

    const getTournamentById = async (id) => {
        try {
            const response = await axios.get(`${server}/api/tournaments/${id}`);
            if(response.status === 200) {
                //console.log("Tournament fetched successfully:", response.data);
                return response.data; // Return the fetched tournament
            }
        } catch (error) {
            console.error("Error fetching tournament by ID:", error);
        }
    }

    const createTournament = async (tournamentData) => {
        console.log("Server URL:", server);
        console.log("Token:", token);

        try {
            console.log("Creating tournament with data:", tournamentData);
            const response = await axios.post(`${server}/api/tournaments`, tournamentData,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("Tournament created successfully:", response.data);
            if(response.status === 201) {
               return response.data;
            }
            else throw new Error("Failed to create tournament", response.status);
            //getAllTournaments(); // Refresh the list after creation
        } catch (error) {
            console.error("Error creating tournament:", error);
        }
    }

    const deleteTournament = async (id) => {
        try {
            const response = await axios.delete(`${server}/api/tournaments/${id}`);
            if(response.status === 200) {
                console.log("Tournament deleted successfully:", response.data);
                return response.data; // Return the deletion confirmation
            }
        } catch (error) {
            console.error("Error deleting tournament:", error);
        }
    }

    const enrollIntoTournament = async (tournamentId) => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.post(`${server}/api/tournaments/${tournamentId}/enroll`, {
                // No body needed for enrollment
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                console.log("Successfully enrolled into tournament:", response.data);
                return response.data;
            }
        } catch (error) {
            console.error("Error enrolling into tournament:", error);
        }
    }

    const getTournamentPlayers = async (tournamentId) => {
        try {
            const response = await axios.get(`${server}/api/tournaments/${tournamentId}/players`);
            if(response.status === 200) {
                console.log("Players fetched successfully:", response.data);
                return response.data; // Return the fetched players
            }
        } catch (error) {
            console.error("Error fetching tournament players:", error);
        }
    }

    const getTournamentFormats = async () => {
        try {
            const response = await axios.get(`${server}/api/tournaments/tournament-formats`);
            if(response.status === 200) {
                //console.log("Tournament formats fetched successfully:", response.data);
                return response.data; // Return the fetched formats
            }
        } catch (error) {
            console.error("Error fetching tournament formats:", error);
        }
    }

    const goLiveTournament = async (tournamentId) => {
        try {
            const response = await axios.put(`${server}/api/tournaments/${tournamentId}/go-live`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                console.log("Tournament is now live:", response.data);
                return response.data;
            }
        } catch (error) {
            console.error("Error setting tournament to live:", error);
        }
    }

    const getTournamentFormat = async (tournamentId) => {
        try {
            const response = await axios.get(`${server}/api/tournaments/${tournamentId}/tournament-format`);
            if(response.status === 200) {
                //console.log("Tournament types fetched successfully:", response.data);
                return response.data; // Return the fetched tournament types
            }
        } catch (error) {
            console.error("Error fetching tournament types:", error);
        }
    }

  return {
    getAllTournaments,
    createTournament,
    getTournamentById,
    getTournamentFormat,
    deleteTournament,
    enrollIntoTournament,
    getTournamentPlayers,
    getTournamentFormats,
    goLiveTournament
  };
}

export default useTournamnet
