import React, { useState, useEffect } from "react";
import Year from "./Year";
import { useSelector, useDispatch } from "react-redux";
import { selectPlan, updateCurrentPlanCourses } from "../../slices/userSlice";
import { UserCourse } from "../../commonTypes";
import axios from "axios";
const api = "https://ucredit-api.herokuapp.com/api";

function CourseList() {
  // Setting up redux
  const dispatch = useDispatch();
  const currentPlan = useSelector(selectPlan);

  const freshmanCourseIDs = currentPlan.freshman;
  const sophomoreCourseIDs = currentPlan.sophomore;
  const juniorCourseIDs = currentPlan.junior;
  const seniorCourseIDs = currentPlan.senior;

  const [fCourses, setFCourses] = useState<UserCourse[]>([]);
  const [soCourses, setSoCourses] = useState<UserCourse[]>([]);
  const [jCourses, setJCourses] = useState<UserCourse[]>([]);
  const [seCourses, setSeCourses] = useState<UserCourse[]>([]);

  const getCourses = (
    courseIDs: string[],
    courses: UserCourse[],
    updater: Function
  ) => {
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
              // updater([...courses, ...totalCourses]);
            }
          })
          .catch((err) => console.log(err));
      });
    }
  };

  useEffect(() => {
    getCourses(freshmanCourseIDs, fCourses, setFCourses);
  }, [currentPlan, currentPlan._id, freshmanCourseIDs]);

  useEffect(() => {
    getCourses(sophomoreCourseIDs, soCourses, setSoCourses);
  }, [currentPlan, currentPlan._id, sophomoreCourseIDs]);

  useEffect(() => {
    getCourses(juniorCourseIDs, jCourses, setJCourses);
  }, [currentPlan, currentPlan._id, juniorCourseIDs]);

  useEffect(() => {
    getCourses(seniorCourseIDs, seCourses, setSeCourses);
  }, [currentPlan, currentPlan._id, seniorCourseIDs]);

  useEffect(() => {
    let totalCourses: UserCourse[] = [];
    totalCourses = [...fCourses, ...seCourses, ...jCourses, ...soCourses];
    dispatch(updateCurrentPlanCourses(totalCourses));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fCourses, seCourses, jCourses, soCourses]);

  return (
    <>
      {/* <div className="flex flex-col h-auto overflow-y-auto"> */}
      {/* <div className='fixed z-10 left-0 medium:left-48 medium:right-blurr right-blurrsm block flex-none h-5 bg-gradient-to-b from-background pointer-events-none'></div> */}
      <div className="flex flex-row flex-wrap justify-between thin:justify-center mt-4 h-auto">
        <Year yearName={"Freshman"} courses={fCourses} />
        <Year yearName={"Sophomore"} courses={soCourses} />
        <Year yearName={"Junior"} courses={jCourses} />
        <Year yearName={"Senior"} courses={seCourses} />
      </div>
      {/* </div> */}
    </>
  );
}

export default CourseList;
