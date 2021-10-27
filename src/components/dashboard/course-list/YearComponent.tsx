import { useState, useEffect, FC } from "react";
import Semester from "./Semester";
import { UserCourse, Year } from "../../../resources/commonTypes";
import { ReactComponent as MoreSvg } from "../../../resources/svg/More.svg";
import { useSelector, useDispatch } from "react-redux";
import {
  selectPlan,
  updateSelectedPlan,
} from "../../../slices/currentPlanSlice";
import { api } from "../../../resources/assets";
import YearSettingsDropdown from "./YearSettingsDropdown";

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
 * @prop customStyle - style object for year
 * @prop year - the year designator
 * @prop courses - courses that belong to this year
 * @prop setDraggable - avtivates/deactivates draggability of year component
 */
const YearComponent: FC<{
  id: number;
  customStyle: string;
  year: Year;
  courses: UserCourse[];
  setDraggable: Function;
}> = ({ id, customStyle, year, courses, setDraggable }) => {
  // Component state setup.
  const [fallCourses, setFallCourses] = useState<UserCourse[]>([]);
  const [springCourses, setSpringCourses] = useState<UserCourse[]>([]);
  const [winterCourses, setWinterCourses] = useState<UserCourse[]>([]);
  const [summerCourses, setSummerCourses] = useState<UserCourse[]>([]);
  const [display, setDisplay] = useState<boolean>(false);
  const [yearName, setYearName] = useState<string>(year.name);
  const [editedName, setEditedName] = useState<boolean>(false);
  const [edittingName, setEdittingName] = useState<boolean>(false);
  const [toShow, setToShow] = useState<SemSelected>({
    fall: true,
    spring: true,
    summer: true,
    intersession: true,
  });

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
      if (course.term.toLowerCase() === "fall") {
        parsedFallCourses.push(course);
      } else if (course.term.toLowerCase() === "spring") {
        parsedSpringCourses.push(course);
      } else if (course.term.toLowerCase() === "summer") {
        parsedSummerCourses.push(course);
      } else if (course.term.toLowerCase() === "intersession") {
        parsedIntersessionCourses.push(course);
      }
    });
    setFallCourses(parsedFallCourses);
    setSpringCourses(parsedSpringCourses);
    setWinterCourses(parsedIntersessionCourses);
    setSummerCourses(parsedSummerCourses);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courses, currentPlan, currentPlan.name]);

  // Focuses on year name after clicking edit name option.
  useEffect(() => {
    if (edittingName) {
      document.getElementById(year._id + "input")?.focus();
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
    fetch(api + "/years/updateName", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then(() => {
        const newUpdatedYear = { ...year, name: yearName };
        const newYearArray = [...currentPlan.years].map((yr) =>
          yr._id === year._id ? newUpdatedYear : yr
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

  return (
    <div
      id={id.toString()}
      className={
        customStyle + "cursor-move p-2 rounded mb-4 bg-blue-400 rounded shadow"
      }
      onMouseLeave={() => {
        setDraggable(true);
        setDisplay(false);
      }}
      onMouseEnter={() => {
        setDraggable(false);
      }}
    >
      <div className="flex flex-col mt-1 w-full min-w-yearMin max-w-yearheading h-yearheading font-medium">
        <div className="flex flex-row w-full text-white drop-shadow-lg">
          <div className="mr-1 text-xl font-thin">✥</div>
          {edittingName ? (
            <input
              id={year._id + "input"}
              value={yearName}
              className="flex-shrink mt-auto w-full text-lg font-semibold bg-transparent border-b focus:border-gray-400 border-transparent focus:outline-none cursor-move select-none"
              onChange={handleYearNameChange}
              onBlur={() => {
                setEdittingName(false);
              }}
            />
          ) : (
            <div className="flex-shrink mt-auto w-full text-lg font-semibold bg-transparent border-b focus:border-gray-400 border-transparent focus:outline-none cursor-move select-none">
              {yearName}
            </div>
          )}
          <MoreSvg
            onClick={() => {
              setDisplay(!display);
            }}
            className="mt-0.5 w-8 stroke-2 cursor-pointer"
          />
          <div>
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
        </div>
      </div>
      <div
        className="p-2 bg-white rounded shadow cursor-default"
        onMouseLeave={() => setDraggable(false)}
        onMouseEnter={() => setDraggable(true)}
      >
        {id !== 0 ? (
          <div className="flex flex-col items-center">
            {toShow.fall ? (
              <Semester
                customStyle=""
                semesterName="Fall"
                semesterYear={year}
                courses={fallCourses}
                apEquivalent={false}
              />
            ) : null}{" "}
            {toShow.intersession ? (
              <Semester
                customStyle=""
                semesterName="Intersession"
                semesterYear={year}
                courses={winterCourses}
                apEquivalent={false}
              />
            ) : null}{" "}
            {toShow.spring ? (
              <Semester
                customStyle=""
                semesterName="Spring"
                semesterYear={year}
                courses={springCourses}
                apEquivalent={false}
              />
            ) : null}{" "}
            {toShow.summer ? (
              <Semester
                customStyle=""
                semesterName="Summer"
                semesterYear={year}
                courses={summerCourses}
                apEquivalent={false}
              />
            ) : null}
          </div>
        ) : (
          <Semester
            customStyle=""
            semesterName="Fall"
            semesterYear={year}
            courses={fallCourses}
            apEquivalent={true}
          />
        )}
      </div>
    </div>
  );
};

export default YearComponent;
