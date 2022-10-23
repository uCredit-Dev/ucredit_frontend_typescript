import React, { useState, useEffect, FC, useRef } from 'react';
import ReactTooltip from 'react-tooltip';
import { useDispatch, useSelector } from 'react-redux';
import { MinusIcon, ExclamationIcon } from '@heroicons/react/outline';
import { Transition } from '@tailwindui/react';
import clsx from 'clsx';
import 'react-toastify/dist/ReactToastify.css';
import { checkAllPrereqs, getColors } from '../../../resources/assets';
import {
  UserCourse,
  SemesterType,
  Year,
  ReviewMode,
} from '../../../resources/commonTypes';
import {
  selectCurrentPlanCourses,
  selectPlan,
} from '../../../slices/currentPlanSlice';
import { selectCourseCache } from '../../../slices/userSlice';
import OverridePrereqPopup from './OverridePrereqPopup';
import {
  updateCourseToDelete,
  updateCourseToShow,
  updateDeleteCourseStatus,
  updateShowCourseInfo,
} from '../../../slices/popupSlice';

/**
 * This is a course card displayed in the course list under each semester.
 * @prop setDraggable: to determine if we can drag this item.
 * @prop course: course it's displaying
 * @prop year: year the course is part of
 * @prop semester: semester this course is part of
 */
const CourseComponent: FC<{
  setDraggable: (draggable: boolean) => void;
  course: UserCourse;
  year: Year;
  semester: SemesterType;
  mode: ReviewMode;
}> = ({ setDraggable, year, course, semester, mode }) => {
  // React setup
  const [activated, setActivated] = useState<boolean>(false);
  const [satisfied, setSatisfied] = useState<boolean>(false);
  const [overridden, setOverridden] = useState<boolean>(false);
  const [displayPopup, setDisplayPopup] = useState<boolean>(false);
  const [hovered, setHovered] = useState<boolean>(false);

  const isMounted = useRef(false);

  // Redux setup
  const dispatch = useDispatch();
  const currentPlan = useSelector(selectPlan);
  const currPlanCourses = useSelector(selectCurrentPlanCourses);
  const courseCache = useSelector(selectCourseCache);

  // Checks whether course is satisfied every time plan courses gets updated.
  useEffect(() => {
    isMounted.current = true;
    if (course.isPlaceholder || semester === 'All') {
      setSatisfied(true);
    } else {
      checkAllPrereqs(
        currPlanCourses,
        currentPlan,
        course.number,
        year,
        semester,
        courseCache,
      ).then((satisfiedResponse) => {
        if (isMounted.current) setSatisfied(satisfiedResponse);
      });
    }
    return () => {
      isMounted.current = false;
    };
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
    setHovered(true);
  };

  /**
   * Deactivates the course component button menu and grab icon.
   */
  const deactivate = (): void => {
    setHovered(false);
    setActivated(false);
    setDisplayPopup(false);
  };

  /**
   * Checks if this course is a placeholder
   */
  const checkIfPlaceholder = (): boolean => {
    for (let c of courseCache) {
      if (course.number === c.number) {
        return true;
      }
    }
    return false;
  };

  return (
    <div
      className="flex flex-row h-12"
      onMouseEnter={activate}
      onMouseLeave={deactivate}
    >
      <div className="absolute">
        {hovered && mode !== ReviewMode.View && mode !== ReviewMode.RoadMap && (
          <div className="flex flex-row h-14">
            <MinusIcon
              className="z-20 -ml-6 flex flex-row items-center my-auto justify-center p-0.5 w-6 h-6 text-white bg-red-300 hover:bg-red-600 rounded-md outline-none stroke-2 cursor-pointer transform hover:scale-110 transition duration-150 ease-in"
              onClick={deleteCourse}
            />
          </div>
        )}
      </div>
      <div
        className="shadow relative flex items-center justify-between text-xs mt-2 pl-1 p-0.5 w-full rounded md:w-full bg-white"
        onMouseEnter={() => setDraggable(false)}
        onMouseLeave={() => setDraggable(true)}
        onClick={displayCourses}
        onMouseOver={() => {
          ReactTooltip.rebuild();
        }}
        key={course.number}
      >
        <div className="grid grid-flow-row-dense grid-cols-10 w-full h-full gap-x-1.5">
          <div
            className="col-span-1 px-1.5 h-5/6 place-self-center rounded-lg select-none"
            style={{ backgroundColor: getColors(course.areas, course.wi) }}
          ></div>
          <div className="col-span-8">
            <div className="truncate">{course.title}</div>
            <div className="flex flex-row gap-0.5">
              <div className="text-[10px]">{course.number}</div>
              {!satisfied && !overridden && checkIfPlaceholder() && (
                <ExclamationIcon className="flex items-center w-4 h-4 font-semibold text-red-400 rounded select-none" />
              )}
            </div>
          </div>
          <div className="flex flex-col justify-items-start gap-0.5">
            <div className="flex px-1 rounded select-none">
              {course.credits}
            </div>
            {course.areas !== 'None' && (
              <div className="text-[10px] flex px-1 font-semibold rounded select-none">
                {course.areas}
              </div>
            )}{' '}
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
                  'absolute z-10 inset-0 flex flex-row items-center justify-center w-full h-full rounded',
                  {
                    'pointer-events-none': !activated,
                  },
                )}
              >
                <div className="" />

                {displayPopup && (
                  <OverridePrereqPopup
                    courseName={course.number}
                    cleanup={() => setDisplayPopup(false)}
                    save={() => setOverridden(true)}
                  />
                )}
              </div>
            )}
          </Transition>
        </div>
      </div>
    </div>
  );
};

export default CourseComponent;
