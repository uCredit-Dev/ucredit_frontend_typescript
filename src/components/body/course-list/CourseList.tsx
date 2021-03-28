import React, { useState } from "react";
import Year from "./Year";
import { useSelector } from "react-redux";
import { selectCurrentPlan } from "../../slices/planSlice";

function CourseList() {
  // Name of the course that is in the popout. This state is passed to the its children, where it will get updated.
  // This is done because we only want one popout at a time, and thus, it needs to be at the top level.
  const [detailName, setDetailName] = useState<string>("");

  // Setting up redux
  const currentPlan = useSelector(selectCurrentPlan);

  // Updating yearly course plans with currentPlan courses.
  const freshmanCourses = currentPlan.freshman;
  const sophomoreCourses = currentPlan.sophomore;
  const juniorCourses = currentPlan.junior;
  const seniorCourses = currentPlan.senior;

  return (
    <div className='flex flex-col mx-8 w-full overflow-y-auto'>
      <div className='flex flex-row justify-between w-full h-auto'>
        <Year
          yearName={"Freshman"}
          courses={freshmanCourses}
          detailName={detailName}
          setDetailName={setDetailName}
        />
        <Year
          yearName={"Sophomore"}
          courses={sophomoreCourses}
          detailName={detailName}
          setDetailName={setDetailName}
        />
        <Year
          yearName={"Junior"}
          courses={juniorCourses}
          detailName={detailName}
          setDetailName={setDetailName}
        />
        <Year
          yearName={"Senior"}
          courses={seniorCourses}
          detailName={detailName}
          setDetailName={setDetailName}
        />
      </div>
    </div>
  );
}

export default CourseList;
