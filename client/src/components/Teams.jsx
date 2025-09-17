import React, { use, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import useTeams from "../hooks/useTeams";
import { Loader2, Pencil } from "lucide-react";
import TournamentTeamCard from "./TournamentTeamCard";
import { AuthContext } from "../context/AuthContext";
import { useState } from "react";
import useGroups from "../hooks/useGroups";
import useTournamnet from "../hooks/useTournamnet";

const Teams = () => {
  const { token } = useContext(AuthContext);
  const params = useParams();
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [groups, setGroups] = useState([]);
  const [tournamentFormat, setTournamentFormat] = useState(null);

  const [newGroup, setNewGroup] = useState({ name: "" });

  const [teamsLoading, setTeamsLoading] = useState(true);
  const [teamsError, setTeamsError] = useState(null);

  const [groupLoading, setGrouploading] = useState(true);
  const [groupError, setGroupError] = useState(null);

  const [addLoading, setAddloading] = useState(false);

  const [showAddTeamModal, setShowAddTeamModal] = useState(false);
  const [showAddGroupModal, setShowAddGroupModal] = useState(false);

  const { getTournamentTeams, createTeam } = useTeams();
  const { createGroup, getTournamentGroups } = useGroups();
  const { getTournamentFormat } = useTournamnet()
  const tournamentId = params.id;

  const fetchTeams = async () => {
    try {
      const teamsFetched = await getTournamentTeams(tournamentId);
      if (teamsFetched) {
        console.log("Teams fetched successfully:", teamsFetched);
        setTeams(teamsFetched);
      }
    } catch (error) {
      console.error("Error fetching teams:", error);
    } finally {
      setTeamsLoading(false);
    }
  };

  const fetchGroups = async () => {
    try {
      const groupsFetched = await getTournamentGroups(tournamentId);
      if (groups) {
        console.log("Groups fetched successfully:", groupsFetched);
        setGroups(groupsFetched);
      }
    } catch (error) {
      console.error("Error fetching groups:", error);
    } finally {
      setGrouploading(false);
    }
  };

  const fetchTournamentFormat = async () => {
    try {
      const format = await getTournamentFormat(tournamentId);
      if (format) {
        //console.log("Tournament format fetched successfully:", format);
        setTournamentFormat(format);
      }
    } catch (error) {
      console.error("Error fetching tournament format:", error);
    }
  };

  useEffect(() => {
    fetchTournamentFormat();
  }, [tournamentId]);

  const handleAddGroup = async (e) => {
    e.preventDefault();
    setAddloading(true);
    try {
      const createdGroup = await createGroup(tournamentId, newGroup);
    } catch (error) {
      console.error("Error creating group:", error);
    } finally {
      setShowAddGroupModal(false);
      setAddloading(false);
      setNewGroup({ name: "" });
    }
    // fetchTeams();
  };

  useEffect(() => {
    setTeamsLoading(true);
    fetchTeams();
    fetchGroups();
  }, []);

  if (teamsLoading) {
    return (
      <div className="w-full flex items-center justify-center py-16 font-dynapuff">
        <div className="flex flex-col gap-y-4 text-xl font-semibold text-light-brown-03">
          <Loader2 className="animate-spin" size={40} />
        </div>
      </div>
    );
  }

  if (teamsError) {
    return (
      <div className="w-full flex items-center justify-center py-16 font-dynapuff">
        <div className="flex flex-col gap-y-4 text-xl font-semibold text-light-brown-03">
          Error
        </div>
      </div>
    );
  }

  return (
    <div className="w-full font-dynapuff">
      <div className="mb-6">
        {(tournamentFormat && tournamentFormat.name == "League") && (<div>
          <div className="flex justify-between items-center pb-2">
            <h2 className="text-2xl text-stone-700">Groups</h2>
            {token && (
              <button
                onClick={() => setShowAddGroupModal(prev => !prev)}
                className="bg-stone-200  text-stone-500 px-6 py-2 rounded-full text-sm"
              >
                Add
              </button>
            )}
          </div>
          {groups && groups.length > 0 ? (
            <div className="flex flex-col gap-y-4">
              {groups.map((group) => (
                <div
                  key={group._id}
                  className=" bg-white border border-stone-200 rounded-[15px]"
                >
                  <div className="flex justify-between items-center px-4 py-1 rounded-t-[10px] bg-light-main-blue">
                    <p className="text-lg font-semibold text-white mb-2">
                      {group.name}
                    </p>
                    <Pencil className="text-white" onClick={() => navigate(`group/${group._id}`)} size={16} />
                  </div>
                  {group.teams.length > 0 && (
                    <div className="mt-2 flex flex-col gap-2 p-2">
                      {group.teams.map((team) => (
                        <span
                          key={team._id}
                          className=" text-stone-600 px-3 py-1 rounded-md text-base"
                        >
                          {team.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : <p className="text-sm font-thin italic text-stone-700">No Groups Found</p>}
        </div>)}
        {showAddGroupModal && (
          <div className="w-screen h-screen fixed top-0 left-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center px-6">
            <div className="bg-white rounded-[20px] p-6 w-[400px]">
              <h2 className="text-xl font-bold mb-4 text-stone-700">
                Add Group
              </h2>
              <form onSubmit={handleAddGroup} className="flex flex-col gap-y-4">
                <input
                  type="text"
                  placeholder="Group Name"
                  className="w-full border border-stone-300 rounded-[10px] px-4 py-2 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-stone-400"
                  value={newGroup.name}
                  onChange={(e) => setNewGroup({ name: e.target.value })}
                  required
                />
                <div className="flex justify-end gap-x-4">
                  <button
                    type="button"
                    onClick={() => setShowAddGroupModal(false)}
                    className="bg-stone-200 text-stone-500 px-4 py-2 rounded-full text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-yellow-500 text-white px-4 py-2 rounded-full text-sm"
                  >
                    {addLoading ? <Loader2 className="animate-spin" size={16} /> : "Add"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <div className="w-full flex flex-col gap-y-4 text-xl font-semibold text-light-brown-03 py-2">
        <div className="flex justify-between items-center pb-2">
          <h2 className="text-2xl text-stone-700">Teams</h2>
          {token && (
            <button
              onClick={() => navigate(`newTeam`)}
              className="bg-light-main-blue  text-white px-6 py-2 rounded-full text-sm"
            >
              Add
            </button>
          )}
        </div>
        {teams.length < 1 ? (
          <p>No Teams Found</p>
        ) : (
          <div className="flex flex-col gap-y-4 pb-6">
            {teams.map((entry) => (
              <TournamentTeamCard key={entry._id} team={entry.team} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Teams;