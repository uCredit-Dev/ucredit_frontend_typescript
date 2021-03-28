import React, { useState, useEffect } from "react";
import Semester from "./Semester";
import { UserCourse, YearType } from "../../commonTypes";
import { ReactComponent as MoreSvg } from "../../svg/more.svg";

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
      } else if (course.term.includes("Intersession")) {
        setWinterCourses([...winterCourses, course]);
      }
    });
  }, []);

  // Displays dropdown showing semester categories
  const displaySemesters = () => {
    setDisplay(!display);
  };

  return (
    <div className='w-yearheading'>
      <div
        className='bg-primary h-yearheading flex flex-row justify-between mb-4 p-2 w-full text-white font-medium rounded-xl'
        onClick={displaySemesters}>
        <div>{yearName}</div>
        <MoreSvg className='w-6 h-6' />
      </div>
      {display ? (
        <div className='flex flex-col items-center'>
          <Semester
            semesterName='Fall'
            semesterYear={yearName}
            courses={fallCourses}
            detailName={detailName}
            setDetailName={setDetailName}
          />
          <Semester
            semesterName='Spring'
            semesterYear={yearName}
            courses={springCourses}
            detailName={detailName}
            setDetailName={setDetailName}
          />
          <Semester
            semesterName='Intersession'
            semesterYear={yearName}
            courses={winterCourses}
            detailName={detailName}
            setDetailName={setDetailName}
          />
          <Semester
            semesterName='Summer'
            semesterYear={yearName}
            courses={summerCourses}
            detailName={detailName}
            setDetailName={setDetailName}
          />
        </div>
      ) : null}
    </div>
  );
}

export default Year;
