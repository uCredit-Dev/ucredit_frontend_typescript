import React, { useState } from "react";
import { SemesterType, UserCourse, YearType } from "../../commonTypes";
import CourseComponent from "./CourseComponent";
import { useDispatch } from "react-redux";
import { updateSearchStatus, updateSearchTime } from "../../slices/searchSlice";

type semesterProps = {
  semesterName: SemesterType;
  semesterYear: YearType;
  courses: UserCourse[];
  detailName: string;
  setDetailName: Function;
};

// Dropdown of all courses in a semester.
function Semester({
  semesterName,
  semesterYear,
  courses,
  detailName,
  setDetailName,
}: semesterProps) {
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
    <>
      <div
        className='bg-gray-semester border-gray-semester flex flex-row align-middle pl-12 w-full h-8 font-normal border-b-4 border-solid'
        onClick={displayCourses}>
        <div className='top-1/2 flex flex-row items-center'>
          {semesterName} ({courses.length}){" "}
          <button onClick={addCourse}>+</button>
        </div>
      </div>
      {display ? (
        <div>
          {courses.map((course) => (
            <CourseComponent
              key={course.title}
              course={course}
              detailName={detailName}
              setDetailName={setDetailName}
            />
          ))}
        </div>
      ) : null}
    </>
  );
}

export default Semester;
