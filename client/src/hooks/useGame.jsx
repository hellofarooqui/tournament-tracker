import React from 'react'
import axios from 'axios'

const server = import.meta.env.VITE_SERVER_URL;

const useGame = () => {
  const createGame = async (tournamentId, gameData) => {
    try {
      const response = await axios.post(`${server}/api/tournaments/${tournamentId}/games`, gameData);
      return response.data;
    } catch (error) {
      console.error("Error creating game:", error);
      throw error;
    }
  }

  const getGames = async (tournamentId) => {
    try {
      const response = await axios.get(`${server}/api/tournaments/${tournamentId}/games`);
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error("Error fetching games:", error);
      throw error;
    }
  }

  const updateWinner = async (gameId, winnerId) => {
    try {
      const response = await axios.patch(`${server}/api/games/${gameId}`, { winnerId });
      return response.data;
    } catch (error) {
      console.error("Error updating game winner:", error);
      throw error;
    }
  }

  return {createGame, getGames,updateWinner}
}

export default useGame
