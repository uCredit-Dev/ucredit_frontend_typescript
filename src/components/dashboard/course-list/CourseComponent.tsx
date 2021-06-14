import React, { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";
import {
  UserCourse,
  Plan,
  SemesterType,
  Course,
} from "../../../resources/commonTypes";
import { api, checkAllPrereqs, getColors } from "../../../resources/assets";
import { useDispatch, useSelector } from "react-redux";
import {
  updateInspectedCourse,
  updateSearchTime,
  updateSearchTerm,
  updatePlaceholder,
  updateInspectedVersion,
  updateSearchStatus,
} from "../../../slices/searchSlice";
import { ReactComponent as RemoveSvg } from "../../../resources/svg/Remove.svg";
import { ReactComponent as DetailsSvg } from "../../../resources/svg/Details.svg";
import { ReactComponent as WarningSvg } from "../../../resources/svg/Warning.svg";
import { Transition } from "@tailwindui/react";
import clsx from "clsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  selectCurrentPlanCourses,
  selectPlan,
  updateSelectedPlan,
} from "../../../slices/currentPlanSlice";
import { selectAllCourses } from "../../../slices/userSlice";

type courseProps = {
  course: UserCourse;
  year: number;
  semester: SemesterType;
};

/**
 * This is a course card displayed in the course list under each semester.
 * @param course: course it's displaying
 * @param year: year the course is part of
 * @param semester: semester this course is part of
 */
function CourseComponent({ year, course, semester }: courseProps) {
  // React setup
  const [activated, setActivated] = useState<boolean>(false);
  const [satisfied, setSatisfied] = useState<boolean>(false);

  // Redux setup
  const dispatch = useDispatch();
  const currentPlan = useSelector(selectPlan);
  const currPlanCourses = useSelector(selectCurrentPlanCourses);
  const allCourses = useSelector(selectAllCourses);

  useEffect(() => {
    isSatisfied();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currPlanCourses, allCourses]);

  const isSatisfied = () => {
    const temp = checkAllPrereqs(
      currPlanCourses,
      currentPlan,
      course.number,
      year,
      semester,
      allCourses
    );
    setSatisfied(temp);
  };

  // Sets or resets the course displayed in popout after user clicks it in course list.
  const displayCourses = () => {
    dispatch(updateSearchTime({ searchYear: year, searchSemester: semester }));
    dispatch(updateSearchTerm(course.number));
    let found = false;
    allCourses.forEach((c) => {
      if (c.number === course.number) {
        dispatch(updateInspectedCourse(c));
        dispatch(updatePlaceholder(false));
        found = true;
      }
    });

    if (!found) {
      const placeholderCourse: Course = {
        title: course.title,
        number: course.number,
        areas: course.area,
        term: "",
        school: "none",
        department: "none",
        credits: course.credits.toString(),
        wi: false,
        bio: "This is a placeholder course",
        tags: [],
        preReq: [],
        restrictions: [],
      };
      dispatch(updatePlaceholder(true));
      dispatch(updateInspectedVersion(placeholderCourse));
    }

    dispatch(updateSearchStatus(true));
  };

  // Deletes a course on click of the delete button. Updates currently displayed plan with changes.
  const deleteCourse = () => {
    fetch(api + "/courses/" + course._id, { method: "DELETE" }).then(() => {
      let newPlan: Plan;
      // TODO: Delete specific course by year AND semester
      const years = [...currentPlan.years];
      currentPlan.years.forEach((planYear, index) => {
        if (planYear.year === year) {
          const courses = planYear.courses.filter(
            (yearCourse) => yearCourse !== course._id
          );
          years[index] = { ...years[index], courses: courses };
        }
      });
      newPlan = { ...currentPlan, years: years };

      toast.error(course.title + " deleted!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
      });
      dispatch(updateSelectedPlan(newPlan));
    });
  };

  const activate = () => {
    setActivated(true);
  };

  const deactivate = () => {
    setActivated(false);
  };

  const tooltip = `<div>Prereqs not yet satisfied</div>`;

  return (
    <>
      <div
        className={clsx(
          "relative flex items-center justify-between mt-2 p-2 bg-gray-100 rounded shadow transform hover:scale-105 transition duration-200 ease-in"
        )}
        onMouseEnter={activate}
        onMouseLeave={deactivate}
        onMouseOver={() => {
          ReactTooltip.rebuild();
        }}
        key={course.number}
      >
        <div className="flex flex-col gap-1 w-full h-full">
          <div className="w-full text-coursecard truncate">{course.title}</div>
          <div className="flex flex-row gap-1 items-center text-center text-coursecard">
            <div>{course.number}</div>
            <div className="flex items-center px-1 text-white font-semibold bg-secondary rounded select-none">
              {course.credits}
            </div>
            {course.area !== "None" ? (
              <div
                className="flex items-center px-1 text-white font-semibold rounded select-none"
                style={{ backgroundColor: getColors(course.area)[0] }}
              >
                {course.area}
              </div>
            ) : null}{" "}
            {!satisfied ? (
              <WarningSvg className="flex items-center w-5 h-5 text-white font-semibold rounded select-none" />
            ) : null}
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <Transition
            show={activated}
            enter="transition-opacity duration-100 ease-in-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-200 ease-in-out"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {(ref) => (
              <div
                ref={ref}
                className={clsx(
                  "absolute z-10 inset-0 flex flex-row items-center justify-center w-full h-full rounded",
                  {
                    "pointer-events-none": !activated,
                  }
                )}
              >
                <div className="absolute left-0 top-0 w-full h-full bg-white bg-opacity-80 rounded" />
                <DetailsSvg
                  className="relative z-20 flex flex-row items-center justify-center mr-5 p-0.5 w-6 h-6 text-white bg-secondary rounded-md outline-none stroke-2 cursor-pointer transform hover:scale-110 transition duration-150 ease-in"
                  onClick={displayCourses}
                />
                <RemoveSvg
                  className={clsx(
                    "relative z-20 flex flex-row items-center justify-center p-0.5 w-6 h-6 text-white bg-secondary rounded-md outline-none stroke-2 cursor-pointer transform hover:scale-110 transition duration-150 ease-in",
                    { "mr-5": !satisfied }
                  )}
                  onClick={deleteCourse}
                />
                {!satisfied ? (
                  <>
                    <WarningSvg
                      data-tip={tooltip}
                      data-for="godTip"
                      className="relative z-20 flex flex-row items-center justify-center p-0.5 w-6 h-6 text-white bg-secondary rounded-md outline-none stroke-2 cursor-pointer transform hover:scale-110 transition duration-150 ease-in"
                    />
                  </>
                ) : null}
              </div>
            )}
          </Transition>
        </div>
      </div>
    </>
  );
}

export default CourseComponent;
