import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import usePolls from "../hooks/usePolls";
import { BadgeCheck, Loader2 } from "lucide-react";

const PollResults = () => {
  const [pollResults, setPollResults] = useState(null);
  const { getPollResults } = usePolls();
  const [loading, setLoading] = useState(true);

  const fetchElectionResults = async () => {
    try {
      setLoading(true);
      const response = await getPollResults("68c871f4b44f1f9dcefd0683");

      if (response) {
        console.log("Election Results:", response);
        setPollResults(response);
      }
    } catch (error) {
      console.error("Error fetching election results:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchElectionResults();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        {" "}
        <Loader2 className="text-stone-700 animate-spin" size={32} />
      </div>
    );
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl text-stone-700 font-semibold">
        {pollResults.title} Poll Results
      </h2>

      <div className="w-full flex  p-2 px-6 bg-stone-600 rounded-t-[10px] mt-4">
        <p className="flex-1 text-stone-100 ">Member</p>
        <p className="text-center text-stone-100 w-20">Votes</p>
      </div>
      <div className="w-full p-4 px-6 bg-white flex flex-col gap-y-2">
        {pollResults.nominations
          .sort((a, b) => b.votes - a.votes)
          .map((nomine) => (
            <div
              key={nomine.user._id}
              className={`flex text-stone-500 py-1 px-2 rounded-[5px] text-lg ${
                pollResults.voters.some((voter) => voter._id == nomine.user._id)
                  ? "bg-emerald-50 text-stone-600"
                  : ""
              }`}
            >
              <p className="flex-1">
                {nomine.user.firstName} {nomine.user.lastName}
              </p>
              <p className="w-20 text-center">{nomine.votes}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PollResults;
