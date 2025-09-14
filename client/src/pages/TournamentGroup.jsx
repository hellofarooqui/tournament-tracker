import React from "react";
import useGroups from "../hooks/useGroups";
import { useParams } from "react-router";
import { useEffect } from "react";
import { Plus } from "lucide-react";
import useTournamnet from "../hooks/useTournamnet";
import useTeams from "../hooks/useTeams";

const TournamentGroup = () => {
    const params = useParams();
    const tournamentId = params.id;
    const groupId = params.groupId;

    const [groupData, setGroupData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    const [showTeamsList, setShowTeamsList] = React.useState(false);
    const [tournamentTeams, setTournamentTeams] = React.useState([]);
    const [unassignedTeams, setUnassignedTeams] = React.useState([]);
    const [updatedMembers, setUpdatedMembers] = React.useState([]);

    const [remainingTeams, setRemainingTeams] = React.useState([]);

    const { getGroupData, addGroupMembers } = useGroups();
    const { getTournamentTeams,getTournamentUnassignedTeams } = useTeams();

    //  const fetchGroupData = async () => {
    //         setLoading(true);
    //         try {
    //             const data = await getGroupData(tournamentId, groupId);
    //             if (data) {
    //                 console.log("Group data fetched successfully:", data);
    //                 setGroupData(data);
    //                 setUpdatedMembers([...updatedMembers, ...data.teams.map(team => team._id)]);
    //             } else {
    //                 console.error("Group data not found");
    //             }
    //         } catch (error) {
    //             console.error("Error fetching group data:", error);
    //             setError(error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    // const fetchTournamentTeams = async () => {
    //     try {
    //         const teams = await getTournamentTeams(tournamentId);
    //         if (teams) {
    //             console.log("Tournament teams fetched successfully:", teams);
    //             setTournamentTeams(teams);
    //         }
    //     } catch (error) {
    //         console.error("Error fetching tournament teams:", error);
    //     }
    // }

    // useEffect(() => {

    //     fetchTournamentTeams();
    //     fetchGroupData();
    // }, [tournamentId, groupId]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [teams, group] = await Promise.all([
                    getTournamentUnassignedTeams(tournamentId),
                    getGroupData(tournamentId, groupId)
                ]);
                console.log("Teams", teams)
                setUnassignedTeams(teams);
                setGroupData(group);

                // Find teams not in the group
                const groupTeamIds = group.teams.map(team => team._id);
                const otherTeams = teams.filter(team => !groupTeamIds.includes(team._id));
                setRemainingTeams(otherTeams);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [tournamentId, groupId]);

    const handleCheckBoxChange = (teamId) => (e) => {
        const isChecked = e.target.checked;
        if (isChecked) {
            // Add team to updatedMembers
            setUpdatedMembers(prev => [...prev, teamId]);
        } else {
            // Remove team from updatedMembers
            setUpdatedMembers(prev => prev.filter(id => id !== teamId));
        }

        // Update remainingTeams to reflect the checkbox state
        setRemainingTeams(prev =>
            prev.map(team =>
                team._id === teamId ? { ...team, checked: isChecked } : team
            )
        );
    }

    const handleAddTeamsToGroup = async () => {
        try {
            console.log("Adding teams to group:", updatedMembers);
            const response = await addGroupMembers(groupId, { teamIds: updatedMembers });
            if (response) {
                console.log("Teams added to group successfully:", response);
                // Refresh group data to reflect the newly added teams
                const updatedGroup = await getGroupData(tournamentId, groupId);
                setGroupData(updatedGroup);

                // Update remainingTeams to remove the newly added teams
                const updatedGroupTeamIds = updatedGroup.teams.map(team => team._id);
                const otherTeams = tournamentTeams.filter(team => !updatedGroupTeamIds.includes(team._id));
                setRemainingTeams(otherTeams);

                // Clear updatedMembers after successful addition
                setUpdatedMembers([]);
                setShowTeamsList(false);
            } else {
                console.error("Failed to add teams to group");
            }
        }
        catch (error) {
            console.error("Error adding teams to group:", error);
        }
    }

    if (loading) {
        return (
            <div className="flex teams-center justify-center h-full">
                <div className="animate-spin h-8 w-8 text-yellow-500">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full h-screen flex teams-center justify-center py-16 font-dynapuff">
                <div className="text-red-500">Error fetching group data: {error.message}</div>
            </div>
        );
    }

    if (!groupData) {
        return (
            <div className="w-full h-screen flex teams-center justify-center py-16 font-dynapuff">
                <div className="text-gray-500">No group data available</div>
            </div>
        );
    }

    return (
        <div className="w-screen h-screen fixed flex  py-16">
            <div className="w-full h-full bg-neutral-100 rounded-t-[20px] mx-auto flex flex-col gap-y-4 text-xl font-semibold text-slate-200 p-6  overflow-y-scroll">

                <p className="text-stone-200 text-2xl font-semibold w-full bg-gradient-to-br from-stone-950 via-stone-900 to-stone-800 rounded-[20px] p-4">{groupData.name}</p>
                {groupData && groupData.teams && groupData.teams.length > 0 ? (
                    <div className="flex flex-col gap-y-4">
                        {groupData.teams.map((team) => (
                            <div
                                key={team._id}
                                className="w-full bg-white rounded-[20px] p-4 shadow-md"
                            >
                                <p className="text-stone-600">{team.name}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="mt-4 bg-white text-stone-500 text-sm p-4 rounded-[10px] font-thin">
                        No teams in this group
                    </p>
                )}
                <button
                    onClick={() => setShowTeamsList(prev => !prev)}
                    className="fixed bottom-20 right-6 z-20 text-sm bg-neutral-700 text-neutral-100 px-2 py-2 rounded-full"
                >
                    <Plus size={28} className={`${showTeamsList ? "rotate-135 " : "rotate-360"} transition-transform ease-in-out duration-200`} />
                </button>

                {showTeamsList && (
                    <div className="bg-white p-4 rounded-[20px] shadow-md">
                        <ul>
                            {unassignedTeams.map(team => (
                                <li key={team._id} className="mb-4">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            onChange={handleCheckBoxChange(team.team._id)}
                                        />
                                        <span className="text-stone-600" style={{
                                            marginLeft: '10px',
                                            
                                        }}>
                                            {team.team.name}
                                        </span>
                                    </label>
                                </li>
                            ))}

                        </ul>
                        <div>
                            <button
                                onClick={(handleAddTeamsToGroup)}
                                className="bg-stone-800 text-stone-200 px-4 py-2 rounded-full text-sm"
                            >
                                Save
                            </button>
                                    
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default TournamentGroup;
