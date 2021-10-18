import { FC, useState } from "react";
import {
  requirements,
  // checkRequirementSatisfied,
  // splitRequirements,
} from "./distributionFunctions";
// import { useSelector } from "react-redux";
// import { selectCurrentPlanCourses } from "../../../slices/currentPlanSlice";
// import { selectCourseCache } from "../../../slices/userSlice";
// import { getCourse } from "../../../resources/assets";
// import { UserCourse } from "../../../resources/commonTypes";

// import { ReactComponent as Plus } from "../../../resources/svg/Add.svg";
// import { ReactComponent as Minus } from "../../../resources/svg/Close.svg";

/**
 * TODO: FEATURE TO OVERRIDE DISTRIBUTIONS ON PAUSE. MAY BE DEPRECATED IN THE FUTURE.
 */
const DistributionPopup: FC<{
  distribution: requirements;
  cleanup: () => void;
  save: (s: string[]) => void;
  flipped: string[];
}> = ({ distribution, cleanup, save, flipped }) => {
  // const courseCache = useSelector(selectCourseCache);
  // const currPlanCourses = useSelector(selectCurrentPlanCourses);
  // const courses = useSelector(selectCurrentPlanCourses);

  const [flippedArr, setFlippedArr] = useState(flipped);

  // const satisfies = (course: UserCourse): Promise<boolean> => {
  //   return new Promise(() => {
  //     getCourse(course.number, courseCache, currPlanCourses).then(
  //       (courseObj) => {
  //         if (
  //           courseObj != null &&
  //           checkRequirementSatisfied(
  //             splitRequirements(distribution.expr),
  //             courseObj
  //           )
  //         ) {
  //           return !flippedArr.includes(course.number);
  //         }
  //         return flippedArr.includes(course.number);
  //       }
  //     );
  //   });
  // };

  // const flip = (course: UserCourse) => {
  //   let flippedSlice = flippedArr.slice();
  //   if (flippedSlice.includes(course.number)) {
  //     flippedSlice.splice(flippedSlice.indexOf(course.number), 1);
  //   } else {
  //     flippedSlice.push(course.number);
  //   }
  //   setFlippedArr(flippedSlice);
  // };

  const onSaveClick = (flipped: string[]) => {
    save(flipped);
    cleanup();
  };

  const onResetClick = () => {
    setFlippedArr([]);
  };

  return (
    <div className="fixed inset-1/2 w-96 h-80 overflow-auto transform -translate-x-2/4 -translate-y-1/2">
      <div className="p-3 text-center font-bold bg-gray-50 rounded-t-lg shadow">
        <h1>{distribution.name}</h1>
      </div>
      {/* {courses.map((course) => {
        return (
          <div className="block flex pl-3 h-7 bg-gray-50">
            {satisfies(course) ? (
              <Minus
                className="transform hover:scale-150 transition duration-200 ease-in"
                onClick={() => flip(course)}
              />
            ) : (
              <Plus
                className="transform hover:scale-150 transition duration-200 ease-in"
                onClick={() => flip(course)}
              />
            )}
            <div className="text-lg">{course.title}</div>
          </div>
        );
      })} */}
      <div className="flex justify-evenly p-2 pb-3 pt-5 bg-gray-50 rounded-b-lg shadow-md">
        <div
          className="p-2 bg-red-500 rounded-lg transform hover:scale-105 transition duration-200 ease-in"
          onClick={() => onResetClick()}
        >
          Reset
        </div>
        <div
          className="p-2 bg-red-300 rounded-lg transform hover:scale-105 transition duration-200 ease-in"
          onClick={cleanup}
        >
          Cancel
        </div>
        <div
          className="p-2 bg-green-300 rounded-lg transform hover:scale-105 transition duration-200 ease-in"
          onClick={() => onSaveClick(flippedArr)}
        >
          Save
        </div>
      </div>
    </div>
  );
};

export default DistributionPopup;
