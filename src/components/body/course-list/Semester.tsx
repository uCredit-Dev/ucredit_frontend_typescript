import React, { useState, useEffect } from "react";
import { SemesterType, UserCourse, YearType } from "../../commonTypes";
import CourseComponent from "./CourseComponent";
import { useDispatch } from "react-redux";
import { updateSearchStatus, updateSearchTime } from "../../slices/searchSlice";
import { ReactComponent as AddSvg } from "../../svg/add.svg";
import ReactTooltip from "react-tooltip";

type semesterProps = {
  semesterName: SemesterType;
  semesterYear: YearType;
  courses: UserCourse[];
};

// Dropdown of all courses in a semester.
function Semester({ semesterName, semesterYear, courses }: semesterProps) {
  // Total credits and sorted courses.
  const [totalCredits, setTotalCredits] = useState<number>(0);
  const [semesterCourses, setSemesterCourses] = useState<UserCourse[]>([]);
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
  }, [courses]);

  // Redux setup
  const dispatch = useDispatch();

  // State used to control whether dropdown is opened or closed
  const [display, setDisplay] = useState<boolean>(true);

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
    <div className='mb-3 w-full h-auto'>
      <div className='flex flex-col w-full h-8 text-white font-medium bg-secondary rounded shadow'>
        <div className='flex flex-row items-center justify-between px-2 py-1'>
          <div
            className='flex flex-row items-center w-full h-auto select-none'
            onClick={displayCourses}>
            <ReactTooltip html={true} />
            {semesterName === "fall"
              ? "Fall"
              : semesterName === "intersession"
              ? "Intersession"
              : semesterName === "spring"
              ? "Spring"
              : "Summer"}{" "}
            {/* ({courses.length}) - {totalCredits} Credits */}
            <div
              className='flex flex-row items-center justify-center ml-1 px-1 w-4 h-4 text-black text-xs bg-white rounded'
              data-tip={`${courses.length} courses`}>
              {courses.length}
            </div>
            <div
              className='flex flex-row items-center justify-center ml-1 px-1 w-4 h-4 text-black text-xs bg-white rounded'
              data-tip={`${totalCredits} credits`}>
              {totalCredits}
            </div>
          </div>
          <div
            className='flex flex-row items-center justify-center w-6 h-6'
            onClick={addCourse}>
            <AddSvg className='w-full h-full stroke-2' />
          </div>
        </div>
      </div>
      {display ? (
        <>
          <div>
            {semesterCourses.map((course) => (
              <CourseComponent
                year={semesterYear}
                course={course}
                semester={semesterName}
              />
            ))}
          </div>
          {/* <div
            className="bg-coursecard flex flex-col mt-4 p-4 w-semesterheading h-auto border-2 border-dashed rounded-2xl"
            onClick={addCourse}
          >
            <div className="items-center justify-center h-6">
              <AddSvg className="w-full h-full" />
            </div>
          </div> */}
        </>
      ) : null}
    </div>
  );
}

export default Semester;
