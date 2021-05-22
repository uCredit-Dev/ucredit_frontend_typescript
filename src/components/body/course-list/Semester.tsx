import React, { useState, useEffect } from "react";
import { SemesterType, UserCourse, YearType } from "../../commonTypes";
import CourseComponent from "./CourseComponent";
import { useDispatch } from "react-redux";
import { updateSearchStatus, updateSearchTime } from "../../slices/searchSlice";
import { ReactComponent as AddSvg } from "../../svg/Add.svg";
import ReactTooltip from "react-tooltip";

type semesterProps = {
  customStyle: string;
  semesterName: SemesterType;
  semesterYear: YearType;
  courses: UserCourse[];
};

/* 
  A component displaying all the courses in a specific semester.
  Props:
    courses: courses it's displaying
    semesterYear: year this course is part of
    semesterName: semester this course is part of
*/
function Semester({
  customStyle,
  semesterName,
  semesterYear,
  courses,
}: semesterProps) {
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
    <div className={`${customStyle} mb-3 w-full h-auto`}>
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
            <div
              className='flex flex-row items-center justify-center ml-1 px-1 w-auto h-4 text-black text-xs bg-white rounded'
              data-tip={`${courses.length} courses`}>
              {courses.length}
            </div>
            <div
              className='flex flex-row items-center justify-center ml-1 px-1 w-auto h-4 text-black text-xs bg-white rounded'
              data-tip={`${totalCredits} credits`}>
              {totalCredits}
            </div>
          </div>
          <div
            className='flex flex-row items-center justify-center w-6 h-6'
            onClick={addCourse}>
            <AddSvg className='w-full h-full stroke-2 cursor-pointer' />
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
