import React, { useState, useEffect } from "react";
import { SemesterType, UserCourse } from "../../../resources/commonTypes";
import CourseComponent from "./CourseComponent";
import { useDispatch } from "react-redux";
import {
  updateSearchStatus,
  updateSearchTime,
} from "../../../slices/searchSlice";
import { ReactComponent as AddSvg } from "../../../resources/svg/Add.svg";
import ReactTooltip from "react-tooltip";

type semesterProps = {
  customStyle: string;
  semesterName: SemesterType;
  semesterYear: number;
  courses: UserCourse[];
};

/**
 * A component displaying all the courses in a specific semester.
 * @param courses - all the courses in the semester
 * @param semesterYear - year this semester is part of
 * @param semesterName - name of the semester
 * @param customStyle - custom styling for the semester
 */
function Semester({
  customStyle,
  semesterName,
  semesterYear,
  courses,
}: semesterProps) {
  // Redux setup
  const dispatch = useDispatch();

  // State used to control whether dropdown is opened or closed
  const [display, setDisplay] = useState<boolean>(true);
  // Total credits and sorted courses.
  const [totalCredits, setTotalCredits] = useState<number>(0);
  const [semesterCourses, setSemesterCourses] = useState<UserCourse[]>([]);

  // Every time any courses within this semester changes, update total credit count and the list.
  useEffect(() => {
    setSemesterCourses(
      courses.sort((course1, course2) =>
        course2.number.localeCompare(course1.number)
      )
    );
    let count = 0;
    courses.forEach((course) => {
      count += course.credits;
    });
    setTotalCredits(count);
  }, [courses, courses.length]);

  // Sets closed to open and open to closed for course display dropdown
  const displayCourses = () => {
    setDisplay(!display);
  };

  // Opens search popup to add new course.
  const addCourse = () => {
    dispatch(updateSearchStatus(true));
    dispatch(
      updateSearchTime({
        searchSemester: semesterName,
        searchYear: semesterYear,
      })
    );
  };

  return (
    <div
      className={`${customStyle} mb-3 w-full h-auto transform hover:scale-105 transition duration-200 ease-in`}
    >
      <ReactTooltip html={true} />
      <div className="flex flex-col w-full h-8 text-white font-medium bg-secondary rounded shadow">
        <div className="flex flex-row items-center justify-between px-2 py-1">
          <div
            className="flex flex-row items-center w-full h-auto select-none"
            onClick={displayCourses}
          >
            {semesterName === "Fall"
              ? "Fall"
              : semesterName === "Intersession"
              ? "Intersession"
              : semesterName === "Spring"
              ? "Spring"
              : "Summer"}{" "}
            {courses.length !== 0 && totalCredits !== 0 ? (
              <>
                {/* <div
                  className="flex flex-row items-center justify-center w-auto h-4 px-1 ml-1 text-xs text-black bg-white rounded"
                  data-tip={`${courses.length} courses`}
                >
                  {courses.length}
                </div> */}
                <div
                  className="flex flex-row items-center justify-center ml-1 px-1 w-auto text-black text-xs bg-white rounded transform hover:scale-125 transition duration-200 ease-in"
                  data-tip={`${totalCredits} Credits`}
                >
                  {totalCredits}
                </div>
              </>
            ) : null}
          </div>
          <div
            className="group flex flex-row items-center justify-center w-6 h-6 hover:bg-white rounded-md transition duration-100 ease-in"
            onClick={addCourse}
          >
            <AddSvg className="w-6 h-6 group-hover:text-black stroke-2" />
          </div>
        </div>
      </div>
      {display ? (
        <>
          <div>
            {semesterCourses.map((course) => (
              <div key={course._id}>
                <CourseComponent
                  year={semesterYear}
                  course={course}
                  semester={semesterName}
                />
              </div>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

export default Semester;
