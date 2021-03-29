import React, { useState } from "react";
import Year from "./Year";
import { useSelector } from "react-redux";
import { selectPlan } from "../../slices/userSlice";

function CourseList() {
  // Name of the course that is in the popout. This state is passed to the its children, where it will get updated.
  // This is done because we only want one popout at a time, and thus, it needs to be at the top level.
  const [detailName, setDetailName] = useState<string>("");

  // Setting up redux
  const currentPlan = useSelector(selectPlan);

  const freshmanCourseIDs = currentPlan.freshman;
  const sophomoreCourseIDs = currentPlan.sophomore;
  const juniorCourseIDs = currentPlan.junior;
  const seniorCourseIDs = currentPlan.senior;

  return (
    <div className="flex flex-col mx-8 w-full overflow-y-auto">
      <div className="flex flex-row justify-between w-full h-auto">
        <Year
          yearName={"Freshman"}
          courseIDs={freshmanCourseIDs}
          detailName={detailName}
          setDetailName={setDetailName}
        />
        <Year
          yearName={"Sophomore"}
          courseIDs={sophomoreCourseIDs}
          detailName={detailName}
          setDetailName={setDetailName}
        />
        <Year
          yearName={"Junior"}
          courseIDs={juniorCourseIDs}
          detailName={detailName}
          setDetailName={setDetailName}
        />
        <Year
          yearName={"Senior"}
          courseIDs={seniorCourseIDs}
          detailName={detailName}
          setDetailName={setDetailName}
        />
      </div>
    </div>
  );
}

export default CourseList;
