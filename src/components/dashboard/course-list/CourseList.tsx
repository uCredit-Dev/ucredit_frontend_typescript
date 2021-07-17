import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  DroppableType,
  Plan,
  SemesterType,
  UserCourse,
  Year,
} from "../../../resources/commonTypes";
import axios from "axios";
import {
  selectCurrentPlanCourses,
  selectDroppables,
  selectPlan,
  selectTotalCredits,
  updateCurrentPlanCourses,
  updateSelectedPlan,
  updateTotalCredits,
} from "../../../slices/currentPlanSlice";
import {
  selectPlaceholder,
  selectSearchStatus,
} from "../../../slices/searchSlice";
import YearComponent, { newYearTemplate } from "./YearComponent";
import { ReactComponent as AddSvg } from "../../../resources/svg/Add.svg";
import { toast } from "react-toastify";
import {
  selectPlanList,
  selectUser,
  updatePlanList,
} from "../../../slices/userSlice";
import { api } from "../../../resources/assets";
import { DragDropContext } from "react-beautiful-dnd";

/**
 * Container component that holds all the years, semesters, and courses of the current plan.
 */
function CourseList() {
  // Setting up redux
  const dispatch = useDispatch();
  const currentPlan = useSelector(selectPlan);
  const user = useSelector(selectUser);
  const searching = useSelector(selectSearchStatus);
  const placeholder = useSelector(selectPlaceholder);
  const totalCredits = useSelector(selectTotalCredits);
  const droppables = useSelector(selectDroppables);
  const currentPlanCourses = useSelector(selectCurrentPlanCourses);
  const planList = useSelector(selectPlanList);

  // Component State setup.
  const [elements, setElements] = useState<JSX.Element[]>([]);
  const [currentPlanId, setCurrentPlanId] = useState<string>("");

  // Gets all courses for each year and generates year objects based on them.
  useEffect(() => {
    const jsx: JSX.Element[] = [];
    const totCourses: UserCourse[] = [];
    currentPlan.years.forEach((year) => {
      const yearCourses: UserCourse[] = [];
      if (year.courses !== undefined) {
        setCurrentPlanId(currentPlan._id);
        if (year.courses.length === 0 || currentPlanId === currentPlan._id) {
          // We simply update courses
          year.courses.forEach((course: string) => {
            const courseObj: UserCourse = getCourse(course);
            totCourses.push(courseObj);
            yearCourses.push(courseObj);
          });
          jsx.push(
            <YearComponent
              key={year._id}
              id={year.year}
              customStyle="cursor-pointer"
              year={year}
              courses={yearCourses}
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
          year.courses.forEach((courseId) => {
            axios
              .get(api + "/courses/" + courseId)
              .then((resp) => {
                const course: UserCourse = resp.data.data;
                yearCourses.push(course);
                dispatch(updateTotalCredits(totalCredits + course.credits));
                totCourses.push(course);
                if (yearCourses.length === year.courses.length) {
                  // make all the updates here
                  jsx.push(
                    <YearComponent
                      key={year._id}
                      id={year.year}
                      customStyle="cursor-pointer"
                      year={year}
                      courses={yearCourses}
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
                }
              })
              .catch((err) => console.log(err));
          });
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlan, currentPlan._id, searching, placeholder]);

  const getCourse = (id: string): UserCourse => {
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
      year: "",
      year_id: "",
      preReq: "",
      isPlaceholder: false,
    };
    currentPlanCourses.forEach((c: UserCourse) => {
      if (c._id === id) {
        course = c;
        return;
      }
    });
    return course;
  };

  // add a new year, if preUni is true, add to the start of the plan, otherwise add to the end
  const addNewYear = (preUniversity: boolean) => {
    if (preUniversity) {
      let preAdded = false;
      currentPlan.years.forEach((currYear) => {
        if (currYear.year === 0) {
          preAdded = true;
          return;
        }
      });
      if (preAdded) {
        toast.error("Already added pre-year!");
        return;
      }
    }

    if (currentPlan.years.length < 8) {
      const body = {
        name: newYearTemplate.name,
        plan_id: currentPlan._id,
        preUniversity: preUniversity,
        user_id: user._id,
      }; // add to end by default
      axios
        .post(api + "/years", body)
        .then((response: any) => {
          const newYear: Year = { ...response.data.data };
          const newYearArray = [...currentPlan.years, newYear]; // NOT THE CORRECT ID?? // Agreed. TODO: insert new year in chronological location.
          const newUpdatedPlan = { ...currentPlan, years: newYearArray };
          dispatch(updateSelectedPlan(newUpdatedPlan));
          toast.success("New Year added!");
        })
        .catch((err) => console.log(err));
    } else {
      toast.error("Can't add more than 8 years!");
    }
  };

  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId !== destination.droppableId) {
      // if different, move to new droppable
      let sourceDroppable: DroppableType | null = null;
      let destDroppable: DroppableType | null = null;

      droppables.forEach((droppable: DroppableType) => {
        if (source.droppableId === droppable.semester + "|" + droppable.year) {
          sourceDroppable = droppable;
        } else if (
          destination.droppableId ===
          droppable.semester + "|" + droppable.year
        ) {
          destDroppable = droppable;
        }
      });

      if (sourceDroppable !== null && destDroppable !== null) {
        swap(sourceDroppable, destDroppable, source.index);
      }
    }
  };

  // Swaps course from source droppable to destination droppable.
  const swap = (
    source: DroppableType,
    destination: DroppableType,
    sourceIndex: number
  ) => {
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
            console.log(res);
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

  const updatePlanCourses = (
    destYear: Year,
    term: SemesterType,
    courseId: string
  ) => {
    currentPlanCourses.forEach((c: UserCourse, index: number) => {
      if (c._id === courseId) {
        const newCourse: UserCourse = {
          ...c,
          year: destYear.year.toString(),
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
        <div className="flex flex-row flex-wrap justify-between thin:justify-center mt-4 w-full h-auto">
          {currentPlan._id !== "noPlan" ? (
            <AddSvg
              onClick={() => addNewYear(true)}
              className="-mt-1 mb-4 mr-3 w-14 h-auto max-h-48 border-2 border-gray-300 rounded focus:outline-none cursor-pointer select-none transform hover:scale-105 transition duration-200 ease-in"
              data-tip={`Add a pre-university year!`}
              data-for="godTip"
            />
          ) : null}
          {elements}
          {currentPlan._id !== "noPlan" ? (
            <AddSvg
              onClick={() => addNewYear(false)}
              className="-mt-1 mb-4 ml-3 ml-auto mr-5 w-14 h-auto max-h-48 border-2 border-gray-300 rounded focus:outline-none cursor-pointer select-none transform hover:scale-105 transition duration-200 ease-in"
              data-tip={`Add an additional year after!`}
              data-for="godTip"
            />
          ) : null}
        </div>
      </DragDropContext>
    </>
  );
}

export default CourseList;
