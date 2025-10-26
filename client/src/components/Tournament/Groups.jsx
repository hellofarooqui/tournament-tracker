import React, { use, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useTournamnet from "../../hooks/useTournamnet";
import { AuthContext } from "../../context/AuthContext";
import useGroups from "../../hooks/useGroups";
import { EllipsisVertical, Pencil, Plus, User, Users } from "lucide-react";
import CustomModal from "../CustomModal";

const Groups = () => {
  const params = useParams();
  const tournamentId = params.id;

  const { createGroup, getTournamentGroups } = useGroups();

  const { user } = useContext(AuthContext);

  const { getTournamentFormat } = useTournamnet();

  const [groups, setGroups] = useState([]);
  const [groupLoading, setGrouploading] = useState(true);
  const [groupError, setGroupError] = useState(null);
  const [showGroupOptions, setShowGroupOptions] = useState(false);
  const [showGroupMembersModal, setShowGroupMembersModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [addLoading, setAddloading] = useState(false);

  const navigate = useNavigate();

  const [newGroup, setNewGroup] = useState({ name: "" });
  const [showAddGroupModal, setShowAddGroupModal] = useState(false);

  const [tournamentFormat, setTournamentFormat] = useState(null);

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

  const fetchGroups = async () => {
    try {
      const groupsFetched = await getTournamentGroups(tournamentId);
      if (groups) {
        console.log("Groups fetched successfully:", groupsFetched);
        setGroups(groupsFetched);
      }
    } catch (error) {
      console.error("Error fetching groups:", error);
      setGroupError(error);
    } finally {
      setGrouploading(false);
    }
  };

  const handleShowMembers = (viewGroup) => {
    setShowGroupMembersModal(true);
    setShowGroupOptions(false);
    setSelectedGroup(viewGroup);
  };

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
    fetchTournamentFormat();
    fetchGroups();
  }, [tournamentId]);

  return (
    <div className="mb-6 relative pb-8">
      {tournamentFormat && tournamentFormat.name == "League" && (
        <div>
          <div className="flex justify-between items-center pb-2">
            <h2 className="text-dark-white text-lg">Groups</h2>
            {user?.role == "root-admin" && (
              <button
                onClick={() => setShowAddGroupModal(true)}
                className="fixed bottom-20 right-6 z-20 text-sm bg-dark-gray text-dark-white/50 px-2 py-2 rounded-full"
              >
                <Plus size={28} />
              </button>
            )}
          </div>
          {groups?.length < 1 ? (
            <p className="text-sm font-thin italic text-stone-700">
              No Groups Found
            </p>
          ) : (
            <div className="flex flex-col gap-y-4">
              {groups.map((group) => (
                <div
                  key={group._id}
                  className="flex items-center gap-x-4 p-4  rounded-[10px] bg-dark-gray/50"
                >
                  <span className="bg-dark-blue/20 text-dark-blue p-4 rounded-lg">
                    <Users size={24} />
                  </span>
                  <div className="flex-1 flex justify-between items-center">
                    <div className="flex flex-col justify-start">
                      <p className="text-lg font-semibold text-dark-white/90 mb-2">
                        {group.name}
                      </p>
                      <p className="text-dark-white/50">
                        {group.teams.length} Teams
                      </p>
                    </div>

                    <div className="relative">
                      <EllipsisVertical
                        className="text-dark-white/50"
                        onClick={() => setShowGroupOptions((prev) => !prev)}
                        size={16}
                      />
                      {showGroupOptions && (
                        <div className="w-[140px] absolute top-0 right-4 bg-gray-800 rounded-[10px] shadow-lg p-1 flex flex-col gap-y-2">
                          <button
                            onClick={() => handleShowMembers(group)}
                            className="text-sm text-dark-white/60 hover:text-stone-900 flex items-center gap-x-2 p-2"
                          >
                            <Users size={16} />
                            View Members
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {showAddGroupModal && (
        <CustomModal>
          <div>
            <h2 className="text-xl font-bold mb-4 text-dark-white">
              Add Group
            </h2>
            <form onSubmit={handleAddGroup} className="flex flex-col gap-y-4">
              <input
                type="text"
                placeholder="Group Name"
                className="w-full border-2 border-dark-white/30 rounded-md px-4 py-2 text-dark-white focus:outline-none focus:ring-2 focus:ring-stone-400"
                value={newGroup.name}
                onChange={(e) => setNewGroup({ name: e.target.value })}
                required
              />
              <div className="flex flex-col justify-end gap-y-4">
                <button
                  type="submit"
                  className="bg-dark-blue text-white px-4 py-2 rounded-md text-base"
                >
                  {addLoading ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : (
                    "Add"
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddGroupModal(false)}
                  className="bg-dark-gray text-dark-white/50 px-4 py-2 rounded-md text-base"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </CustomModal>
      )}
      {showGroupMembersModal && (
        <CustomModal>
          <div className="flex justify-between items-center mb-2 ">
            <h2 className="text-dark-white text-lg">{selectedGroup.name}</h2>
            <span
              onClick={() => setShowGroupMembersModal(false)}
              className="bg-dark-gray text-dark-white/50 text-sm px-2 py-1 rounded-lg border-2 border-dark-white/10"
            >
              Close
            </span>
          </div>
          <div className="w-full flex flex-col gap-3">
            {selectedGroup.teams.map((team) => (
              <div className="flex items-center gap-x-2 bg-dark-gray p-2 rounded-[8px] text-dark-white/70">
                <span className="bg-gray-900 rounded- p-2 rounded-[8px]">
                  <User />
                </span>
                <p>{team.name}</p>
              </div>
            ))}
          </div>
        </CustomModal>
      )}
    </div>
  );
};

export default Groups;
