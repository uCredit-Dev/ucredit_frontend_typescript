import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Plan, UserCourse, Year } from "../../../../resources/commonTypes";
import {
  clearSearch,
  selectSemester,
  selectYear,
  selectPlaceholder,
  updatePlaceholder,
  selectVersion,
} from "../../../../slices/searchSlice";
import {
  selectUser,
  selectPlanList,
  updatePlanList,
} from "../../../../slices/userSlice";
import Placeholder from "./Placeholder";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  selectCurrentPlanCourses,
  selectPlan,
  updateCurrentPlanCourses,
  updateSelectedPlan,
} from "../../../../slices/currentPlanSlice";
import { api } from "../../../../resources/assets";
import SisCourse from "./SisCourse";

/**
 * Displays course information once a user selects a course in the search list
 */
const CourseDisplay = () => {
  // Redux Setup
  const dispatch = useDispatch();
  const version = useSelector(selectVersion);
  const user = useSelector(selectUser);
  const semester = useSelector(selectSemester);
  const year = useSelector(selectYear);
  const currentPlan = useSelector(selectPlan);
  const planList = useSelector(selectPlanList);
  const placeholder = useSelector(selectPlaceholder);
  const currentCourses = useSelector(selectCurrentPlanCourses);

  // component state setup
  const [inspectedArea, setInspectedArea] = useState<string>("None");

  // Adds course
  const addCourse = (): void => {
    // Adds course, updates user frontend distributions display, and clears search states.
    if (version !== "None") {
      // Posts to add course route and then updates distribution.
      updateDistributions();

      // Clears search state.
      dispatch(clearSearch());
      dispatch(updatePlaceholder(false));
    }
  };

  // Gets current year name.
  const getYear = (): Year | null => {
    let out: Year | null = null;
    currentPlan.years.forEach((currPlanYear) => {
      if (currPlanYear._id === year) {
        out = currPlanYear;
      }
    });
    return out;
  };

  // Updates distribution bars upon successfully adding a course.
  const updateDistributions = (): void => {
    let newUserCourse: UserCourse;
    if (version !== "None") {
      const addingYear: Year | null = getYear();

      const body = {
        user_id: user._id,
        year_id: addingYear !== null ? addingYear._id : "",
        plan_id: currentPlan._id,
        title: version.title,
        term: semester.toLowerCase(),
        year: addingYear !== null ? addingYear.name : "",
        credits: version.credits === "" ? 0 : version.credits,
        distribution_ids: currentPlan.distribution_ids,
        isPlaceholder: placeholder,
        number: version.number,
        area: inspectedArea,
        preReq: version.preReq,
        expireAt:
          user._id === "guestUser"
            ? Date.now() + 60 * 60 * 24 * 1000
            : undefined,
      };

      fetch(api + "/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }).then((retrieved) => {
        retrieved.json().then((data) => {
          if (data.errors === undefined) {
            newUserCourse = { ...data.data };
            dispatch(
              updateCurrentPlanCourses([...currentCourses, newUserCourse])
            );
            const allYears: Year[] = [...currentPlan.years];
            const newYears: Year[] = [];
            allYears.forEach((y) => {
              if (y._id === year) {
                const yCourses = [...y.courses, newUserCourse._id];
                newYears.push({ ...y, courses: yCourses });
              } else {
                newYears.push(y);
              }
            });
            const newPlan: Plan = { ...currentPlan, years: newYears };
            dispatch(updateSelectedPlan(newPlan));
            const newPlanList = [...planList];
            for (let i = 0; i < planList.length; i++) {
              if (planList[i]._id === newPlan._id) {
                newPlanList[i] = newPlan;
              }
            }
            dispatch(updatePlanList(newPlanList));
            toast.success(version.title + " added!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: 0,
            });
          } else {
            console.log("Failed to add", data.errors);
          }
        });
      });
    }
  };
  return (
    <div className="flex flex-col p-5 w-full bg-gray-200 rounded-r">
      {version === "None" ? (
        <div className="flex flex-col items-center justify-center w-full h-full font-normal">
          No selected course!
        </div>
      ) : placeholder ? (
        <Placeholder addCourse={addCourse} />
      ) : (
        <SisCourse
          inspectedArea={inspectedArea}
          setInspectedArea={setInspectedArea}
          addCourse={addCourse}
        />
      )}
    </div>
  );
};

export default CourseDisplay;
