import React, { useState, useEffect } from "react";
import Semester from "./Semester";
import { UserCourse, YearType } from "../../commonTypes";
import { ReactComponent as MoreSvg } from "../../svg/More.svg";
import { useSelector } from "react-redux";
import { selectPlan } from "../../slices/currentPlanSlice";

type semesterProps = {
  customStyle: string;
  yearName: YearType;
  courses: UserCourse[];
};

/* 
  A component displaying all the courses in a specific semester.
  Props:
    courses: courses it's displaying
    yearName: year this column is displaying
*/
function Year({ customStyle, yearName, courses }: semesterProps) {
  const [fallCourses, setFallCourses] = useState<UserCourse[]>([]);
  const [springCourses, setSpringCourses] = useState<UserCourse[]>([]);
  const [winterCourses, setWinterCourses] = useState<UserCourse[]>([]);
  const [summerCourses, setSummerCourses] = useState<UserCourse[]>([]);
  const [display, setDisplay] = useState<boolean>(true);

  // Setting up redux
  const currentPlan = useSelector(selectPlan);

  // Updates and parses all courses into semesters whenever the current plan or courses array changes.
  useEffect(() => {
    // For each of the user's courses for this year, put them in their respective semesters.
    const parsedFallCourses: UserCourse[] = [];
    const parsedSpringCourses: UserCourse[] = [];
    const parsedIntersessionCourses: UserCourse[] = [];
    const parsedSummerCourses: UserCourse[] = [];
    courses.forEach((course) => {
      if (course.term.toLowerCase() === "fall") {
        parsedFallCourses.push(course);
      } else if (course.term.toLowerCase() === "spring") {
        parsedSpringCourses.push(course);
      } else if (course.term.toLowerCase() === "summer") {
        parsedSummerCourses.push(course);
      } else if (course.term.toLowerCase() === "intersession") {
        parsedIntersessionCourses.push(course);
      }
    });
    setFallCourses(parsedFallCourses);
    setSpringCourses(parsedSpringCourses);
    setWinterCourses(parsedIntersessionCourses);
    setSummerCourses(parsedSummerCourses);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courses, currentPlan, currentPlan.name]);

  // Displays dropdown showing semester categories
  const displaySemesters = () => {
    setDisplay(!display);
  };

  return (
    <div
      className={`${customStyle} ml-auto mr-auto medium:px-4 w-yearheading min-w-yearMin`}
    >
      <div
        className="flex flex-row justify-between mb-3 p-2 w-full h-yearheading text-white font-medium bg-primary rounded shadow"
        onClick={displaySemesters}
      >
        <div className="select-none">{yearName}</div>
        <MoreSvg className="w-6 h-6 stroke-2 cursor-pointer" />
      </div>
      {display ? (
        <div className="flex flex-col items-center">
          <Semester
            customStyle=""
            semesterName="Fall"
            semesterYear={yearName}
            courses={fallCourses}
          />
          <Semester
            customStyle=""
            semesterName="Spring"
            semesterYear={yearName}
            courses={springCourses}
          />
          <Semester
            customStyle=""
            semesterName="Intersession"
            semesterYear={yearName}
            courses={winterCourses}
          />
          <Semester
            customStyle=""
            semesterName="Summer"
            semesterYear={yearName}
            courses={summerCourses}
          />
        </div>
      ) : null}
    </div>
  );
}

export default Year;
