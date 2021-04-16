import React, { useState, useEffect } from "react";
import Semester from "./Semester";
import { UserCourse, YearType } from "../../commonTypes";
import { ReactComponent as MoreSvg } from "../../svg/more.svg";
import { useSelector } from "react-redux";
import { selectPlan } from "../../slices/userSlice";
import axios from "axios";
const api = "https://ucredit-api.herokuapp.com/api";

type semesterProps = {
  yearName: YearType;
  courseIDs: string[];
};

// Dropdown of all semesters and courses for each semester in a year.
function Year({ yearName, courseIDs }: semesterProps) {
  const [fallCourses, setFallCourses] = useState<UserCourse[]>([]);
  const [springCourses, setSpringCourses] = useState<UserCourse[]>([]);
  const [winterCourses, setWinterCourses] = useState<UserCourse[]>([]);
  const [summerCourses, setSummerCourses] = useState<UserCourse[]>([]);
  const [display, setDisplay] = useState<boolean>(true);
  const [courses, setCourses] = useState<UserCourse[]>([]);

  // Setting up redux
  const currentPlan = useSelector(selectPlan);

  const getCourses = () => {
    const totalCourses: UserCourse[] = [];
    if (courseIDs !== undefined) {
      courseIDs.forEach((courseId) => {
        // TODO: fetch each course
        axios
          .get(api + "/courses/" + courseId)
          .then((retrieved) => {
            const data = retrieved.data.data;
            totalCourses.push(data);
            setCourses([...totalCourses]);
          })
          .catch((err) => console.log(err));
      });
    }
  };

  useEffect(() => {
    setCourses([]);
    getCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlan]);

  useEffect(() => {
    // For each of the user's courses for this year, put them in their respective semesters.
    const parsedFallCourses: UserCourse[] = [];
    const parsedSpringCourses: UserCourse[] = [];
    const parsedIntersessionCourses: UserCourse[] = [];
    const parsedSummerCourses: UserCourse[] = [];
    courses.forEach((course) => {
      if (course.term === "fall") {
        parsedFallCourses.push(course);
      } else if (course.term === "spring") {
        parsedSpringCourses.push(course);
      } else if (course.term === "summer") {
        parsedSummerCourses.push(course);
      } else if (course.term === "intersession") {
        parsedIntersessionCourses.push(course);
      }
    });
    setFallCourses(parsedFallCourses);
    setSpringCourses(parsedSpringCourses);
    setWinterCourses(parsedIntersessionCourses);
    setSummerCourses(parsedSummerCourses);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courses.length, currentPlan]);

  // Displays dropdown showing semester categories
  const displaySemesters = () => {
    setDisplay(!display);
  };

  return (
    <div className='ml-auto mr-auto w-yearheading'>
      <div
        className='flex flex-row justify-between mb-3 p-2 w-full h-yearheading text-white font-medium bg-primary rounded shadow'
        onClick={displaySemesters}>
        <div className='select-none'>{yearName}</div>
        <MoreSvg className='w-6 h-6 stroke-2' />
      </div>
      {display ? (
        <div className='flex flex-col items-center'>
          <Semester
            semesterName='fall'
            semesterYear={yearName}
            courses={fallCourses}
          />
          <Semester
            semesterName='spring'
            semesterYear={yearName}
            courses={springCourses}
          />
          <Semester
            semesterName='intersession'
            semesterYear={yearName}
            courses={winterCourses}
          />
          <Semester
            semesterName='summer'
            semesterYear={yearName}
            courses={summerCourses}
          />
        </div>
      ) : null}
    </div>
  );
}

export default Year;
