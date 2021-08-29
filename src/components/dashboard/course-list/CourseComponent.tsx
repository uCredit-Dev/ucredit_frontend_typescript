import React, { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";
import { UserCourse, SemesterType, Year } from "../../../resources/commonTypes";
import { checkAllPrereqs, getColors } from "../../../resources/assets";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as RemoveSvg } from "../../../resources/svg/Remove.svg";
import { ReactComponent as DetailsSvg } from "../../../resources/svg/Details.svg";
import { ReactComponent as WarningSvg } from "../../../resources/svg/Warning.svg";
import { ReactComponent as GrabSvg } from "../../../resources/svg/Grab.svg";
import { Transition } from "@tailwindui/react";
import clsx from "clsx";
import "react-toastify/dist/ReactToastify.css";
import {
  selectCurrentPlanCourses,
  selectPlan,
} from "../../../slices/currentPlanSlice";
import { selectCourseCache } from "../../../slices/userSlice";
import OverridePrereqpopup from "./OverridePrereqPopup";
import {
  updateCourseToDelete,
  updateCourseToShow,
  updateDeleteCourseStatus,
  updateShowCourseInfo,
} from "../../../slices/popupSlice";

type courseProps = {
  setDraggable: Function;
  course: UserCourse;
  year: Year;
  semester: SemesterType;
};

/**
 * This is a course card displayed in the course list under each semester.
 * @prop setDraggable: to determine if we can drag this item.
 * @prop course: course it's displaying
 * @prop year: year the course is part of
 * @prop semester: semester this course is part of
 */
function CourseComponent({
  setDraggable,
  year,
  course,
  semester,
}: courseProps) {
  // React setup
  const [activated, setActivated] = useState<boolean>(false);
  const [satisfied, setSatisfied] = useState<boolean>(false);
  const [overridden, setOverridden] = useState<boolean>(false);
  const [displayPopup, setDisplayPopup] = useState<boolean>(false);
  const [hovered, setHovered] = useState<boolean>(false);

  // Redux setup
  const dispatch = useDispatch();
  const currentPlan = useSelector(selectPlan);
  const currPlanCourses = useSelector(selectCurrentPlanCourses);
  const courseCache = useSelector(selectCourseCache);

  // Checks whether course is satisfied every time plan courses gets updated.
  useEffect(() => {
    if (course.isPlaceholder) {
      setSatisfied(true);
    } else {
      checkAllPrereqs(
        currPlanCourses,
        currentPlan,
        course.number,
        year,
        semester,
        courseCache
      ).then((satisfied) => {
        setSatisfied(satisfied);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currPlanCourses]);

  /**
   * Sets or resets the course displayed in popout after user clicks it in course list.
   */
  const displayCourses = () => {
    dispatch(updateCourseToShow(course));
    dispatch(updateShowCourseInfo(true));
  };

  /**
   * Deletes a course on click of the delete button. Updates currently displayed plan with changes.
   */
  const deleteCourse = () => {
    dispatch(updateCourseToDelete({ course: course, year: year }));
    dispatch(updateDeleteCourseStatus(true));
  };

  /**
   * Activates the course component button menu and grab icon.
   */
  const activate = () => {
    setActivated(true);
    setTimeout(() => setHovered(true), 100);
  };

  /**
   * Deactivates the course component button menu and grab icon.
   */
  const deactivate = () => {
    setActivated(false);
    setHovered(false);
  };

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
            {!satisfied && !overridden ? (
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
                <div
                  className={clsx(
                    "absolute z-20 left-0 w-0 h-full bg-blue-400 bg-opacity-80 rounded transform duration-150 ease-in",
                    {
                      "w-1/4": hovered,
                    }
                  )}
                  onMouseEnter={() => setDraggable(false)}
                  onMouseLeave={() => setDraggable(true)}
                >
                  <GrabSvg className="p-auto py-auto z-20 m-auto w-6 h-full text-white" />
                </div>
                <DetailsSvg
                  className="relative z-20 flex flex-row items-center justify-center ml-12 mr-5 p-0.5 w-6 h-6 text-white bg-secondary rounded-md outline-none stroke-2 cursor-pointer transform hover:scale-110 transition duration-150 ease-in"
                  onClick={displayCourses}
                />
                <RemoveSvg
                  className={clsx(
                    "relative z-20 flex flex-row items-center justify-center p-0.5 w-6 h-6 text-white bg-secondary rounded-md outline-none stroke-2 cursor-pointer transform hover:scale-110 transition duration-150 ease-in",
                    { "mr-5": !satisfied }
                  )}
                  onClick={deleteCourse}
                />
                {!satisfied && !overridden ? (
                  <>
                    <WarningSvg
                      data-tip="<div>Prereqs not yet satisfied</div>"
                      data-for="godTip"
                      className="relative z-20 flex flex-row items-center justify-center p-0.5 w-6 h-6 text-white bg-secondary rounded-md outline-none stroke-2 cursor-pointer transform hover:scale-110 transition duration-150 ease-in"
                      onClick={() => setDisplayPopup(true)}
                    />
                  </>
                ) : null}
                {displayPopup ? (
                  <OverridePrereqpopup
                    courseName={course.number}
                    cleanup={() => setDisplayPopup(false)}
                    save={() => setOverridden(true)}
                  />
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
