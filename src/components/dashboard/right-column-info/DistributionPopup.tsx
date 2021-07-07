import React, { useState } from 'react';
import { requirements, checkRequirementSatisfied, splitRequirements } from './distributionFunctions';
import { useSelector } from 'react-redux';
import { selectCurrentPlanCourses, } from "../../../slices/currentPlanSlice";
import { selectAllCourses } from "../../../slices/userSlice";
import { getCourse } from '../../../resources/assets';
import { UserCourse } from '../../../resources/commonTypes';

import { ReactComponent as Plus } from "../../../resources/svg/Add.svg";
import { ReactComponent as Minus } from "../../../resources/svg/Close.svg";


type DistributionPopupType = {
  distribution: requirements;
  cleanup: () => void;
  save: (s: string[]) => void;
  flipped: string[];
}

function DistributionPopup({
  distribution,
  cleanup,
  save,
  flipped
} : DistributionPopupType) {
  const allCourses = useSelector(selectAllCourses);
  const currPlanCourses = useSelector(selectCurrentPlanCourses);
  const courses = useSelector(selectCurrentPlanCourses);

  const [flippedArr, setFlippedArr] = useState(flipped);

  const satisfies = (course: UserCourse):boolean => {
    const courseObj = getCourse(course.number, allCourses, currPlanCourses);
    if (
      courseObj != null && checkRequirementSatisfied(
        splitRequirements(distribution.expr),
        courseObj
      )
    ) {
      return !flippedArr.includes(course.number);
    }
    return flippedArr.includes(course.number);
  }

  const flip = (course: UserCourse) => {
    var flippedSlice = flippedArr.slice();
    if (flippedSlice.includes(course.number)) {
      flippedSlice.splice(flippedSlice.indexOf(course.number), 1);
    } else {
      flippedSlice.push(course.number);
    }
    setFlippedArr(flippedSlice);
  }

  const onSaveClick = (flipped: string[]) => {
    save(flipped);
    cleanup();
  }

  return (
  <div className="fixed inset-1/2 w-96 h-80 overflow-auto transform -translate-x-2/4 -translate-y-1/2">
    <div className="text-center font-bold bg-gray-50 shadow rounded-t-lg pb-3">
      <h1 >{distribution.name}</h1>
    </div>
    {courses.map((course) => {
      return (
        <div className="flex block h-7 bg-gray-50 pl-3">
          {satisfies(course) ? 
            <Minus className="transform hover:scale-150 transition duration-200 ease-in" onClick={() => flip(course)}/> 
            : <Plus className="transform hover:scale-150 transition duration-200 ease-in"onClick={() => flip(course)} />
          }
          <div className="text-lg">
            {course.title}
          </div>
        </div>
      )
    })}
    <div className="flex justify-evenly bg-gray-50 p-2 shadow-md rounded-b-lg pt-5">
      <div className="bg-red-300 p-2 transform hover:scale-105 transition duration-200 ease-in rounded-lg" onClick={cleanup}>
        Cancel
      </div>
      <div className="bg-green-300 p-2 transform hover:scale-105 transition duration-200 ease-in rounded-lg" onClick={() => onSaveClick(flippedArr)}>
        Save
      </div>
    </div>
  </div>)
}

export default DistributionPopup;