import React, { useState, useEffect } from "react";
import Semester from "./Semester";
import { UserCourse, YearType } from "../../commonTypes";

type semesterProps = {
  yearName: YearType;
  courses: UserCourse[];
  detailName: string;
  setDetailName: Function;
};

// Dropdown of all semesters and courses for each semester in a year.
function Year({ yearName, courses, detailName, setDetailName }: semesterProps) {
  const [fallCourses, setFallCourses] = useState<UserCourse[]>([]);
  const [springCourses, setSpringCourses] = useState<UserCourse[]>([]);
  const [winterCourses, setWinterCourses] = useState<UserCourse[]>([]);
  const [summerCourses, setSummerCourses] = useState<UserCourse[]>([]);
  const [display, setDisplay] = useState<boolean>(true);

  // TODO: Investigate issue here where duplicates of courses are added.
  // Note: This occurs when you save while changes for the filed is being listened for
  // This is because when we save, the site get rerendered, but states don't get cleared.
  // Thus, this useEffect gets run again, but the states haven't gotten refreshed so we get dupes.
  useEffect(() => {
    // For each of the user's courses for this year, put them in their respective semesters.
    courses.forEach((course) => {
      if (course.term.includes("Fall")) {
        setFallCourses([...fallCourses, course]);
      } else if (course.term.includes("Spring")) {
        setSpringCourses([...springCourses, course]);
      } else if (course.term.includes("Summer")) {
        setSummerCourses([...summerCourses, course]);
      } else if (course.term.includes("Winter")) {
        setWinterCourses([...winterCourses, course]);
      }
    });
  }, []);

  // Displays dropdown showing semester categories
  const displaySemesters = () => {
    setDisplay(!display);
  };

  return (
    <div className='w-year'>
      <div
        className='bg-gray-year border-gray-year flex flex-row pl-8 w-full h-8 border-b-4 border-solid'
        onClick={displaySemesters}>
        <div>{yearName}</div>
      </div>
      {display ? (
        <>
          <Semester
            semesterName={"Fall"}
            semesterYear={yearName}
            courses={fallCourses}
            detailName={detailName}
            setDetailName={setDetailName}
          />
          <Semester
            semesterName={"Spring"}
            semesterYear={yearName}
            courses={springCourses}
            detailName={detailName}
            setDetailName={setDetailName}
          />
          <Semester
            semesterName={"Winter"}
            semesterYear={yearName}
            courses={winterCourses}
            detailName={detailName}
            setDetailName={setDetailName}
          />
          <Semester
            semesterName={"Summer"}
            semesterYear={yearName}
            courses={summerCourses}
            detailName={detailName}
            setDetailName={setDetailName}
          />
        </>
      ) : null}
    </div>
  );
}

export default Year;
