import React from "react";
import axios from "axios";

const server = import.meta.env.VITE_SERVER_URL;

const useGroups = () => {
  const getTournamentGroups = async (tournamentId) => {
    try {
      const response = await axios.get(
        `${server}/api/tournaments/${tournamentId}/groups`
      );
      if (response.status === 200) {
        //console.log("Groups fetched successfully:", response.data);
        return response.data; // Return the fetched groups
      }
    } catch (error) {
      console.error("Error fetching tournament groups:", error);
    }
  };

  const createGroup = async (tournamentId, groupData) => {
    try {
      console.log("Creating group with data:", groupData);
      const response = await axios.post(
        `${server}/api/tournaments/${tournamentId}/groups`,
        groupData
      );
      if (response.status === 201) {
        console.log("Group created successfully:", response.data);
        return response.data; // Return the created group
      }
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };

  const getGroupData = async (tournamentId ,groupId) => {
    try {
      const response = await axios.get(`${server}/api/tournaments/${tournamentId}/groups/${groupId}`);
        if (response.status === 200) {
            console.log("Group data fetched successfully:", response.data);
            return response.data; // Return the fetched group data
        }
    } catch (error) {
        console.error("Error fetching group data:", error);
    }
  }

  return { getTournamentGroups, createGroup, getGroupData };
};

export default useGroups;
