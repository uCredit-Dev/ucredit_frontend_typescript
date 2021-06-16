import React, { useState, useEffect } from "react";
import {
  DroppableType,
  SemesterType,
  UserCourse,
  Year,
} from "../../../resources/commonTypes";
import CourseComponent from "./CourseComponent";
import { useDispatch } from "react-redux";
import {
  updateSearchStatus,
  updateSearchTime,
} from "../../../slices/searchSlice";
import { ReactComponent as AddSvg } from "../../../resources/svg/Add.svg";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { updateDroppables } from "../../../slices/currentPlanSlice";
import ReactTooltip from "react-tooltip";

type semesterProps = {
  customStyle: string;
  semesterName: SemesterType;
  semesterYear: Year;
  courses: UserCourse[];
};

/**
 * A component displaying all the courses in a specific semester.
 * @param courses - all the courses in the semester
 * @param semesterYear - year this semester is part of
 * @param semesterName - name of the semester
 * @param customStyle - custom styling for the semester
 */
function Semester({
  customStyle,
  semesterName,
  semesterYear,
  courses,
}: semesterProps) {
  // Redux setup
  const dispatch = useDispatch();

  // State used to control whether dropdown is opened or closed
  const [display, setDisplay] = useState<boolean>(true);
  const [totalCredits, setTotalCredits] = useState<number>(0);
  const [semesterCourses, setSemesterCourses] = useState<UserCourse[]>([]);

  // Every time any courses within this semester changes, update total credit count and the list.
  useEffect(() => {
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
  }, [courses, courses.length]);

  // Sets closed to open and open to closed for course display dropdown
  const displayCourses = () => {
    setDisplay(!display);
  };

  // Opens search popup to add new course.
  const addCourse = () => {
    dispatch(updateSearchStatus(true));
    dispatch(
      updateSearchTime({
        searchSemester: semesterName,
        searchYear: semesterYear.year,
      })
    );
  };

  const getDraggables = () => {
    return semesterCourses.map((course, index) => (
      <Draggable key={course._id} index={index} draggableId={course._id}>
        {(provided, snapshot) => {
          // const el = document.getElementById(
          //   semesterName + "|" + semesterYear._id
          // );
          // const newStyle: any = { ...provided.draggableProps.style };
          // if (
          //   el !== null &&
          //   newStyle.top !== undefined &&
          //   newStyle.left !== undefined
          // ) {
          //   let rect = el.getBoundingClientRect();
          //   newStyle.top -= rect.top - 115;
          //   newStyle.left -= rect.left - 5;
          // }
          return (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={getItemStyle(
                snapshot.isDragging,
                provided.draggableProps.style
              )}
            >
              <CourseComponent
                year={semesterYear.year}
                course={course}
                semester={semesterName}
              />
            </div>
          );
        }}
      </Draggable>
    ));
  };

  useEffect(() => {
    ReactTooltip.rebuild();
  }, [courses.length, totalCredits]);

  return (
    <>
      <div className={`${customStyle} mb-3 w-full h-auto pr-1`}>
        <div className="flex flex-col h-yearheading font-medium">
          <div className="flex flex-row items-center justify-between px-0.5 py-1 h-yearheading1 bg-white">
            <div
              className="flex flex-row items-center w-full h-auto font-normal select-none"
              onClick={displayCourses}
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
                    className="flex flex-row items-center justify-center ml-1 px-1 w-auto text-black text-xs bg-gray-200 bg-white rounded transform hover:scale-125 transition duration-200 ease-in"
                    data-tip={`${totalCredits} Credits`}
                    data-for="godTip"
                  >
                    {totalCredits}
                  </div>
                </>
              ) : null}
            </div>
            <div
              className="group flex flex-row items-center justify-center text-secondary hover:text-white bg-gray-100 hover:bg-white rounded-md"
              onClick={addCourse}
            >
              <AddSvg className="w-6 h-6 group-hover:text-primary stroke-2" />
            </div>
          </div>
          <div className="w-full h-px bg-gradient-to-r from-blue-500 to-green-400"></div>
        </div>
        <div id={semesterName + "|" + semesterYear._id}>
          <Droppable droppableId={semesterName + "|" + semesterYear._id}>
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

const getItemStyle = (isDragging: any, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",

  // styles we need to apply on draggables
  ...draggableStyle,
});

export default Semester;
