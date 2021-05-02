import React from "react";
import Year from "./Year";
import { useSelector } from "react-redux";
import { selectPlan } from "../../slices/userSlice";

function CourseList() {
  // Setting up redux
  const currentPlan = useSelector(selectPlan);

  const freshmanCourseIDs = currentPlan.freshman;
  const sophomoreCourseIDs = currentPlan.sophomore;
  const juniorCourseIDs = currentPlan.junior;
  const seniorCourseIDs = currentPlan.senior;

  return (
    <>
      {/* <div className="flex flex-col h-auto overflow-y-auto"> */}
      {/* <div className='fixed z-10 left-0 medium:left-48 medium:right-blurr right-blurrsm block flex-none h-5 bg-gradient-to-b from-background pointer-events-none'></div> */}
      <div className="flex flex-row flex-wrap justify-between thin:justify-center mt-4 h-auto">
        <Year yearName={"Freshman"} courseIDs={freshmanCourseIDs} />
        <Year yearName={"Sophomore"} courseIDs={sophomoreCourseIDs} />
        <Year yearName={"Junior"} courseIDs={juniorCourseIDs} />
        <Year yearName={"Senior"} courseIDs={seniorCourseIDs} />
      </div>
      {/* </div> */}
    </>
  );
}

export default CourseList;
