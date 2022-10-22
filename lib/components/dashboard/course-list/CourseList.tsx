import React, { useState, useEffect, FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import {
  DroppableType,
  Plan,
  ReviewMode,
  SemesterType,
  SISRetrievedCourse,
  UserCourse,
  Year,
} from '../../../resources/commonTypes';
import axios from 'axios';
import {
  selectCurrentPlanCourses,
  selectDroppables,
  selectPlan,
  updateCurrentPlanCourses,
  updateSelectedPlan,
  updateTotalCredits,
} from '../../../slices/currentPlanSlice';
import {
  selectPlaceholder,
  selectSearchStatus,
} from '../../../slices/searchSlice';
import { toast } from 'react-toastify';
import {
  selectPlanList,
  selectToken,
  updateCourseCache,
  updatePlanList,
} from '../../../slices/userSlice';
import { getAPI } from '../../../resources/assets';
import YearDraggable from './YearDraggable';

interface Props {
  mode: ReviewMode;
}

/**
 * Container component that holds all the years, semesters, and courses of the current plan.
 * TODO: Cleanup and modularize
 */
const CourseList: FC<Props> = ({ mode }) => {
  // Setting up redux
  const dispatch = useDispatch();
  const currentPlan = useSelector(selectPlan);
  const token = useSelector(selectToken);
  const searching = useSelector(selectSearchStatus);
  const placeholder = useSelector(selectPlaceholder);
  const droppables = useSelector(selectDroppables);
  const currentPlanCourses = useSelector(selectCurrentPlanCourses);
  const planList = useSelector(selectPlanList);
  const token = useSelector(selectToken);

  // Component State setup.
  const [elements, setElements] = useState<JSX.Element[]>([]);

  // Gets all courses for each year and generates year objects based on them.
  useEffect(() => {
    processPlan(currentPlan);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlan._id, searching, placeholder, currentPlan.years]);

  const processPlan = (plan: Plan) => {
    const jsx: JSX.Element[] = [];
    const totCourses: UserCourse[] = [];
    let totalCredits: number = 0;
    plan.years.forEach((year: Year, yearIndex: number) => {
      const yearCourses: UserCourse[] = [];

      year.courses.forEach((course: UserCourse) => {
        if (course._id === 'invalid_course') return;
        totalCredits += course.credits;
        totCourses.push(course);
        yearCourses.push(course);
      });
      makeUpdates(jsx, totCourses, year, yearIndex, yearCourses);
      dispatch(updateTotalCredits(totalCredits));
    });
  };

  /**
   * Helper Function for above useEffect call
   * @param jsx
   * @param totCourses
   * @param year
   * @param yearIndex
   * @param yearCourses
   * @param totalCredits
   */
  const makeUpdates = (
    jsx: JSX.Element[],
    totCourses: UserCourse[],
    year: Year,
    yearIndex: number,
    yearCourses: UserCourse[],
    totalCredits = -1,
  ): void => {
    // condition in fetch scenario only
    if (totalCredits >= 0 && yearCourses.length !== year.courses.length) return;
    jsx.push(
      <div key={year._id}>
        <YearDraggable
          id={yearIndex}
          year={year}
          yearIndex={yearIndex}
          yearCourses={yearCourses}
          mode={mode}
        />
      </div>,
    );
    if (jsx.length === currentPlan.years.length) {
      if (totalCredits >= 0) {
        jsx.sort(
          (el1: JSX.Element, el2: JSX.Element) =>
            el1.props.children.props.id - el2.props.children.props.id,
        );
      } else {
        jsx.sort(
          (el1: JSX.Element, el2: JSX.Element) => el1.props.id - el2.props.id,
        );
      }
      dispatch(updateCurrentPlanCourses(totCourses));
      if (totalCredits >= 0) dispatch(updateTotalCredits(totalCredits));
      setElements(jsx);
    }
  };

  // Handles all drag n drop logic within the drag n drop context.
  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId.includes('year')) {
      // Swap years if we're raggin a year.
      swapYear(source.index, destination.index);
    } else if (source.droppableId !== destination.droppableId) {
      // if different, move to new droppable
      let sourceDroppable: DroppableType | null = null;
      let destDroppable: DroppableType | null = null;
      droppables.forEach((droppable: DroppableType) => {
        // Semester droppables
        if (source.droppableId === droppable.semester + '|' + droppable.year) {
          sourceDroppable = droppable;
        } else if (
          destination.droppableId ===
          droppable.semester + '|' + droppable.year
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
   * TODO: Update year value in frontend and backend on swap.
   * @param sourceIndex - source year index
   * @param destIndex - destination year index
   */
  const swapYear = (sourceIndex: number, destIndex: number): void => {
    if (sourceIndex === 0 || destIndex === 0) {
      toast.error("Can't swap with AP Equivalent section!");
      return;
    }
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
    fetch(getAPI(window) + '/years/changeOrder', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })
      .then((resp) => {
        if (!resp.ok) {
          console.log('ERROR:', resp);
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
  const swapCourse = async (
    source: DroppableType,
    destination: DroppableType,
    sourceIndex: number,
  ) => {
    const sourceObj: { year: Year | null; index: number } = getYear(
      source.year,
    );
    const destObj: { year: Year | null; index: number } = getYear(
      destination.year,
    );

    if (sourceObj.year === null || destObj.year === null) return;

    // Defining relevant variables
    const sourceYear: Year = sourceObj.year;
    const destYear: Year = destObj.year;
    const course: UserCourse = [...source.courses].sort(
      (course1: UserCourse, course2: UserCourse) =>
        course2._id.localeCompare(course1._id),
    )[sourceIndex];
    const courseYearIndex: number = sourceYear.courses
      .map((c) => c._id)
      .indexOf(course._id);
    try {
      const resp = await axios.get(getAPI(window) + '/search', {
        params: { query: course.number },
      });
      let retrievedCourses: SISRetrievedCourse[] = resp.data.data;
      dispatch(updateCourseCache(retrievedCourses));
      if (
        retrievedCourses.length !== 0 &&
        !checkDestValid(course, destination, retrievedCourses)
      ) {
        toast.error("Course isn't usually held this semester!");
      } else {
        const body = {
          newYear: destYear._id,
          oldYear: sourceYear._id,
          courseId: course._id,
          newTerm: destination.semester,
        };

        let res: any = await fetch(getAPI(window) + '/courses/dragged', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            "Authorization" : `Bearer ${token}`
          },
          body: JSON.stringify(body),
        });

        if (!res.ok) {
          console.log('ERROR:', res);
        } else {
          toast.success('Successfully moved course!');
        }
        res = await res.json();
        const updatedCourse = res.data;

        const sourceCourseArr = [...sourceYear.courses];
        let destCourseArr = [...destYear.courses];
        sourceCourseArr.splice(courseYearIndex, 1);
        if (destCourseArr.map((c) => c._id).indexOf(updatedCourse._id) === -1) {
          destCourseArr.push(updatedCourse);
        } else {
          // otherwase source and destination are the same.
          destCourseArr = sourceCourseArr;
          destCourseArr.push(updatedCourse);
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

        const newCurrentPlan: Plan = {
          ...currentPlan,
          years: currPlanYears,
        };
        const planListClone = [...planList];
        planListClone[0] = newCurrentPlan;
        updatePlanCourses(destYear, destination.semester, updatedCourse);
        dispatch(updatePlanList(planListClone));
        dispatch(updateSelectedPlan(newCurrentPlan));
      }
    } catch (err) {
      console.log('error is: ' + err);
    }
  };

  /**
   * Checks if droppable destination is valid
   * @param courseId - course id of course you are dragging
   * @param dest - destination droppable
   * @returns true if valid destination, false if not
   */
  const checkDestValid = (
    course: UserCourse,
    dest: DroppableType,
    retrievedCourses: SISRetrievedCourse[],
  ): boolean => {
    let valid = false;
    for (let sisVer of retrievedCourses) {
      if (valid) break;
      if (sisVer.number === course.number) {
        for (let term of sisVer.terms) {
          if (term.split(' ')[0] === dest.semester) {
            valid = true;
            break;
          }
        }
      }
    }
    return valid;
  };

  /**
   * Updates plan after handling DnD
   * @param destYear - destination year
   * @param term - the term droppable you are dragging to
   * @param course - course of course you're draggin
   */
  const updatePlanCourses = (
    destYear: Year,
    term: SemesterType,
    course: UserCourse,
  ) => {
    currentPlanCourses.forEach((c: UserCourse, index: number) => {
      if (c._id === course._id) {
        const newCourse: UserCourse = {
          ...c,
          year_id: destYear._id,
          term,
          version:
            term + ' ' + (term === 'Fall' ? destYear.year : destYear.year + 1),
        };
        const planCourseCopy = [...currentPlanCourses];
        planCourseCopy[index] = newCourse;
        dispatch(updateCurrentPlanCourses(planCourseCopy));
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
        <div className="flex flex-row justify-between thin:justify-center mr-10 -mt-3 mb-16">
          <Droppable droppableId={'years'} type="YEAR" direction="vertical">
            {(provided, snapshot) => (
              <div
                className="flex flex-col w-full"
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {elements}
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
  display: 'flex',
  margin: '0rem',
  padding: '0rem',
});

export default CourseList;
