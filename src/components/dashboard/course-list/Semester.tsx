import React, { useState, useEffect } from "react";
import {
  DroppableType,
  Plan,
  SemesterType,
  UserCourse,
  Year,
} from "../../../resources/commonTypes";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSearch,
  selectPlaceholder,
  selectVersion,
  updateSearchStatus,
  updateSearchTime,
} from "../../../slices/searchSlice";
import { ReactComponent as AddSvg } from "../../../resources/svg/Add.svg";
import { ReactComponent as ArrowUp } from "../../../resources/svg/ArrowUp.svg";
import { ReactComponent as ArrowDown } from "../../../resources/svg/ArrowDown.svg";
import { Droppable } from "react-beautiful-dnd";
import {
  selectCurrentPlanCourses,
  selectPlan,
  updateCurrentPlanCourses,
  updateDroppables,
  updateSelectedPlan,
} from "../../../slices/currentPlanSlice";
import ReactTooltip from "react-tooltip";
import clsx from "clsx";
import CourseDraggable from "./CourseDraggable";
import {
  selectAddingPrereq,
  updateAddingPrereq,
} from "../../../slices/popupSlice";
import { toast } from "react-toastify";
import { api } from "../../../resources/assets";
import {
  selectUser,
  selectPlanList,
  updatePlanList,
} from "../../../slices/userSlice";

type semesterProps = {
  customStyle: string;
  semesterName: SemesterType;
  semesterYear: Year;
  courses: UserCourse[];
};

/**
 * A component displaying all the courses in a specific semester.
 * @prop courses - all the courses in the semester
 * @prop semesterYear - year this semester is part of
 * @prop semesterName - name of the semester
 * @prop customStyle - custom styling for the semester
 */
function Semester({
  customStyle,
  semesterName,
  semesterYear,
  courses,
}: semesterProps) {
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
  const [display, setDisplay] = useState<boolean>(true);
  const [totalCredits, setTotalCredits] = useState<number>(0);
  const [semesterCourses, setSemesterCourses] = useState<UserCourse[]>([]);
  const [onHover, setOnHover] = useState<boolean>(false);
  const [inspectedArea, setInspectedArea] = useState<string>("None");

  useEffect(() => {
    ReactTooltip.rebuild();
  }, [courses.length, totalCredits]);

  // Every time any courses within this semester changes, update total credit count and the list.
  useEffect(() => {
    if (version !== "None") {
      setInspectedArea(version.areas.charAt(0));
    }
    const sortedCourses: UserCourse[] = [
      ...courses.sort((course1: UserCourse, course2: UserCourse) =>
        course2._id.localeCompare(course1._id)
      ),
    ];
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
      })
    );
  };

  /**
   * Gets a list of course components wrapped in a DnD draggable.
   * @returns a list of draggable react components
   */
  const getDraggables = (): any => {
    return semesterCourses.map((course, index) => (
      <CourseDraggable
        course={course}
        index={index}
        semesterName={semesterName}
        semesterYear={semesterYear}
      />
    ));
  };

  /**
   * Gets a tool-tip that tells you how much credits are in your semester and a broad suggestion on its maneageability.
   * @returns the credit string tooltip
   */
  const getCreditString = (): string => {
    let string = `<div>${totalCredits} Credits</div>`;
    if (totalCredits < 12) string += "\nMore than 12 credits required!";
    else if (totalCredits > 18)
      string += "\nCritical credit count reached! Check with your advisor!";
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
    let newUserCourse: UserCourse;
    if (version !== "None") {
      const body = {
        user_id: user._id,
        year_id: semesterYear._id,
        plan_id: currentPlan._id,
        title: version.title,
        term: semesterName.toLowerCase(),
        year: semesterYear._id,
        credits: version.credits === "" ? 0 : version.credits,
        distribution_ids: currentPlan.distribution_ids,
        isPlaceholder: placeholder,
        number: version.number,
        area: inspectedArea,
        preReq: version.preReq,
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
            toast.success(version.title + " added!", {
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
    <>
      <div
        className={clsx(`${customStyle} mb-3 w-full h-auto pr-1 rounded`, {
          "z-50": addingPrereqStatus,
        })}
      >
        <div className="flex flex-col h-yearheading font-medium">
          <div className="flex flex-row items-center justify-between px-0.5 py-1 h-yearheading1 bg-white">
            <div
              className={clsx(
                "mt-1 h-5 rounded transform duration-150 ease-in",
                {
                  "mr-1 h-5 bg-blue-400": onHover,
                }
              )}
              onMouseEnter={() => setOnHover(true)}
              onMouseLeave={() => setOnHover(false)}
            >
              {display ? (
                <ArrowDown
                  className={clsx(
                    "py-auto m-auto h-0 text-white cursor-pointer transform duration-150 ease-in",
                    {
                      "h-5": onHover,
                    }
                  )}
                  onClick={() => setDisplay(false)}
                />
              ) : (
                <ArrowUp
                  className={clsx(
                    "py-auto m-auto h-0 text-white cursor-pointer transform duration-150 ease-in",
                    {
                      "h-5": onHover,
                    }
                  )}
                  onClick={() => setDisplay(true)}
                />
              )}
            </div>
            <div
              className="flex flex-row items-center w-full h-auto font-normal select-none"
              onMouseLeave={() => setOnHover(false)}
              onMouseEnter={() => setOnHover(true)}
            >
              {semesterName === "Fall"
                ? "Fall"
                : semesterName === "Intersession"
                ? "Intersession"
                : semesterName === "Spring"
                ? "Spring"
                : "Summer"}{" "}
              {courses.length !== 0 && totalCredits !== 0 ? (
                <>
                  <div
                    className={clsx(
                      { "bg-red-200": totalCredits < 12 },
                      { "bg-yellow-200": totalCredits > 18 },
                      {
                        "bg-green-200":
                          totalCredits <= 18 && totalCredits >= 12,
                      },
                      "flex flex-row items-center justify-center ml-1 px-1 w-auto text-black text-xs bg-white rounded transform hover:scale-125 transition duration-200 ease-in"
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
                className="group flex flex-row items-center justify-center text-white hover:bg-blue-400 bg-gray-100 bg-green-400 rounded-md cursor-pointer transform hover:scale-105 transition duration-150 ease-in"
                onClick={addCourse}
              >
                <AddSvg className="w-6 h-6 group-hover:text-white stroke-2" />
              </div>
            ) : (
              <button
                className="w-20 text-xs bg-blue-300 rounded focus:outline-none"
                onClick={addPrereq}
              >
                Add Here
              </button>
            )}
          </div>
          <div className="w-full h-px bg-gradient-to-r from-blue-500 to-green-400"></div>
        </div>
        <div id={semesterName + "|" + semesterYear._id}>
          <Droppable
            droppableId={semesterName + "|" + semesterYear._id}
            type="COURSE"
          >
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                className="rounded"
              >
                {display ? <>{getDraggables()}</> : null}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </>
  );
}

const getListStyle = (isDraggingOver: any) => ({
  background: isDraggingOver ? "skyblue" : "lightblue",
});

export default Semester;
