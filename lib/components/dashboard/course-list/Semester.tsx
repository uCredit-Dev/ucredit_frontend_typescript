import React, { useState, useEffect, FC } from 'react';
import {
  DroppableType,
  Plan,
  ReviewMode,
  SemesterType,
  UserCourse,
  Year,
} from '../../../resources/commonTypes';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearSearch,
  selectCartAdd,
  selectInspectedCourse,
  selectPlaceholder,
  selectVersion,
  updateCartAdd,
  updateSearchStatus,
  updateSearchTime,
} from '../../../slices/searchSlice';
import { PlusIcon } from '@heroicons/react/outline';
import { QuestionMarkCircleIcon } from '@heroicons/react/solid';
import { Droppable } from 'react-beautiful-dnd';
import {
  selectCurrentPlanCourses,
  selectPlan,
  updateCurrentPlanCourses,
  updateDroppables,
  updateSelectedPlan,
} from '../../../slices/currentPlanSlice';
import clsx from 'clsx';
import CourseDraggable from './CourseDraggable';
import {
  selectAddingPrereq,
  updateAddingPrereq,
  updateInfoPopup,
  updateShowingCart,
} from '../../../slices/popupSlice';
import { toast } from 'react-toastify';
import { getAPI } from '../../../resources/assets';
import {
  selectUser,
  selectPlanList,
  updatePlanList,
  updateCartInvokedBySemester,
  selectToken,
} from '../../../slices/userSlice';
import Comments from '../Comments';
import CourseComponent from './CourseComponent';

/**
 * A component displaying all the courses in a specific semester.
 * @prop courses - all the courses in the semester
 * @prop semesterYear - year this semester is part of
 * @prop semesterName - name of the semester
 * @prop customStyle - custom styling for the semester
 */
const Semester: FC<{
  semesterName: SemesterType;
  semesterYear: Year;
  courses: UserCourse[];
  display: boolean;
  mode: ReviewMode;
}> = ({ semesterName, semesterYear, courses, display, mode }) => {
  // Redux setup
  const dispatch = useDispatch();
  const addingPrereqStatus = useSelector(selectAddingPrereq);
  const version = useSelector(selectVersion);
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const currentPlan = useSelector(selectPlan);
  const planList = useSelector(selectPlanList);
  const placeholder = useSelector(selectPlaceholder);
  const currentCourses = useSelector(selectCurrentPlanCourses);
  const inspected = useSelector(selectInspectedCourse);
  const cartOpen = useSelector(selectCartAdd);

  // State used to control whether dropdown is opened or closed
  const [totalCredits, setTotalCredits] = useState<number>(0);
  const [semesterCourses, setSemesterCourses] = useState<UserCourse[]>([]);
  const [inspectedArea, setInspectedArea] = useState<string>('None');
  const [openAPInfoBox, setOpenAPInfoBox] = useState<boolean>(false);
  const [hovered, setHovered] = useState<boolean>(false);

  // Every time any courses within this semester changes, update total credit count and the list.
  useEffect(() => {
    if (version !== 'None' && version.areas) {
      setInspectedArea(version.areas.charAt(0));
    }
    const sortedCourses: UserCourse[] = [...courses];
    sortedCourses.sort((course1: UserCourse, course2: UserCourse) =>
      course2._id.localeCompare(course1._id),
    );
    const newDrop: DroppableType = {
      year: semesterYear._id,
      courses: sortedCourses,
      semester: semesterName,
    };
    dispatch(updateDroppables(newDrop));
    setSemesterCourses(sortedCourses);
    let count: number = 0;
    courses.forEach((course) => {
      count += course.credits;
    });
    setTotalCredits(count);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courses, courses.length, version]);

  /**
   * Opens search popup to add new course.
   */
  const addCourse = () => {
    dispatch(updateCartInvokedBySemester(true));
    dispatch(updateSearchStatus(true));
    dispatch(
      updateSearchTime({
        searchSemester: semesterName,
        searchYear: semesterYear._id,
      }),
    );
  };

  /**
   * Gets a list of course components wrapped in a DnD draggable.
   * @returns a list of draggable react components
   */
  const getCourses = (): any => {
    // TODO: Search for a thread matching course id here.
    // Do something similar for plan, year, and semester
    // All threads should be retrieved on first load of the plan and stored in a map.
    return semesterCourses.map((course, index) => {
      if (mode !== ReviewMode.View) {
        return (
          <div key={course._id} className="w-auto mr-0">
            <CourseDraggable
              course={course}
              index={index}
              semesterName={semesterName}
              semesterYear={semesterYear}
              mode={mode}
              thread={'Course ' + course._id}
              // When retrieving threads make sure the threads are stored as a map. We can then not add further complexity when searching for threads since map find is O(1) if we check them here.
            />
          </div>
        );
      } else {
        return (
          <div key={course._id} className="w-auto mr-0">
            <CourseComponent
              setDraggable={(draggable) => {
                return;
              }}
              course={course}
              semester={semesterName}
              year={semesterYear}
              mode={mode}
              thread={'Course ' + course._id}
            />
          </div>
        );
      }
    });
  };

  /**
   * Gets a tool-tip that tells you how much credits are in your semester and a broad suggestion on its maneageability.
   * @returns the credit string tooltip
   */
  const getCreditString = (): string => {
    let string = `<div>${totalCredits} Credits</div>`;
    if (
      semesterName !== 'Intersession' &&
      semesterName !== 'Summer' &&
      totalCredits < 12
    )
      string += `\nMore than 12 credits required!`;
    else if (totalCredits > 18)
      string +=
        '\nCritical credit count reached (you seem to be taking a lot of credits)! Check with your advisor!';
    return string;
  };

  /**
   * Posts to add course route and then updates distribution. Then clears state.
   */
  const addPrereq = () => {
    updateDistributions();
  };

  /**
   * Updates distribution bars upon successfully adding a course.
   */
  const updateDistributions = (): void => {
    if (version !== 'None') {
      const body = {
        ...version,
        user_id: user._id,
        year_id: semesterYear._id,
        plan_id: currentPlan._id,
        term: semesterName === 'All' ? 'fall' : semesterName.toLowerCase(),
        year: semesterYear._id,
        credits: version.credits === '' ? 0 : version.credits,
        distribution_ids: currentPlan.distribution_ids,
        isPlaceholder: placeholder,
        area: inspectedArea,
        version: semesterName + ' ' + semesterYear.year,
        expireAt: user._id === 'guestUser' ? Date.now() : undefined,
        _id: undefined,
      };

      fetch(getAPI(window) + '/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      })
        .then((retrieved) => retrieved.json())
        .then(handlePostResponse);
    }
  };

  const handlePostResponse = (data) => {
    if (data.errors === undefined && version !== 'None') {
      let newUserCourse: UserCourse;
      newUserCourse = { ...data.data };
      dispatch(updateCurrentPlanCourses([...currentCourses, newUserCourse]));
      const allYears: Year[] = [...currentPlan.years];
      const newYears: Year[] = [];
      allYears.forEach((y) => {
        if (y._id === semesterYear._id) {
          const yCourses = [...y.courses, newUserCourse];
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
      dispatch(updateAddingPrereq(false));
      dispatch(updateInfoPopup(true));
      if (cartOpen) dispatch(updateShowingCart(true));
      else dispatch(clearSearch());
      dispatch(updateCartAdd(false));
      toast.success(version.title + ' added!', {
        toastId: 'title added',
      });
    } else {
      console.log('Failed to add', data.errors);
      data.errors.forEach((error) => {
        if (error.status === 400) {
          toast.error(error.detail);
          dispatch(updateAddingPrereq(false));
        }
      });
    }
  };

  const getSemesterName = (): JSX.Element => {
    if (semesterName === 'Fall')
      return (
        <div className="flex flex-row font-semibold text-gray-600">
          Fall
          <div className="ml-1 font-light">{semesterYear.year}</div>
        </div>
      );
    else if (semesterName === 'Intersession')
      return (
        <div className="flex flex-row font-semibold text-gray-600">
          Intersession
          <div className="ml-1 font-light">{semesterYear.year + 1}</div>
        </div>
      );
    else if (semesterName === 'Spring')
      return (
        <div className="flex flex-row font-semibold text-gray-600">
          Spring
          <div className="ml-1 font-light">{semesterYear.year + 1}</div>
        </div>
      );
    else
      return (
        <div className="flex flex-row font-semibold text-gray-600">
          Summer
          <div className="ml-1 font-light">{semesterYear.year + 1}</div>
        </div>
      );
  };

  /**
   * Displays semester name and year.
   */
  const getSemesterTitle = (): JSX.Element => (
    <>
      {semesterName === 'All' ? (
        <>
          <QuestionMarkCircleIcon
            className="h-4 fill-gray"
            onClick={() => setOpenAPInfoBox(!openAPInfoBox)}
          />
          <div className="flex flex-row text-sm font-semibold text-gray-600">
            Equivalents
            <div className="ml-1">{'≤'}</div>
            <div className="font-light">{semesterYear.year}</div>
          </div>
        </>
      ) : (
        <div className="text-md">{getSemesterName()}</div>
      )}{' '}
      {courses.length !== 0 && totalCredits !== 0 && (
        <div
          className={clsx(
            {
              'bg-red-200': colorCheck('bg-red-200'),
            },
            {
              'bg-yellow-200': colorCheck('bg-yellow-200'),
            },
            {
              'bg-green-200': colorCheck('bg-green-200'),
            },
            'flex flex-row items-center justify-center mt-0.5 -ml-2 px-1 w-auto text-black text-xs rounded',
          )}
          data-tooltip-html={getCreditString()}
          data-tooltip-id="godtip"
        >
          {totalCredits}
        </div>
      )}
    </>
  );

  /**
   * Gets the color of the credit count based on semester and total credits for that semester.
   * @param colorType - type of color to check for
   * @returns - true if color is valid, false if not
   */
  const colorCheck = (colorType): boolean => {
    switch (colorType) {
      case 'bg-red-200':
        return (
          totalCredits < 12 &&
          semesterName !== 'Intersession' &&
          semesterName !== 'Summer'
        );
      case 'bg-yellow-200':
        return (
          (totalCredits > 18 && semesterName !== 'Intersession') ||
          (totalCredits > 6 && semesterName === 'Intersession')
        );
      case 'bg-green-200':
        return (
          (totalCredits <= 18 &&
            totalCredits >= 12 &&
            semesterName !== 'Intersession') ||
          (totalCredits <= 3 && semesterName === 'Intersession') ||
          (totalCredits <= 14 && semesterName === 'Summer') ||
          semesterName === 'All'
        );
      default:
        return false;
    }
  };

  /**
   * Gets start year of a semester for this year.
   * @param semesterName - semester to check.
   * @returns the year that the semester starts in.
   */
  const getYear = (): string => {
    if (semesterName === 'Fall' || semesterName === 'Intersession') {
      return semesterYear.year.toString();
    } else {
      return (semesterYear.year + 1).toString();
    }
  };

  /**
   * Check if semester is valid for adding course
   */
  const checkSemester = (): boolean => {
    if (semesterName === 'All') return true;
    if (inspected !== 'None') {
      for (let term of inspected.terms) {
        if (
          term.includes(semesterName) &&
          (term.includes(getYear()) ||
            new Date().getFullYear() <= parseInt(getYear()))
        ) {
          return true;
        }
      }
    }
    return false;
  };

  /**
   * Displays semester add button type based on whether or not the user is adding a prereq.
   */
  const getSemesterAddButton = (): JSX.Element => (
    <>
      {!addingPrereqStatus ? (
        <div
          className="flex flex-row items-center justify-center rounded-md cursor-pointer group"
          onClick={addCourse}
        >
          <PlusIcon
            className={`w-4 h-4 stroke-2 group-hover:text-sky-700 add-course-button-${semesterYear.name}-${semesterName}`}
          />
        </div>
      ) : (
        <>{getAddHereButton()}</>
      )}
    </>
  );

  /**
   * Determines whether to get add here button or not.
   */
  const getAddHereButton = () =>
    checkSemester() && (
      <button
        className={clsx(
          {
            'bg-slate-300 hover:bg-slate-300': mode === ReviewMode.View,
          },
          'z-40 w-24 py-1 text-xs text-white transition duration-150 ease-in transform rounded hover:bg-secondary bg-primary focus:outline-none hover:scale-101',
        )}
        onClick={addPrereq}
        disabled={mode === ReviewMode.View}
      >
        Add Here
      </button>
    );

  /**
   * Displays AP info box.
   */
  const getAPInfoBox = (): JSX.Element => (
    <>
      {openAPInfoBox && (
        <div className="absolute top-6 p-2 -ml-6 bg-gray-100 rounded select-text w-72">
          These are courses transferred over from AP tests and other college
          courses that you've taken! Find out equivalent courses your scores
          cover for{' '}
          <a
            className="font-bold text-blue-400 underline"
            target="_blank"
            rel="noreferrer"
            href="https://e-catalogue.jhu.edu/arts-sciences/full-time-residential-programs/undergraduate-policies/academic-policies/external-credit/#examcredittext"
          >
            here
          </a>
          .
        </div>
      )}
    </>
  );

  return (
    <>
      {!display ? null : (
        <div
          onMouseLeave={() => {
            setOpenAPInfoBox(false);
            setHovered(false);
          }}
          onMouseEnter={() => setHovered(true)}
          className="min-w-[15rem] max-w-[40rem] w-min mx-3"
        >
          <div>
            <Comments
              location={'Semester ' + semesterYear._id + semesterName}
              hovered={hovered}
              mode={mode}
            />
          </div>
          <div className="flex flex-col font-medium h-yearheading">
            <div className="flex flex-row items-center justify-between pr-2 py-1 bg-white h-yearheading1">
              <div className="flex flex-row items-center h-auto gap-3 font-normal">
                {getSemesterTitle()}
              </div>
              {getSemesterAddButton()}
            </div>
          </div>
          <div className="w-full h-px bg-primary"></div>
          <div
            id={semesterName + '|' + semesterYear._id}
            // className="pr-11"
            onMouseEnter={() => setHovered(false)}
            onMouseLeave={() => setHovered(true)}
          >
            {mode === ReviewMode.View ? (
              <>{getCourses()}</>
            ) : (
              <Droppable
                droppableId={semesterName + '|' + semesterYear._id}
                type="COURSE"
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                    className="rounded"
                  >
                    {getCourses()}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            )}
            {getAPInfoBox()}
          </div>
        </div>
      )}
    </>
  );
};

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? '#F3F3F3' : 'transparent',
  minHeight: '1rem',
});

export default Semester;
