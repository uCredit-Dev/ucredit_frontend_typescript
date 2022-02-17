import { useState, useEffect, FC } from 'react';
import {
  DroppableType,
  Plan,
  SemesterType,
  UserCourse,
  Year,
} from '../../../../resources/commonTypes';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearSearch,
  selectInspectedCourse,
  selectPlaceholder,
  selectVersion,
  updateSearchStatus,
  updateSearchTime,
} from '../../../../slices/searchSlice';
import { ReactComponent as AddSvg } from '../../../../resources/svg/Add.svg';
import { Droppable } from 'react-beautiful-dnd';
import {
  selectCurrentPlanCourses,
  selectPlan,
  updateCurrentPlanCourses,
  updateDroppables,
  updateSelectedPlan,
} from '../../../../slices/currentPlanSlice';
import ReactTooltip from 'react-tooltip';
import clsx from 'clsx';
import CourseDraggable from './CourseDraggable';
import {
  selectAddingPrereq,
  updateAddingPrereq,
} from '../../../../slices/popupSlice';
import { toast } from 'react-toastify';
import { api } from '../../../../resources/assets';
import {
  selectUser,
  selectPlanList,
  updatePlanList,
} from '../../../../slices/userSlice';
import { ReactComponent as Question } from '../../../../resources/svg/Question.svg';

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
}> = ({ semesterName, semesterYear, courses, display }) => {
  // Redux setup
  const dispatch = useDispatch();
  const addingPrereqStatus = useSelector(selectAddingPrereq);
  const version = useSelector(selectVersion);
  const user = useSelector(selectUser);
  const currentPlan = useSelector(selectPlan);
  const planList = useSelector(selectPlanList);
  const placeholder = useSelector(selectPlaceholder);
  const currentCourses = useSelector(selectCurrentPlanCourses);
  const inspected = useSelector(selectInspectedCourse);

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
        <CourseDraggable
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
    updateDistributions();
    dispatch(clearSearch());
  };

  /**
   * Updates distribution bars upon successfully adding a course.
   */
  const updateDistributions = (): void => {
    if (version !== 'None') {
      const body = {
        user_id: user._id,
        year_id: semesterYear._id,
        plan_id: currentPlan._id,
        title: version.title,
        term: semesterName === 'All' ? 'fall' : semesterName.toLowerCase(),
        year: semesterYear._id,
        credits: version.credits === '' ? 0 : version.credits,
        distribution_ids: currentPlan.distribution_ids,
        isPlaceholder: placeholder,
        number: version.number,
        area: inspectedArea,
        preReq: version.preReq,
        expireAt:
          user._id === 'guestUser'
            ? Date.now() + 60 * 60 * 24 * 1000
            : undefined,
      };

      fetch(api + '/courses', {
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
      let newUserCourse: UserCourse;
      newUserCourse = { ...data.data };
      dispatch(updateCurrentPlanCourses([...currentCourses, newUserCourse]));
      const allYears: Year[] = [...currentPlan.years];
      const newYears: Year[] = [];
      allYears.forEach((y) => {
        if (y._id === semesterYear._id) {
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
        <div className="flex flex-row text-gray-600 font-semibold">
          Fall
          <div className="ml-1 font-light">{semesterYear.year}</div>
        </div>
      );
    else if (semesterName === 'Intersession')
      return (
        <div className="flex flex-row text-gray-600 font-semibold">
          Intersession
          <div className="ml-1 font-light">{semesterYear.year + 1}</div>
        </div>
      );
    else if (semesterName === 'Spring')
      return (
        <div className="flex flex-row text-gray-600 font-semibold">
          Spring
          <div className="ml-1 font-light">{semesterYear.year + 1}</div>
        </div>
      );
    else
      return (
        <div className="flex flex-row text-gray-600 font-semibold">
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
          <Question
            className="h-4 fill-gray"
            onClick={() => setOpenAPInfoBox(!openAPInfoBox)}
          />
          <div className="flex flex-row text-gray-600 font-semibold text-sm">
            Equivalents
            <div className="ml-1">{'≤'}</div>
            <div className="font-light">{semesterYear.year}</div>
          </div>
        </>
      ) : (
        <div className="text-md">{getSemesterName()}</div>
      )}{' '}
      {courses.length !== 0 && totalCredits !== 0 ? (
        <>
          <div
            className={clsx(
              { 'bg-red-200': totalCredits < 12 },
              { 'bg-yellow-200': totalCredits > 18 },
              {
                'bg-green-200': totalCredits <= 18 && totalCredits >= 12,
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
    </>
  );

  /**
   * Check if semester is valid for adding course
   */
  const checkSemester = (): boolean => {
    if (semesterName === 'All') return true;
    if (inspected !== 'None') {
      for (let term of inspected.terms) {
        if (term.includes(semesterName)) {
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
          className="group flex flex-row items-center justify-center rounded-md cursor-pointer"
          onClick={addCourse}
        >
          <AddSvg className="w-4 h-4 group-hover:text-sky-700 stroke-2" />
        </div>
      ) : (
        (() =>
          checkSemester() ? (
            <button
              className="py-1 z-40 w-24 text-white text-xs hover:bg-secondary bg-primary rounded focus:outline-none transform hover:scale-101 transition duration-150 ease-in"
              onClick={addPrereq}
            >
              Add Here
            </button>
          ) : null)()
      )}
    </>
  );

  /**
   * Displays AP info box.
   */
  const getAPInfoBox = (): JSX.Element => (
    <>
      {openAPInfoBox ? (
        <div className="absolute -ml-6 -mt-48 p-2 w-72 bg-gray-100 rounded shadow select-text">
          These are courses transferred over from AP tests that you've taken!
          Find out equivalent courses your scores cover for{' '}
          <a
            className="text-blue-400 underline font-bold"
            target="_blank"
            rel="noreferrer"
            href="https://e-catalogue.jhu.edu/arts-sciences/full-time-residential-programs/undergraduate-policies/academic-policies/external-credit/#examcredittext"
          >
            here
          </a>
          .
        </div>
      ) : null}
    </>
  );

  return (
    <>
      {!display ? null : (
        <div onMouseLeave={() => setOpenAPInfoBox(false)}>
          <div className="flex flex-col max-w-yearheading h-yearheading font-medium">
            <div className="flex flex-row items-center justify-between px-2 py-1 h-yearheading1 bg-white">
              <div className="flex flex-row items-center w-full h-auto font-normal gap-3">
                {getSemesterTitle()}
              </div>
              {getSemesterAddButton()}
            </div>
            <div className="w-full h-px bg-primary"></div>
          </div>
          <div id={semesterName + '|' + semesterYear._id} className="mr-11">
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
            {getAPInfoBox()}
          </div>
        </div>
      )}
    </>
  );
};

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? '#F3F3F3' : 'transparent',
});

export default Semester;
