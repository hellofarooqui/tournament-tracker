import React from "react";
import useGroups from "../hooks/useGroups";
import { useParams } from "react-router";
import { useEffect } from "react";

const TournamentGroup = () => {
    const params = useParams();
    const tournamentId = params.id;
    const groupId = params.groupId;

    const [groupData, setGroupData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    
    const { getGroupData } = useGroups();

    useEffect(() => {
        const fetchGroupData = async () => {
            setLoading(true);
            try {
                const data = await getGroupData(tournamentId, groupId);
                if (data) {
                    console.log("Group data fetched successfully:", data);
                    setGroupData(data);
                } else {
                    console.error("Group data not found");
                }
            } catch (error) {
                console.error("Error fetching group data:", error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchGroupData();
    }, [tournamentId, groupId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="animate-spin h-8 w-8 text-yellow-500">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full h-screen flex items-center justify-center py-16 font-dynapuff">
                <div className="text-red-500">Error fetching group data: {error.message}</div>
            </div>
        );
    }

    if (!groupData) {
        return (
            <div className="w-full h-screen flex items-center justify-center py-16 font-dynapuff">
                <div className="text-gray-500">No group data available</div>
            </div>
        );
    }   

  return (
    <div className="w-screen h-screen fixed flex  py-16">
      <div className="w-full h-full bg-neutral-100 rounded-t-[20px] mx-auto flex flex-col gap-y-4 text-xl font-semibold text-slate-200 p-6  overflow-y-scroll">
        <p className="text-stone-200 text-2xl font-semibold w-full bg-gradient-to-br from-stone-950 via-stone-900 to-stone-800 rounded-[20px] p-4">{groupData.name}</p>
      </div>
    </div>
  );
};

export default TournamentGroup;
