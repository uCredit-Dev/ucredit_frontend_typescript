import React from "react";
import { Course } from "../../commonTypes";
import { useDispatch, useSelector } from "react-redux";
import {
  updateInspectedCourse,
  selectInspectedCourse,
  updatePlaceholder,
} from "../../slices/searchSlice";
import clsx from "clsx";

type cardProps = {
  course: Course;
};

// A course slot displayed in the course list once search is performed.
const CourseCard = (props: cardProps) => {
  const course = props.course;

  // If the course displayed by this card is the selected one, style it special.
  const selectedCourse = useSelector(selectInspectedCourse);
  const checkSelected = () => {
    if (selectedCourse === course) {
      return "bg-red-100";
    }
    return "bg-gray-100";
  };

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
        { "bg-red-200": selectedCourse === course },
        "mb-2 p-2 bg-white rounded shadow cursor-pointer"
      )}
      onClick={handleCourseClick}>
      <div className='ml-2 w-auto h-12 overflow-hidden overflow-ellipsis'>
        {course.title}
      </div>
    </div>
  );
};

export default CourseCard;
