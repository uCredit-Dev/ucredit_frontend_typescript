import React, { useState, useEffect } from "react";
import CourseBar from "./CourseBar";
import CourseList from "./course-list/CourseList";
import { Distribution } from "../commonTypes";
import { testMajorDistributions, testUser } from "../testObjs";
import Search from "./course-search/Search";
import { selectSearchStatus } from "../slices/searchSlice";
import { useSelector } from "react-redux";
import InfoCard from "./InfoCard";

function Content() {
  const [userName, setUserName] = useState<string>("");
  const [majorCredits, setMajorCredits] = useState<number>(0);
  const [distributions, setDistributions] = useState<Distribution[]>([]);
  const searching = useSelector(selectSearchStatus);

  // On first render, gets user name, total credits, and distributions.
  useEffect(() => {
    setUserName(testUser.firstName + " " + testUser.lastName);
    setMajorCredits(127);
    getDistributions();
  }, []);

  // Sets all distributions for distribution bars.
  const getDistributions = () => {
    setDistributions(testMajorDistributions);
  };

  return (
    <div className="flex flex-row mt-content w-full h-auto">
      <div className="w-courselist flex flex-col mr-4 h-auto">
        <InfoCard />
        <CourseList />
      </div>
      <div className="bg-gray-coursebars h-coursebars w-courebars flex-grow mx-8 p-8 border-2 rounded-xl">
        {distributions.map((dis, index) =>
          index !== 0 ? (
            <CourseBar
              majorCredits={majorCredits}
              maxCredits={dis.required}
              plannedCredits={dis.planned}
              currentCredits={dis.current}
              section={dis.name}
            />
          ) : null
        )}
      </div>
      {searching ? <Search /> : null}
    </div>
  );
}

export default Content;
