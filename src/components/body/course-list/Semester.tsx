import React, { useState } from "react";
import { SemesterType, UserCourse, YearType } from "../../commonTypes";
import CourseComponent from "./CourseComponent";
import { useDispatch } from "react-redux";
import { updateSearchStatus, updateSearchTime } from "../../slices/searchSlice";
import { ReactComponent as AddSvg } from "../../svg/add.svg";

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
    <div className="mb-4">
      <div
        className="flex flex-col w-semesterheading h-8 text-white font-medium bg-secondary rounded-xl"
        onClick={displayCourses}
      >
        <div className="flex flex-row items-center justify-between px-2 py-1">
          <div className="w-auto h-auto">
            {semesterName === "fall"
              ? "Fall"
              : semesterName === "intersession"
              ? "Intersession"
              : semesterName === "spring"
              ? "Spring"
              : "Summer"}{" "}
            ({courses.length}){" "}
          </div>
          {/* <div
            className="flex flex-row items-center justify-center w-6 h-6"
            onClick={addCourse}
          >
            <AddSvg className="w-full h-full" />
          </div> */}
        </div>
      </div>
      {display ? (
        <>
          <div>
            {courses.map((course) => (
              <CourseComponent
                course={course}
                detailName={detailName}
                setDetailName={setDetailName}
              />
            ))}
          </div>
          <div
            className="bg-coursecard flex flex-col mt-4 p-4 w-semesterheading h-auto border-2 border-dashed rounded-2xl"
            onClick={addCourse}
          >
            <div className="items-center justify-center h-6">
              <AddSvg className="w-full h-full" />
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default Semester;
