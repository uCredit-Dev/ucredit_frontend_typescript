import React from "react";
import { Course } from "../../../commonTypes";
import { useDispatch, useSelector } from "react-redux";
import {
  updateInspectedCourse,
  selectInspectedCourse,
  updatePlaceholder,
} from "../../../slices/searchSlice";
import clsx from "clsx";

type cardProps = {
  course: Course;
};

// A course slot displayed in the course list once search is performed.
const CourseCard = (props: cardProps) => {
  const course = props.course;

  // If the course displayed by this card is the selected one, style it special.
  const selectedCourse = useSelector(selectInspectedCourse);

  // Setup Redux
  const dispatch = useDispatch();

  // User selects a course to look at.
  const handleCourseClick = () => {
    dispatch(updateInspectedCourse(course));
    dispatch(updatePlaceholder(false));
  };
  return (
    <div
      className={clsx(
        { "bg-secondary bg-opacity-25": selectedCourse === course },
        "mb-2 p-2 w-full h-14 bg-white rounded hover:shadow cursor-pointer transition duration-200 ease-in-out"
      )}
      onClick={handleCourseClick}
    >
      <div className="flex flex-col justify-center w-full h-full">
        <div className="truncate">{course.title}</div>
        <div>{course.number}</div>
      </div>
    </div>
  );
};

export default CourseCard;
