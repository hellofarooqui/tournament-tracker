import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import usePolls from "../hooks/usePolls";
import { BadgeCheck, Loader2 } from "lucide-react";
import titleCase from "../utils/titleCase";
import { NavbarContext } from "../context/NavbarContext";

const PollResults = () => {
  const { navbar, setNavbar } = useContext(NavbarContext)
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

  useEffect(() => {
    setNavbar({ ...navbar, pageTitle: pollResults?.title })
  }, [pollResults])

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        {" "}
        <Loader2 className="text-stone-700 animate-spin" size={32} />
      </div>
    );
  }

  return (
    <div className="w-full font-dynapuff">
      <h2 className="text-[20px] text-stone-700 font-semibold ">
        {pollResults.title} <br /><span className="text-[16px] font-thin text-light-text-dull-01">Poll Results</span>
      </h2>

      <div className="w-full grid grid-cols-[auto_60px]  p-2 px-4 bg-light-main-blue rounded-t-[10px] mt-4 text-[16px]">
        <p className=" text-stone-100 ">Member</p>
        <p className="text-center text-stone-100">Votes</p>
      </div>
      <div className="w-full bg-white flex flex-col shadow-md text-[16px]">
        {pollResults.nominations
          .sort((a, b) => b.votes - a.votes)
          .map((nomine, index) => (
            <div
              key={nomine.user._id}
              className={`grid grid-cols-[auto_60px]  text-stone-500 py-2 px-4   border-b last:border-0 border-light-text-dull-01/30 ${index < 3 ? "bg-blue-100 font-semibold" : "font-thin"}  `}
            >
              <p className="">
                {titleCase(nomine.user.firstName)} {titleCase(nomine.user.lastName)}
              </p>
              <p className="text-center">{nomine.votes}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PollResults;
