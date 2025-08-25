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
        try {
            console.log("Creating tournament with data:", tournamentData);
            const response = await axios.post(`${server}/api/tournaments`, tournamentData);
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

  return {
    getAllTournaments,
    createTournament,
    getTournamentById,
    deleteTournament,
    enrollIntoTournament
  };
}

export default useTournamnet
