import React, { useState, useEffect } from "react";
import Year from "./Year";
import { useSelector, useDispatch } from "react-redux";
import { UserCourse } from "../../commonTypes";
import axios from "axios";
import {
  selectPlan,
  updateCurrentPlanCourses,
} from "../../slices/currentPlanSlice";
const api = "https://ucredit-api.herokuapp.com/api";

/* 
  Container component that holds all the years, semesters, and courses of the current plan.
*/
function CourseList() {
  // Setting up redux
  const dispatch = useDispatch();
  const currentPlan = useSelector(selectPlan);
  const freshmanCourseIDs = currentPlan.freshman;
  const sophomoreCourseIDs = currentPlan.sophomore;
  const juniorCourseIDs = currentPlan.junior;
  const seniorCourseIDs = currentPlan.senior;

  // Course state setup.
  const [fCourses, setFCourses] = useState<UserCourse[]>([]);
  const [soCourses, setSoCourses] = useState<UserCourse[]>([]);
  const [jCourses, setJCourses] = useState<UserCourse[]>([]);
  const [seCourses, setSeCourses] = useState<UserCourse[]>([]);

  // Gets all courses from a specific semester in the current plan..
  const getCourses = (courseIDs: string[], updater: Function) => {
    const totalCourses: UserCourse[] = [];
    if (courseIDs.length === 0) {
      updater([]);
    } else {
      courseIDs.forEach((courseId) => {
        axios
          .get(api + "/courses/" + courseId)
          .then((retrieved) => {
            const data = retrieved.data.data;
            totalCourses.push(data);
            if (totalCourses.length === courseIDs.length) {
              updater(totalCourses);
            }
          })
          .catch((err) => console.log(err));
      });
    }
  };

  // Gets and sets all freshman courses whenever it gets updated.
  useEffect(() => {
    getCourses(freshmanCourseIDs, setFCourses);
  }, [currentPlan, currentPlan._id, freshmanCourseIDs]);

  // Gets and sets all sophomore courses whenever it gets updated.
  useEffect(() => {
    getCourses(sophomoreCourseIDs, setSoCourses);
  }, [currentPlan, currentPlan._id, sophomoreCourseIDs]);

  // Gets and sets all junior courses whenever it gets updated.
  useEffect(() => {
    getCourses(juniorCourseIDs, setJCourses);
  }, [currentPlan, currentPlan._id, juniorCourseIDs]);

  // Gets and sets all senior courses whenever it gets updated.
  useEffect(() => {
    getCourses(seniorCourseIDs, setSeCourses);
  }, [currentPlan, currentPlan._id, seniorCourseIDs]);

  // When any of the freshman, sophomore, junior, or senior courses change or gets a course deleted, current plan gets updated.
  useEffect(() => {
    let totalCourses: UserCourse[] = [];
    totalCourses = [...fCourses, ...seCourses, ...jCourses, ...soCourses];
    dispatch(updateCurrentPlanCourses(totalCourses));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fCourses, seCourses, jCourses, soCourses]);

  return (
    <>
      <div className="flex flex-row flex-wrap justify-between h-auto mt-4 thin:justify-center">
        <Year
          customStyle="cursor-pointer"
          yearName={"Freshman"}
          courses={fCourses}
        />
        <Year
          customStyle="cursor-pointer"
          yearName={"Sophomore"}
          courses={soCourses}
        />
        <Year
          customStyle="cursor-pointer"
          yearName={"Junior"}
          courses={jCourses}
        />
        <Year
          customStyle="cursor-pointer"
          yearName={"Senior"}
          courses={seCourses}
        />
      </div>
    </>
  );
}

export default CourseList;
