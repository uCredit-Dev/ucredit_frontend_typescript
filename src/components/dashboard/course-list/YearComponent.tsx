import { useState, useEffect, FC } from 'react';
import Semester from './Semester';
import { UserCourse, Year } from '../../../resources/commonTypes';
import { ReactComponent as MoreSvg } from '../../../resources/svg/More.svg';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectPlan,
  updateSelectedPlan,
} from '../../../slices/currentPlanSlice';
import { api, course_tags } from '../../../resources/assets';
import YearSettingsDropdown from './YearSettingsDropdown';
import clsx from 'clsx';
import { selectAddingPrereq } from '../../../slices/popupSlice';
import { getColors } from '../../../resources/assets';

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
}> = ({ id, year, courses, setDraggable }) => {
  // Component state setup.
  const [fallCourses, setFallCourses] = useState<UserCourse[]>([]);
  const [springCourses, setSpringCourses] = useState<UserCourse[]>([]);
  const [winterCourses, setWinterCourses] = useState<UserCourse[]>([]);
  const [summerCourses, setSummerCourses] = useState<UserCourse[]>([]);
  const [display, setDisplay] = useState<boolean>(false);
  const [yearName, setYearName] = useState<string>(year.name);
  const [editedName, setEditedName] = useState<boolean>(false);
  const [edittingName, setEdittingName] = useState<boolean>(false);
  const [collapse, setCollapse] = useState<boolean>(true);
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
  const addingPrereqStatus = useSelector(selectAddingPrereq);

  // Setting up redux
  const currentPlan = useSelector(selectPlan);
  const dispatch = useDispatch();

  // Updates and parses all courses into semesters whenever the current plan or courses array changes.
  useEffect(() => {
    // For each of the user's courses for this year, put them in their respective semesters.
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
    // Tracks total number of credits every year
    let count: number = 0;
    courses.forEach((course) => {
      count += course.credits;
      if (course.area !== 'None') {
        for (let i = 0; i < course.area.length; i++) {
          switch (course.area[i]) {
            case 'N':
              setAreaCredits((previousState) => {
                return {
                  ...previousState,
                  N: previousState.N + course.credits,
                };
              });
              break;
            case 'Q':
              setAreaCredits((previousState) => {
                return {
                  ...previousState,
                  Q: previousState.Q + course.credits,
                };
              });
              break;
            case 'E':
              setAreaCredits((previousState) => {
                return {
                  ...previousState,
                  E: previousState.E + course.credits,
                };
              });
              break;
            case 'H':
              setAreaCredits((previousState) => {
                return {
                  ...previousState,
                  H: previousState.H + course.credits,
                };
              });
              break;
            case 'S':
              setAreaCredits((previousState) => {
                return {
                  ...previousState,
                  S: previousState.S + course.credits,
                };
              });
              break;
          }
          if (course.wi) {
            setAreaCredits((previousState) => {
              return { ...previousState, W: previousState.W + course.credits };
            });
          }
        }
      }
    });
    setTotalCredits(count);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courses, currentPlan, currentPlan.name]);

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
   * Update the name of the year
   */
  const updateName = () => {
    const body = {
      year_id: year._id,
      name: yearName,
    };
    fetch(api + '/years/updateName', {
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

  const getDisplayedSemesters = (tmpCollapse: boolean): JSX.Element[] => {
    const semesters: JSX.Element[] = [];

    if (toShow.fall)
      semesters.push(
        <div
          key={'Fall' + year._id}
          className={clsx(`mb-3 w-full h-auto pr-1 rounded`, {
            'z-50': addingPrereqStatus,
          })}
        >
          <Semester
            semesterName="Fall"
            semesterYear={year}
            courses={fallCourses}
            display={true}
          />
        </div>,
      );
    if (toShow.intersession)
      semesters.push(
        <div
          key={'Winter' + year._id}
          className={clsx(`mb-3 w-full h-auto pr-1 rounded`, {
            'z-50': addingPrereqStatus,
          })}
        >
          <Semester
            semesterName="Intersession"
            semesterYear={year}
            courses={winterCourses}
            display={true}
          />
        </div>,
      );
    if (toShow.spring)
      semesters.push(
        <div
          key={'Spring' + year._id}
          className={clsx(`mb-3 w-full h-auto pr-1 rounded`, {
            'z-50': addingPrereqStatus,
          })}
        >
          <Semester
            semesterName="Spring"
            semesterYear={year}
            courses={springCourses}
            display={true}
          />
        </div>,
      );
    if (toShow.summer)
      semesters.push(
        <div
          key={'Summer' + year._id}
          className={clsx(`mb-3 w-full h-auto pr-1 rounded`, {
            'z-50': addingPrereqStatus,
          })}
        >
          <Semester
            semesterName="Summer"
            semesterYear={year}
            courses={summerCourses}
            display={true}
          />
        </div>,
      );
    return tmpCollapse ? [] : semesters;
  };

  return (
    <div
      id={id.toString()}
      className={
        'cursor-move p-2 max-w-year-heading w-full min-w-[14rem]' +
        (addingPrereqStatus ? 'z-30' : '')
      }
      onMouseLeave={() => {
        setDraggable(true);
        setDisplay(false);
      }}
      onMouseEnter={() => {
        setDraggable(false);
      }}
    >
      <div className="flex flex-col mt-1 w-full h-yearheading font-medium">
        <div className="flex flex-row w-full text-zinc-700 gap-2">
          <div className="mr-1 text-lg font-thin">
            {collapse ? (
              <button
                className="text-sky-500 mt-2"
                onClick={() => setCollapse(!collapse)}
              >
                ▶
              </button>
            ) : (
              <button
                className="text-sky-500 mt-2"
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
              className="flex-grow mt-auto text-md font-semibold bg-transparent border-b focus:border-gray-400 border-transparent focus:outline-none cursor-move select-none"
              onChange={handleYearNameChange}
              onBlur={() => {
                setEdittingName(false);
              }}
            />
          ) : (
            <div className="flex-grow mt-auto text-xl font-semibold bg-transparent border-b focus:border-gray-400 border-transparent focus:outline-none cursor-move select-none">
              {yearName}
            </div>
          )}
          <div className="flex flex-row gap-10">
            <div className="flex flex-row text-sm font-medium mt-2 gap-3">
              {areaCredits.N ? (
                <div className="flex flex-row gap-1">
                  {areaCredits.N}
                  <div
                    className="rounded text-center w-3 mb-2 font-bold"
                    style={{ backgroundColor: getColors('N', false) }}
                  >
                    N
                  </div>
                </div>
              ) : null}
              {areaCredits.Q ? (
                <div className="flex flex-row gap-1">
                  {areaCredits.Q}
                  <div
                    className="rounded text-center w-3 mb-2 font-bold"
                    style={{ backgroundColor: getColors('Q', false) }}
                  >
                    Q
                  </div>
                </div>
              ) : null}
              {areaCredits.E ? (
                <div className="flex flex-row gap-1">
                  {areaCredits.E}
                  <div
                    className="rounded text-center w-3 mb-2 font-bold"
                    style={{ backgroundColor: getColors('E', false) }}
                  >
                    E
                  </div>
                </div>
              ) : null}
              {areaCredits.H ? (
                <div className="flex flex-row gap-1">
                  {areaCredits.H}
                  <div
                    className="rounded text-center w-3 mb-2 font-bold"
                    style={{ backgroundColor: getColors('H', false) }}
                  >
                    H
                  </div>
                </div>
              ) : null}
              {areaCredits.S ? (
                <div className="flex flex-row gap-1">
                  {areaCredits.S}
                  <div
                    className="rounded text-center w-3 mb-2 font-bold"
                    style={{ backgroundColor: getColors('S', false) }}
                  >
                    S
                  </div>
                </div>
              ) : null}
              {areaCredits.W ? (
                <div className="flex flex-row gap-1">
                  {areaCredits.W}
                  <div
                    className="rounded text-center mb-2 font-bold"
                    style={{ backgroundColor: getColors('None', true) }}
                  >
                    W
                  </div>
                </div>
              ) : null}
              <div className="font-bold">{totalCredits} Credits</div>
            </div>
            <MoreSvg
              onClick={() => {
                setDisplay(!display);
              }}
              className="mt-0.5 w-8 stroke-2 cursor-pointer"
            />
          </div>
        </div>
        {display ? (
          <YearSettingsDropdown
            year={year}
            setToShow={setToShow}
            setDisplay={setDisplay}
            toShow={toShow}
            setEdittingName={setEdittingName}
            id={id}
          />
        ) : null}
      </div>
      {collapse ? (
        <div
          className="bg-white rounded cursor-default"
          onMouseLeave={() => setDraggable(false)}
          onMouseEnter={() => setDraggable(true)}
        >
          {id !== 0 ? (
            <div className="flex flex-row">
              {getDisplayedSemesters(collapse)}
            </div>
          ) : null
          // <Semester
          //   semesterName="All"
          //   semesterYear={year}
          //   courses={fallCourses}
          //   display={true}
          // />
          }
        </div>
      ) : (
        <div
          className="px-6 py-2 bg-white rounded cursor-default"
          onMouseLeave={() => setDraggable(false)}
          onMouseEnter={() => setDraggable(true)}
        >
          {id !== 0 ? (
            <div className="flex flex-row">
              {getDisplayedSemesters(collapse)}
            </div>
          ) : (
            <Semester
              semesterName="All"
              semesterYear={year}
              courses={fallCourses}
              display={true}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default YearComponent;
