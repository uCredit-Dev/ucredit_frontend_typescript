import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Placeholder from "./course-search/search-results/Placeholder";
import { Course, Plan, SISRetrievedCourse, UserCourse, Year } from "../../resources/commonTypes";
import {
  selectCourseToShow,
  updateCourseToShow,
  updateShowCourseInfo,
} from "../../slices/popupSlice";
import {
  updateInspectedCourse,
  updatePlaceholder,
  updateInspectedVersion,
  selectPlaceholder,
  selectVersion,
  clearSearch,
} from "../../slices/searchSlice";
import {
  selectCourseCache,
  selectPlanList,
  selectUser,
  updatePlanList,
} from "../../slices/userSlice";
import CourseDisplay from "./course-search/search-results/CourseDisplay";
import {
  selectCurrentPlanCourses,
  updateCurrentPlanCourses,
  updateSelectedPlan,
} from "../../slices/currentPlanSlice";
import { toast } from "react-toastify";
import { api } from "../../resources/assets";

const CourseDisplayPopup = () => {
  // Redux Setup
  const dispatch = useDispatch();
  const courseToShow = useSelector(selectCourseToShow);
  const courseCache = useSelector(selectCourseCache);
  const placeholder = useSelector(selectPlaceholder);
  const user = useSelector(selectUser);
  const version = useSelector(selectVersion);
  const planList = useSelector(selectPlanList);
  const currentCourses = useSelector(selectCurrentPlanCourses);

  useEffect(() => {
    if (courseToShow !== null) {
      //const course:Course = {...courseToShow}
      let found = false;
      courseCache.forEach((c) => {
        if (c.number === courseToShow.number) {
          dispatch(updateInspectedCourse(c));
          dispatch(updatePlaceholder(false));
          found = true;
        }
      });
      // if (!found) {
      //   courseCache.forEach((c) => {
      //     if (c.number === courseToShow.number) {
      //       let converted : SISRetrievedCourse = {
      //       }
      //       dispatch(updateInspectedCourse(c));
      //       dispatch(updatePlaceholder(false));
      //       found = true;
      //     }
      //   })
      // }
      if (!found) {
        const placeholderCourse: Course = {
          title: courseToShow.title,
          number: courseToShow.number,
          areas: courseToShow.area,
          term: courseToShow.term,
          school: "none",
          department: "none",
          credits: courseToShow.credits.toString(),
          wi: false,
          bio: "This is a placeholder course",
          tags: [],
          preReq: [],
          restrictions: [],
          level: "",
        };

        dispatch(updatePlaceholder(true));
        dispatch(updateInspectedVersion(placeholderCourse));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Gets current year name.
  const getYear = (newPlan: Plan): Year | null => {
    let out: Year | null = null;
    if (courseToShow !== null) {
      newPlan.years.forEach((planYear) => {
        if (planYear._id === courseToShow.year_id) {
          out = planYear;
        }
      });
    }
    return out;
  };

  // Updates distribution bars upon successfully adding a course.
  const addCourse = (plan: Plan): void => {
    let newUserCourse: UserCourse;
    if (version !== "None" && courseToShow !== null) {
      const addingYear: Year | null = getYear(plan);
      const body = {
        user_id: user._id,
        year_id: courseToShow.year_id !== null ? courseToShow.year_id : "",
        plan_id: plan._id,
        title: version.title,
        year: addingYear !== null ? addingYear.name : "",
        term: courseToShow.term,
        credits: version.credits === "" ? 0 : version.credits,
        distribution_ids: plan.distribution_ids,
        isPlaceholder: placeholder,
        number: version.number,
        area: courseToShow.area,
        preReq: version.preReq,
        wi: version.wi,
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
            const allYears: Year[] = [...plan.years];
            const newYears: Year[] = [];
            allYears.forEach((y) => {
              if (y._id === courseToShow.year_id) {
                const yCourses = [...y.courses, newUserCourse._id];
                newYears.push({ ...y, courses: yCourses });
              } else {
                newYears.push(y);
              }
            });
            const newPlan: Plan = { ...plan, years: newYears };
            dispatch(updateSelectedPlan(newPlan));
            const newPlanList = [...planList];
            for (let i = 0; i < planList.length; i++) {
              if (planList[i]._id === newPlan._id) {
                newPlanList[i] = newPlan;
              }
            }
            dispatch(updatePlanList(newPlanList));
            dispatch(updateCourseToShow(null));
            dispatch(updateShowCourseInfo(false));
            dispatch(clearSearch());
            dispatch(updatePlaceholder(false));
            toast.success("Course updated!", {
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
    <div className="absolute top-0">
      {/* Background Grey */}
      <div
        className="fixed z-40 left-0 top-0 m-0 w-full h-screen bg-black opacity-50"
        onClick={() => {
          dispatch(updateCourseToShow(null));
          dispatch(updateShowCourseInfo(false));
        }}
      ></div>

      {/* Actual popup */}
      <div
        className={
          " z-50 fixed flex flex-col bg-red-500 select-none bg-gradient-to-r shadow from-blue-500 to-green-400 rounded left-1/2 transform -translate-x-1/2 min-w-planAdd shadow h-3/4 translate-y-20 overflow-y-scroll"
        }
      >
        <div className="px-4 py-2 text-white text-coursecard font-semibold select-none">
          Inspecting{" "}
          {courseToShow === null ? "Invalid course" : courseToShow.title}
        </div>
        {placeholder ? (
          <div className="p-4 min-w-narrowest bg-gray-100 rounded">
            <Placeholder addCourse={addCourse} />
          </div>
        ) : (
          <CourseDisplay />
        )}
      </div>
    </div>
  );
};

export default CourseDisplayPopup;
