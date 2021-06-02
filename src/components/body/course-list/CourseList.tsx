import React, { useState, useEffect } from "react";
import Year from "./Year";
import { useSelector, useDispatch } from "react-redux";
import { UserCourse } from "../../commonTypes";
import axios from "axios";
import {
  selectPlan,
  updateCurrentPlanCourses,
} from "../../slices/currentPlanSlice";
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

  // Component State setup.
  const [elements, setElements] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const jsx: JSX.Element[] = [];
    const totCourses: UserCourse[] = [];
    currentPlan.years.forEach((year) => {
      const courses: UserCourse[] = [];
      if (year.courses.length === 0) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
