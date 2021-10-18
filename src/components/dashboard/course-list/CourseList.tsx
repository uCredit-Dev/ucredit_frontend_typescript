import { useState, useEffect, FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  DroppableType,
  Plan,
  SemesterType,
  SISRetrievedCourse,
  UserCourse,
  Year,
} from "../../../resources/commonTypes";
import axios from "axios";
import {
  selectCurrentPlanCourses,
  selectDroppables,
  selectPlan,
  updateCurrentPlanCourses,
  updateSelectedPlan,
  updateTotalCredits,
} from "../../../slices/currentPlanSlice";
import {
  selectPlaceholder,
  selectSearchStatus,
} from "../../../slices/searchSlice";
import { newYearTemplate } from "./YearComponent";
import { ReactComponent as AddSvg } from "../../../resources/svg/Add.svg";
import { toast } from "react-toastify";
import {
  selectCourseCache,
  selectPlanList,
  selectUser,
  updatePlanList,
} from "../../../slices/userSlice";
import { api } from "../../../resources/assets";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import YearDraggable from "./YearDraggable";

/**
 * Container component that holds all the years, semesters, and courses of the current plan.
 * TODO: Cleanup and modularize
 */
const CourseList: FC = () => {
  // Setting up redux
  const dispatch = useDispatch();
  const currentPlan = useSelector(selectPlan);
  const user = useSelector(selectUser);
  const searching = useSelector(selectSearchStatus);
  const placeholder = useSelector(selectPlaceholder);
  const droppables = useSelector(selectDroppables);
  const currentPlanCourses = useSelector(selectCurrentPlanCourses);
  const planList = useSelector(selectPlanList);
  const courseCache = useSelector(selectCourseCache);

  // Component State setup.
  const [elements, setElements] = useState<JSX.Element[]>([]);
  const [currentPlanId, setCurrentPlanId] = useState<string>("");

  // Gets all courses for each year and generates year objects based on them.
  useEffect(() => {
    const jsx: JSX.Element[] = [];
    const totCourses: UserCourse[] = [];
    let totalCredits: number = 0;
    let noCourses: boolean = true;
    currentPlan.years.forEach((year: Year, yearIndex: number) => {
      const yearCourses: UserCourse[] = [];
      if (year.courses !== undefined) {
        setCurrentPlanId(currentPlan._id);
        if (year.courses.length === 0 || currentPlanId === currentPlan._id) {
          // We simply update courses
          year.courses.forEach((course: string) => {
            const courseObj: UserCourse = getUserCourse(course);
            if (courseObj._id === "invalid_course") return;
            totCourses.push(courseObj);
            yearCourses.push(courseObj);
          });
          jsx.push(
            <YearDraggable
              id={yearIndex}
              year={year}
              yearIndex={yearIndex}
              yearCourses={yearCourses}
            />
          );
          if (jsx.length === currentPlan.years.length) {
            jsx.sort(
              (el1: JSX.Element, el2: JSX.Element) =>
                el1.props.id - el2.props.id
            );
            dispatch(updateCurrentPlanCourses(totCourses));
            setElements(jsx);
          }
        } else if (currentPlanId !== currentPlan._id) {
          setCurrentPlanId(currentPlan._id);
          noCourses = false;
          year.courses.forEach((courseId: string) => {
            axios
              .get(api + "/courses/" + courseId)
              .then((resp) => {
                const course: UserCourse = resp.data.data;
                yearCourses.push(course);
                totCourses.push(course);
                totalCredits += course.credits;
                if (yearCourses.length === year.courses.length) {
                  // make all the updates here
                  jsx.push(
                    <YearDraggable
                      id={yearIndex}
                      year={year}
                      yearIndex={yearIndex}
                      yearCourses={yearCourses}
                    />
                  );
                  if (jsx.length === currentPlan.years.length) {
                    jsx.sort(
                      (el1: JSX.Element, el2: JSX.Element) =>
                        el1.props.id - el2.props.id
                    );
                    dispatch(updateCurrentPlanCourses(totCourses));
                    dispatch(updateTotalCredits(totalCredits));
                    setElements(jsx);
                  }
                }
              })
              .catch((err) => console.log(err));
          });
        }
      }
      // Handle empty courses
      if (yearIndex === currentPlan.years.length - 1 && noCourses) {
        dispatch(updateCurrentPlanCourses(totCourses));
        dispatch(updateTotalCredits(totalCredits));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlan, currentPlan._id, searching, placeholder]);

  /**
   * Gets course based on id. If course isn't found, returns empty course
   * @param id - course id
   * @returns user course that corresponds to the course id
   */
  const getUserCourse = (id: string): UserCourse => {
    let course: UserCourse = {
      _id: "invalid_course",
      title: "invalid course",
      number: "please refresh page",
      term: "Fall",
      credits: 0,
      department: "invalid",
      tags: [],
      area: "",
      wi: false,
      taken: false,
      ratings: [],
      distribution_ids: [],
      plan_id: "",
      user_id: "",
      year_id: "",
      preReq: [],
      isPlaceholder: false,
      version: "",
    };
    currentPlanCourses.forEach((c: UserCourse) => {
      if (c._id === id) {
        course = c;
        return;
      }
    });
    return course;
  };

  /**
   * Adds a new year, if preUni is true, add to the start of the plan, otherwise add to the end
   * @param preUniversity - whether the new year is a pre uni year
   */
  const addNewYear = (preUniversity: boolean): void => {
    if (currentPlan.years.length < 8) {
      const body = {
        name: newYearTemplate.name,
        plan_id: currentPlan._id,
        preUniversity: preUniversity,
        user_id: user._id,
        expireAt:
          user._id === "guestUser"
            ? Date.now() + 60 * 60 * 24 * 1000
            : undefined,
      }; // add to end by default
      axios
        .post(api + "/years", body)
        .then((response: any) => {
          const newYear: Year = { ...response.data.data };
          const newYearArray: Year[] = [...currentPlan.years, newYear];
          const newUpdatedPlan: Plan = { ...currentPlan, years: newYearArray };
          const updatedPlanList: Plan[] = [...planList];
          updatedPlanList[0] = newUpdatedPlan;
          dispatch(updatePlanList(updatedPlanList));
          dispatch(updateSelectedPlan(newUpdatedPlan));
          toast.success("New Year added!");
        })
        .catch((err) => console.log(err));
    } else {
      toast.error("Can't add more than 8 years!");
    }
  };

  // Handles all drag n drop logic within the drag n drop context.
  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId.includes("year")) {
      // Swap years if we're raggin a year.
      swapYear(source.index, destination.index);
    } else if (source.droppableId !== destination.droppableId) {
      // if different, move to new droppable
      let sourceDroppable: DroppableType | null = null;
      let destDroppable: DroppableType | null = null;
      droppables.forEach((droppable: DroppableType) => {
        // Semester droppables
        if (source.droppableId === droppable.semester + "|" + droppable.year) {
          sourceDroppable = droppable;
        } else if (
          destination.droppableId ===
          droppable.semester + "|" + droppable.year
        ) {
          destDroppable = droppable;
        }
      });

      if (sourceDroppable !== null && destDroppable !== null)
        swapCourse(sourceDroppable, destDroppable, source.index);
    }
  };

  /**
   * Swaps year from source droppable to destination droppable.
   * @param sourceIndex - source year index
   * @param destIndex - destination year index
   */
  const swapYear = (sourceIndex: number, destIndex: number): void => {
    const yearArr: Year[] = [...currentPlan.years];
    const temp: Year = yearArr[sourceIndex];
    yearArr.splice(sourceIndex, 1);
    yearArr.splice(destIndex, 0, temp);
    dispatch(updateSelectedPlan({ ...currentPlan, years: yearArr }));
    const yearIdArr: string[] = yearArr.map((year) => year._id);
    const body = {
      plan_id: currentPlan._id,
      year_ids: yearIdArr,
    };
    fetch(api + "/years/changeOrder", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((resp) => {
        if (!resp.ok) {
          console.log("ERROR:", resp);
        }
      })
      .catch((err) => console.log(err));
  };

  /**
   * Swaps course from source droppable to destination droppable.
   * @param source - source semester droppable
   * @param destination - destination semester droppable
   * @param sourceIndex - index of course in source droppable
   */
  const swapCourse = (
    source: DroppableType,
    destination: DroppableType,
    sourceIndex: number
  ): void => {
    const sourceObj: { year: Year | null; index: number } = getYear(
      source.year
    );
    const destObj: { year: Year | null; index: number } = getYear(
      destination.year
    );

    // TODO: CLEANUP!!!!!
    if (sourceObj.year !== null && destObj.year !== null) {
      const sourceYear: Year = sourceObj.year;
      const destYear: Year = destObj.year;
      const courseId: string = [...source.courses].sort(
        (course1: UserCourse, course2: UserCourse) =>
          course2._id.localeCompare(course1._id)
      )[sourceIndex]._id;
      const courseYearIndex: number = sourceYear.courses.indexOf(courseId);

      if (!checkDestValid(courseId, destination)) {
        toast.error("Course isn't usually held this semester!");
        return;
      }

      const sourceCourseArr = [...sourceYear.courses];
      const destCourseArr = [...destYear.courses];
      sourceCourseArr.splice(courseYearIndex, 1);
      if (destCourseArr.indexOf(courseId) === -1) {
        destCourseArr.push(courseId);
      }
      const currPlanYears = [...currentPlan.years];
      currPlanYears[sourceObj.index] = {
        ...sourceYear,
        courses: sourceCourseArr,
      };
      currPlanYears[destObj.index] = {
        ...destYear,
        courses: destCourseArr,
      };

      const body = {
        newYear: destYear._id,
        oldYear: sourceYear._id,
        courseId: courseId,
        newTerm: destination.semester,
      };

      fetch(api + "/courses/dragged", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((res) => {
          if (!res.ok) {
            console.log("ERROR:", res);
          } else {
            toast.success("Successfully moved course!");
          }
        })
        .catch((err) => console.log("error is", err.message));
      const newCurrentPlan: Plan = { ...currentPlan, years: currPlanYears };
      dispatch(updateSelectedPlan(newCurrentPlan));
      const planListClone = [...planList];
      planListClone[0] = newCurrentPlan;
      dispatch(updatePlanList(planListClone));
      updatePlanCourses(destYear, destination.semester, courseId);
    }
  };

  /**
   * Checks if droppable destination is valid
   * @param courseId - course id of course you are dragging
   * @param dest - destination droppable
   * @returns true if valid destination, false if not
   */
  const checkDestValid = (courseId: string, dest: DroppableType): boolean => {
    const userCourse: UserCourse = getUserCourse(courseId);
    const sisVer: SISRetrievedCourse | null = getSISCourse(userCourse);
    let valid = false;
    if (sisVer !== null) {
      sisVer.terms.forEach((term: string) => {
        if (term.split(" ")[0] === dest.semester) {
          valid = true;
        }
      });
    }
    return valid;
  };

  /**
   * Gets corresponding SIS course from the user course version.
   * @param userCourse - the user course for which you want to get its SIS version of
   * @returns a corresponding SISRetrievedCourse version of the user course if found, null if not
   */
  const getSISCourse = (userCourse: UserCourse): SISRetrievedCourse | null => {
    let out: SISRetrievedCourse | null = null;
    courseCache.forEach((course) => {
      if (course.number === userCourse.number) {
        out = course;
      }
    });
    return out;
  };

  /**
   * Updates plan after handling DnD
   * @param destYear - destination year
   * @param term - the term droppable you are dragging to
   * @param courseId - course id of course you're draggin
   */
  const updatePlanCourses = (
    destYear: Year,
    term: SemesterType,
    courseId: string
  ) => {
    currentPlanCourses.forEach((c: UserCourse, index: number) => {
      if (c._id === courseId) {
        const newCourse: UserCourse = {
          ...c,
          year_id: destYear._id,
          term,
        };
        const planCourseCopy = [...currentPlanCourses];
        planCourseCopy[index] = newCourse;
        dispatch(updateCurrentPlanCourses(planCourseCopy));

        return;
      }
    });
  };

  /**
   * Gets year from id.
   * @param id - year id
   * @returns a pair with the year object and index of their corresponding year id.
   */
  const getYear = (id: string): { year: Year | null; index: number } => {
    let found: Year | null = null;
    let index = -1;
    currentPlan.years.forEach((year: Year, i: number) => {
      if (year._id === id) {
        found = year;
        index = i;
      }
    });
    return { year: found, index };
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-row justify-between thin:justify-center mt-4 w-full h-auto">
          <Droppable droppableId={"years"} type="YEAR" direction="horizontal">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                className="flex-wrap"
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {elements}
                {currentPlan._id !== "noPlan" ? (
                  <Draggable
                    index={currentPlan.years.length}
                    key="addButton"
                    draggableId={"addButton"}
                    isDragDisabled={true}
                  >
                    {(provided, snapshot) => {
                      return (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <AddSvg
                            onClick={() => addNewYear(false)}
                            className="-mt-1 mb-4 ml-5 mr-5 w-14 h-auto max-h-48 min-h-addSVG border-2 border-gray-300 rounded focus:outline-none cursor-pointer select-none transform hover:scale-105 transition duration-200 ease-in"
                            data-tip={`Add an additional year after!`}
                            data-for="godTip"
                          />
                        </div>
                      );
                    }}
                  </Draggable>
                ) : null}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </>
  );
};

const getListStyle = (isDraggingOver: any) => ({
  display: "flex",
  margin: "0rem",
  padding: "0rem",
});

export default CourseList;
