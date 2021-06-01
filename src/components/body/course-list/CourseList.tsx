import React, { useState, useEffect } from "react";
import Year from "./Year";
import { useSelector, useDispatch } from "react-redux";
import { Course, UserCourse } from "../../commonTypes";
import axios from "axios";
import {
  selectPlan,
  updateCurrentPlanCourses,
} from "../../slices/currentPlanSlice";
import {} from "../../slices/userSlice";
import { JsxElement } from "typescript";
import {
  selectPlaceholder,
  selectSearchStatus,
} from "../../slices/searchSlice";
const api = "https://ucredit-api.herokuapp.com/api";

/* 
  Container component that holds all the years, semesters, and courses of the current plan.
*/
function CourseList() {
  // Setting up redux
  const dispatch = useDispatch();
  const currentPlan = useSelector(selectPlan);
  const searching = useSelector(selectSearchStatus);
  const placeholder = useSelector(selectPlaceholder);

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

  const [elements, setElements] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const jsx: JSX.Element[] = [];
    const totCourses: UserCourse[] = [];
    console.log("in current plan", currentPlan.years);
    currentPlan.years.forEach((year) => {
      const courses: UserCourse[] = [];
      console.log("here course is ", year.name);
      if (year.courses.length === 0) {
        console.log("0");
        jsx.push(
          <Year
            id={year.year}
            customStyle="cursor-pointer"
            yearNum={year.year}
            courses={[]}
          />
        );
        if (jsx.length === currentPlan.years.length) {
          jsx.sort((el1, el2) => el1.props.id - el2.props.id);
          dispatch(updateCurrentPlanCourses(totCourses));
          setElements(jsx);
        }
      } else {
        year.courses.forEach((courseId) => {
          axios
            .get(api + "/courses/" + courseId)
            .then((resp) => {
              courses.push(resp.data.data);
              totCourses.push(resp.data.data);
              if (courses.length === year.courses.length) {
                jsx.push(
                  <Year
                    id={year.year}
                    customStyle="cursor-pointer"
                    yearNum={year.year}
                    courses={courses}
                  />
                );
                if (jsx.length === currentPlan.years.length) {
                  jsx.sort((el1, el2) => el1.props.id - el2.props.id);
                  dispatch(updateCurrentPlanCourses(totCourses));
                  setElements(jsx);
                }
              }
            })
            .catch((err) => console.log(err));
        });
      }
    });
  }, [currentPlan, currentPlan._id, searching, placeholder]);

  return (
    <>
      <div className="flex flex-row flex-wrap justify-between thin:justify-center mt-4 h-auto">
        {elements}
      </div>
    </>
  );
}

export default CourseList;
