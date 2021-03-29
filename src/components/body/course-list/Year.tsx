import React, { useState, useEffect } from "react";
import Semester from "./Semester";
import { UserCourse, YearType } from "../../commonTypes";
import { ReactComponent as MoreSvg } from "../../svg/more.svg";
import { userTestCourse1, userTestCourse2 } from "../../testObjs";
import axios from "axios";
const api = "https://ucredit-api.herokuapp.com/api";

type semesterProps = {
  yearName: YearType;
  courseIDs: string[];
  detailName: string;
  setDetailName: Function;
};

// Dropdown of all semesters and courses for each semester in a year.
function Year({
  yearName,
  courseIDs,
  detailName,
  setDetailName,
}: semesterProps) {
  const [fallCourses, setFallCourses] = useState<UserCourse[]>([]);
  const [springCourses, setSpringCourses] = useState<UserCourse[]>([]);
  const [winterCourses, setWinterCourses] = useState<UserCourse[]>([]);
  const [summerCourses, setSummerCourses] = useState<UserCourse[]>([]);
  const [display, setDisplay] = useState<boolean>(true);
  const [courses, setCourses] = useState<UserCourse[]>([]);

  useEffect(() => {
    const totalCourses: UserCourse[] = [];
    courseIDs.forEach((courseId) => {
      // TODO: fetch each course
      // axios.get(api + "/courses/" + courseId).then((retrieved) => {
      //   const data = retrieved.data.data;
      //   totalCourses.push(data);
      // });
      if (courseId.includes("userTestCourse1")) {
        totalCourses.push(userTestCourse1);
      } else if (courseId.includes("userTestCourse2")) {
        totalCourses.push(userTestCourse2);
      }
    });
    setCourses(totalCourses);
  }, [courseIDs]);

  useEffect(() => {
    // For each of the user's courses for this year, put them in their respective semesters.
    const parsedFallCourses: UserCourse[] = [];
    const parsedSpringCourses: UserCourse[] = [];
    const parsedIntersessionCourses: UserCourse[] = [];
    const parsedSummerCourses: UserCourse[] = [];
    courses.forEach((course) => {
      if (course.term === "Fall") {
        parsedFallCourses.push(course);
      } else if (course.term === "Spring") {
        parsedSpringCourses.push(course);
      } else if (course.term === "Summer") {
        parsedSummerCourses.push(course);
      } else if (course.term === "Intersession") {
        parsedIntersessionCourses.push(course);
      }
    });
    setFallCourses(parsedFallCourses);
    setSpringCourses(parsedSpringCourses);
    setWinterCourses(parsedIntersessionCourses);
    setSummerCourses(parsedSummerCourses);
  }, [courses]);

  // Displays dropdown showing semester categories
  const displaySemesters = () => {
    setDisplay(!display);
  };

  return (
    <div className="w-yearheading">
      <div
        className="flex flex-row justify-between mb-4 p-2 w-full h-yearheading text-white font-medium bg-primary rounded-xl"
        onClick={displaySemesters}
      >
        <div>{yearName}</div>
        <MoreSvg className="w-6 h-6" />
      </div>
      {display ? (
        <div className="flex flex-col items-center">
          <Semester
            semesterName="Fall"
            semesterYear={yearName}
            courses={fallCourses}
            detailName={detailName}
            setDetailName={setDetailName}
          />
          <Semester
            semesterName="Spring"
            semesterYear={yearName}
            courses={springCourses}
            detailName={detailName}
            setDetailName={setDetailName}
          />
          <Semester
            semesterName="Intersession"
            semesterYear={yearName}
            courses={winterCourses}
            detailName={detailName}
            setDetailName={setDetailName}
          />
          <Semester
            semesterName="Summer"
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
