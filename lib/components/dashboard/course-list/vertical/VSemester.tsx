import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PlusIcon } from '@heroicons/react/outline';
import { Droppable } from 'react-beautiful-dnd';
import { QuestionMarkCircleIcon } from '@heroicons/react/solid';
import {
  clearSearch,
  selectPlaceholder,
  selectVersion,
  updateSearchStatus,
  updateSearchTime,
} from '../../../../slices/searchSlice';
import {
  selectCurrentPlanCourses,
  selectPlan,
  updateCurrentPlanCourses,
  updateDroppables,
  updateSelectedPlan,
  updateDistributions,
} from '../../../../slices/currentPlanSlice';
import ReactTooltip from 'react-tooltip';
import clsx from 'clsx';
import VCourseDraggable from './VCourseDraggable';
import {
  selectAddingPrereq,
  updateAddingPrereq,
} from '../../../../slices/popupSlice';
import { toast } from 'react-toastify';
import { getAPI } from '../../../../resources/assets';
import {
  selectUser,
  selectPlanList,
  updatePlanList,
} from '../../../../slices/userSlice';
import {
  SemesterType,
  Year,
  UserCourse,
  DroppableType,
  Plan,
} from '../../../../resources/commonTypes';
import React from 'react';

/**
 * A component displaying all the courses in a specific semester.
 * @prop courses - all the courses in the semester
 * @prop semesterYear - year this semester is part of
 * @prop semesterName - name of the semester
 * @prop customStyle - custom styling for the semester
 */
const VSemester: React.FC<{
  semesterName: SemesterType;
  semesterYear: Year;
  courses: UserCourse[];
}> = ({ semesterName, semesterYear, courses }) => {
  // Redux setup
  const dispatch = useDispatch();
  const addingPrereqStatus = useSelector(selectAddingPrereq);
  const version = useSelector(selectVersion);
  const user = useSelector(selectUser);
  const currentPlan = useSelector(selectPlan);
  const planList = useSelector(selectPlanList);
  const placeholder = useSelector(selectPlaceholder);
  const currentCourses = useSelector(selectCurrentPlanCourses);

  // State used to control whether dropdown is opened or closed
  const [totalCredits, setTotalCredits] = useState<number>(0);
  const [semesterCourses, setSemesterCourses] = useState<UserCourse[]>([]);
  const [inspectedArea, setInspectedArea] = useState<string>('None');
  const [openAPInfoBox, setOpenAPInfoBox] = useState<boolean>(false);

  useEffect(() => {
    ReactTooltip.rebuild();
  }, [courses.length, totalCredits]);

  // Every time any courses within this semester changes, update total credit count and the list.
  useEffect(() => {
    if (version !== 'None') {
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
  const getDraggables = (): any => {
    return semesterCourses.map((course, index) => (
      <div key={course._id}>
        <VCourseDraggable
          course={course}
          index={index}
          semesterName={semesterName}
          semesterYear={semesterYear}
        />
      </div>
    ));
  };

  /**
   * Gets a tool-tip that tells you how much credits are in your semester and a broad suggestion on its maneageability.
   * @returns the credit string tooltip
   */
  const getCreditString = (): string => {
    let string = `<div>${totalCredits} Credits</div>`;
    if (totalCredits < 12) string += '\nMore than 12 credits required!';
    else if (totalCredits > 18)
      string += '\nCritical credit count reached! Check with your advisor!';
    return string;
  };

  /**
   * Posts to add course route and then updates distribution. Then clears state.
   */
  const addPrereq = () => {
    updateDistributionBars();
    dispatch(clearSearch());
  };

  /**
   * Updates distribution bars upon successfully adding a course.
   */
  const updateDistributionBars = (): void => {
    if (version !== 'None') {
      const body = {
        user_id: user._id,
        year_id: semesterYear._id,
        plan_id: currentPlan._id,
        title: version.title,
        term: semesterName === 'All' ? 'fall' : semesterName.toLowerCase(),
        year: semesterYear._id,
        credits: version.credits === '' ? 0 : version.credits,
        isPlaceholder: placeholder,
        number: version.number,
        area: inspectedArea,
        preReq: version.preReq,
        expireAt:
          user._id === 'guestUser'
            ? Date.now() + 60 * 60 * 24 * 1000
            : undefined,
      };

      fetch(getAPI(window) + '/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
        .then((retrieved) => retrieved.json())
        .then(handlePostResponse);
    }
  };

  const handlePostResponse = (data) => {
    if (data.errors === undefined && version !== 'None') {
      // add course to currentPlanCourses
      let newUserCourse: UserCourse = data.data.course;
      dispatch(updateCurrentPlanCourses([...currentCourses, newUserCourse]));
      // add course to plan's year
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
      // add new plan to planList
      const newPlanList = [...planList];
      for (let i = 0; i < planList.length; i++) {
        if (planList[i]._id === newPlan._id) {
          newPlanList[i] = newPlan;
        }
      }
      // update modified distributions
      dispatch(updatePlanList(newPlanList));
      dispatch(updateDistributions(data.data.distributions));
      // close popups and notify user
      dispatch(updatePlanList(newPlanList));
      dispatch(updateAddingPrereq(false));
      dispatch(clearSearch());
      toast.success(version.title + ' added!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
      });
    } else {
      console.log('Failed to add', data.errors);
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

  return (
    <>
      <div onMouseLeave={() => setOpenAPInfoBox(false)}>
        <div className="flex flex-col font-medium h-yearheading">
          <div className="flex flex-row items-center justify-between px-0.5 py-1 h-yearheading1 bg-white">
            <div className="flex flex-row items-center w-full h-auto font-normal">
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
                <div className="text-sm">{getSemesterName()}</div>
              )}{' '}
              {courses.length !== 0 && totalCredits !== 0 ? (
                <>
                  <div
                    className={clsx(
                      { 'bg-red-200': totalCredits < 12 },
                      { 'bg-yellow-200': totalCredits > 18 },
                      {
                        'bg-green-200':
                          totalCredits <= 18 && totalCredits >= 12,
                      },
                      ' flex flex-row items-center justify-center ml-1 px-1 w-auto text-black text-xs bg-white rounded',
                    )}
                    data-tip={getCreditString()}
                    data-for="godTip"
                  >
                    {totalCredits}
                  </div>
                </>
              ) : null}
            </div>
            {!addingPrereqStatus ? (
              <div
                className="flex flex-row items-center justify-center text-white bg-green-400 rounded-md cursor-pointer group hover:bg-blue-400"
                onClick={addCourse}
              >
                <PlusIcon className="w-6 h-6 stroke-2 group-hover:text-white" />
              </div>
            ) : (
              <button
                className="z-40 w-24 py-1 text-xs text-white transition duration-150 ease-in transform bg-green-400 rounded hover:bg-blue-400 focus:outline-none hover:scale-101"
                onClick={addPrereq}
              >
                Add Here
              </button>
            )}
          </div>
          <div className="w-full h-px bg-gradient-to-r from-blue-500 to-green-400"></div>
        </div>
        <div id={semesterName + '|' + semesterYear._id}>
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
                {getDraggables()}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          {openAPInfoBox ? (
            <div className="absolute p-2 -mt-48 -ml-6 bg-gray-100 rounded shadow select-text w-72">
              These are courses transferred over from AP tests that you've
              taken! Find out equivalent courses your scores cover for{' '}
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
          ) : null}
        </div>
      </div>
    </>
  );
};

const getListStyle = (isDraggingOver: any) => ({
  background: isDraggingOver ? 'skyblue' : 'transparent',
});

export default VSemester;
