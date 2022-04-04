import { useState, useEffect, FC } from 'react';
import Semester from './Semester';
import {
  ReviewMode,
  UserCourse,
  Year,
} from '../../../../resources/commonTypes';
import { DotsVerticalIcon } from '@heroicons/react/outline';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectPlan,
  updateSelectedPlan,
} from '../../../../slices/currentPlanSlice';
import { getAPI, getColors } from '../../../../resources/assets';
import YearSettingsDropdown from './YearSettingsDropdown';
import clsx from 'clsx';
import {
  selectAddingPrereq,
  selectShowingCart,
} from '../../../../slices/popupSlice';
import { selectInspectedCourse } from '../../../../slices/searchSlice';

type SemSelected = {
  fall: boolean;
  spring: boolean;
  intersession: boolean;
  summer: boolean;
};

/**
 * A component displaying all the courses in a specific semester.
 * TODO: Modularize!!!
 *
 * @prop id - id of year
 * @prop year - the year designator
 * @prop courses - courses that belong to this year
 * @prop setDraggable - avtivates/deactivates draggability of year component
 */
const YearComponent: FC<{
  id: number;
  year: Year;
  courses: UserCourse[];
  setDraggable: (draggable: boolean) => void;
  mode: ReviewMode;
}> = ({ id, year, courses, setDraggable, mode }) => {
  // Component state setup.
  const [fallCourses, setFallCourses] = useState<UserCourse[]>([]);
  const [springCourses, setSpringCourses] = useState<UserCourse[]>([]);
  const [winterCourses, setWinterCourses] = useState<UserCourse[]>([]);
  const [summerCourses, setSummerCourses] = useState<UserCourse[]>([]);
  const [display, setDisplay] = useState<boolean>(false);
  const [yearName, setYearName] = useState<string>(year.name);
  const [editedName, setEditedName] = useState<boolean>(false);
  const [edittingName, setEdittingName] = useState<boolean>(false);
  const [collapse, setCollapse] = useState<boolean>(
    year.name === 'AP/Transfer',
  );
  const [totalCredits, setTotalCredits] = useState<number>(0);
  const [areaCredits, setAreaCredits] = useState({
    N: 0,
    Q: 0,
    E: 0,
    S: 0,
    H: 0,
    W: 0,
  });
  const [toShow, setToShow] = useState<SemSelected>({
    fall: true,
    spring: true,
    summer: true,
    intersession: true,
  });

  // Setting up redux
  const currentPlan = useSelector(selectPlan);
  const addingPrereqStatus = useSelector(selectAddingPrereq);
  const showingCart = useSelector(selectShowingCart);
  const inspected = useSelector(selectInspectedCourse);
  const dispatch = useDispatch();

  // Updates and parses all courses into semesters whenever the current plan or courses array changes.
  useEffect(() => {
    // For each of the user's courses for this year, put them in their respective semesters.
    updateSemesterCourses();
    // Tracks total number of credits every year
    updateYearCreditDistribution();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courses, currentPlan, currentPlan.name]);

  useEffect(() => {
    if (showingCart) setCollapse(false);
  }, [showingCart]);

  // Focuses on year name after clicking edit name option.
  useEffect(() => {
    if (edittingName) {
      document.getElementById(year._id + 'input')?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [edittingName]);

  // Only edits name if editName is true. If true, calls debounce update function
  useEffect(() => {
    if (editedName) {
      const update = setTimeout(updateName, 1000);
      return () => clearTimeout(update);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yearName]);

  /**
   * Updates the credit distribution of the year.
   */
  const updateYearCreditDistribution = () => {
    const newCreditCount = {
      N: 0,
      Q: 0,
      E: 0,
      S: 0,
      H: 0,
      W: 0,
    };
    let count: number = 0;
    courses.forEach((course) => {
      count += course.credits;
      if (course.area !== 'None') {
        for (let area of course.area) {
          switch (area) {
            case 'N':
              newCreditCount.N += course.credits;
              break;
            case 'Q':
              newCreditCount.Q += course.credits;
              break;
            case 'E':
              newCreditCount.E += course.credits;
              break;
            case 'H':
              newCreditCount.H += course.credits;
              break;
            case 'S':
              newCreditCount.S += course.credits;
              break;
          }
        }
      }
      if (course.wi) {
        newCreditCount.W += course.credits;
      }
    });
    setTotalCredits(count);
    setAreaCredits(newCreditCount);
  };

  /**
   * Populates semester courses based on the courses array.
   */
  const updateSemesterCourses = (): void => {
    const parsedFallCourses: UserCourse[] = [];
    const parsedSpringCourses: UserCourse[] = [];
    const parsedIntersessionCourses: UserCourse[] = [];
    const parsedSummerCourses: UserCourse[] = [];
    courses.forEach((course) => {
      if (course.term.toLowerCase() === 'fall') {
        parsedFallCourses.push(course);
      } else if (course.term.toLowerCase() === 'spring') {
        parsedSpringCourses.push(course);
      } else if (course.term.toLowerCase() === 'summer') {
        parsedSummerCourses.push(course);
      } else if (course.term.toLowerCase() === 'intersession') {
        parsedIntersessionCourses.push(course);
      }
    });
    setFallCourses(parsedFallCourses);
    setSpringCourses(parsedSpringCourses);
    setWinterCourses(parsedIntersessionCourses);
    setSummerCourses(parsedSummerCourses);
  };

  /**
   * Update the name of the year
   */
  const updateName = () => {
    const body = {
      year_id: year._id,
      name: yearName,
    };
    fetch(getAPI(window) + '/years/updateName', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(() => {
        const newUpdatedYear = { ...year, name: yearName };
        const newYearArray = [...currentPlan.years].map((yr) =>
          yr._id === year._id ? newUpdatedYear : yr,
        );
        const newUpdatedPlan = { ...currentPlan, years: newYearArray };
        dispatch(updateSelectedPlan(newUpdatedPlan));
        setEditedName(false);
      })
      .catch((err) => console.log(err));
  };

  /**
   * Updates temporary year name and notifies useffect on state change to update db plan name with debounce.
   * @param event - produced from changes to dropdown
   */
  const handleYearNameChange = (event: any) => {
    setYearName(event.target.value);
    setEditedName(true);
  };

  /**
   * Gets start year of a semester for this year.
   * @param semesterName - semester to check.
   * @returns the year that the semester starts in.
   */
  const getYear = (semesterName): string => {
    if (semesterName === 'Fall' || semesterName === 'Winter') {
      return year.year.toString();
    } else {
      return (year.year + 1).toString();
    }
  };

  /**
   * Check if semester is valid for adding course
   */
  const checkSemester = (semesterName: string): boolean => {
    if (inspected !== 'None') {
      for (let term of inspected.terms) {
        if (
          term.includes(semesterName) &&
          (term.includes(getYear(semesterName)) ||
            new Date().getFullYear() <= year.year)
        ) {
          return true;
        }
      }
    }
    return false;
  };

  const getDisplayedSemesters = (tmpCollapse: boolean): JSX.Element[] => {
    const semesters: JSX.Element[] = [];

    if (toShow.fall)
      semesters.push(
        <div
          key={'Fall' + year._id}
          className={clsx(`mb-3 h-auto pr-1 rounded`, {
            'z-50': addingPrereqStatus && checkSemester('Fall'),
          })}
        >
          <Semester
            semesterName="Fall"
            semesterYear={year}
            courses={fallCourses}
            display={true}
            mode={mode}
          />
        </div>,
      );
    if (toShow.intersession)
      semesters.push(
        <div
          key={'Winter' + year._id}
          className={clsx(`mb-3 h-auto pr-1 rounded`, {
            'z-50': addingPrereqStatus && checkSemester('Winter'),
          })}
        >
          <Semester
            semesterName="Intersession"
            semesterYear={year}
            courses={winterCourses}
            display={true}
            mode={mode}
          />
        </div>,
      );
    if (toShow.spring)
      semesters.push(
        <div
          key={'Spring' + year._id}
          className={clsx(`mb-3 h-auto pr-1 rounded`, {
            'z-50': addingPrereqStatus && checkSemester('Spring'),
          })}
        >
          <Semester
            semesterName="Spring"
            semesterYear={year}
            courses={springCourses}
            display={true}
            mode={mode}
          />
        </div>,
      );
    if (toShow.summer)
      semesters.push(
        <div
          key={'Summer' + year._id}
          className={clsx(`mb-3 h-auto pr-1 rounded`, {
            'z-50': addingPrereqStatus && checkSemester('Summer'),
          })}
        >
          <Semester
            semesterName="Summer"
            semesterYear={year}
            courses={summerCourses}
            display={true}
            mode={mode}
          />
        </div>,
      );
    return tmpCollapse ? [] : semesters;
  };

  /**
   * Get semester, return AP Equivalents if id is 0
   */
  const getSemester = () => {
    return (
      <>
        {id !== 0 ? (
          <div className="flex flex-row thin:flex-col w-full flex-wrap">
            {getDisplayedSemesters(collapse)}
          </div>
        ) : (
          <div
            key={'AP' + year._id}
            className={clsx(`relative mb-3 w-full h-auto pr-1 rounded`, {
              'z-50': addingPrereqStatus,
            })}
          >
            <Semester
              semesterName="All"
              semesterYear={year}
              courses={fallCourses}
              display={true}
              mode={mode}
            />
          </div>
        )}
      </>
    );
  };

  /**
   * Get semester, return null if id is 0
   */
  const getSemesterWNull = () => (
    <>
      {id !== 0 && (
        <div className="flex flex-row">{getDisplayedSemesters(collapse)}</div>
      )}
    </>
  );

  return (
    <div
      id={id.toString()}
      className={clsx(
        'py-2 max-w-year-heading w-full min-w-[14rem] border-b-[2px]',
        { 'cursor-move': !mode || mode !== ReviewMode.View },
        { 'z-30': addingPrereqStatus },
      )}
      onMouseLeave={() => {
        setDraggable(true);
        setDisplay(false);
      }}
      onMouseEnter={() => {
        setDraggable(false);
      }}
    >
      <div className="flex flex-col w-full mt-1 font-medium h-yearheading">
        <div className="flex flex-row w-full gap-2 text-zinc-700">
          <div className="mr-1 text-lg font-thin">
            {collapse ? (
              <button
                className="mt-2 text-sky-500"
                onClick={() => setCollapse(!collapse)}
              >
                ▶
              </button>
            ) : (
              <button
                className="mt-2 text-sky-500"
                onClick={() => setCollapse(!collapse)}
              >
                ▼
              </button>
            )}
          </div>
          {edittingName ? (
            <input
              id={year._id + 'input'}
              value={yearName}
              className={clsx(
                { 'cursor-move': !mode || mode !== ReviewMode.View },
                'flex-grow mt-auto font-semibold bg-transparent border-b border-transparent select-none text-md focus:border-gray-400 focus:outline-none',
              )}
              onChange={handleYearNameChange}
              onBlur={() => setEdittingName(false)}
            />
          ) : (
            <div
              className={clsx(
                { 'cursor-move': !mode || mode !== ReviewMode.View },
                'flex-grow mt-auto text-xl font-semibold bg-transparent border-b border-transparent select-none focus:border-gray-400 focus:outline-none',
              )}
            >
              {yearName}
            </div>
          )}
          <div className="flex flex-row gap-8">
            <div className="flex flex-row gap-3 mt-2 text-sm font-medium">
              {areaCredits.N > 0 && (
                <div className="flex flex-row gap-1">
                  {areaCredits.N}
                  <div
                    className="w-3 mb-2 font-bold text-center rounded"
                    style={{ backgroundColor: getColors('N', false) }}
                  >
                    N
                  </div>
                </div>
              )}
              {areaCredits.Q > 0 && (
                <div className="flex flex-row gap-1">
                  {areaCredits.Q}
                  <div
                    className="w-3 mb-2 font-bold text-center rounded"
                    style={{ backgroundColor: getColors('Q', false) }}
                  >
                    Q
                  </div>
                </div>
              )}
              {areaCredits.E > 0 && (
                <div className="flex flex-row gap-1">
                  {areaCredits.E}
                  <div
                    className="w-3 mb-2 font-bold text-center rounded"
                    style={{ backgroundColor: getColors('E', false) }}
                  >
                    E
                  </div>
                </div>
              )}
              {areaCredits.H > 0 && (
                <div className="flex flex-row gap-1">
                  {areaCredits.H}
                  <div
                    className="w-3 mb-2 font-bold text-center rounded"
                    style={{ backgroundColor: getColors('H', false) }}
                  >
                    H
                  </div>
                </div>
              )}
              {areaCredits.S > 0 && (
                <div className="flex flex-row gap-1">
                  {areaCredits.S}
                  <div
                    className="w-3 mb-2 font-bold text-center rounded"
                    style={{ backgroundColor: getColors('S', false) }}
                  >
                    S
                  </div>
                </div>
              )}
              {areaCredits.W > 0 && (
                <div className="flex flex-row gap-1">
                  {areaCredits.W}
                  <div
                    className="mb-2 font-bold text-center rounded"
                    style={{ backgroundColor: getColors('None', true) }}
                  >
                    W
                  </div>
                </div>
              )}
              <div className="font-bold">{totalCredits} Credits</div>
            </div>
            {(!mode || mode !== ReviewMode.View) && (
              <DotsVerticalIcon
                onClick={() => setDisplay(!display)}
                className="cursor-pointer stroke-2 w-7"
              />
            )}
          </div>
        </div>
        {display && (
          <YearSettingsDropdown
            year={year}
            setToShow={setToShow}
            setDisplay={setDisplay}
            toShow={toShow}
            setEdittingName={setEdittingName}
            id={id}
          />
        )}
      </div>
      {collapse ? (
        <div
          className="bg-white rounded cursor-default"
          onMouseLeave={() => setDraggable(false)}
          onMouseEnter={() => setDraggable(true)}
        >
          {getSemesterWNull()}
        </div>
      ) : (
        <div
          className="px-6 py-2 bg-white rounded cursor-default"
          onMouseLeave={() => setDraggable(false)}
          onMouseEnter={() => setDraggable(true)}
        >
          {getSemester()}
        </div>
      )}
    </div>
  );
};

export default YearComponent;
