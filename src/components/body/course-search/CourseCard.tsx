import React from "react";
import { Course } from "../../commonTypes";
import { useDispatch, useSelector } from "react-redux";
import {
  updateInspectedCourse,
  selectInspectedCourse,
} from "../../slices/searchSlice";

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
      return "flex bg-red-100";
    }
    return "flex bg-gray-100";
  };

  // Setup Redux
  const dispatch = useDispatch();

  // User selects a course to look at.
  const handleCourseClick = () => {
    dispatch(updateInspectedCourse(course));
  };
  return (
    <button
      className={checkSelected()}
      style={{ height: "3rem" }}
      onClick={handleCourseClick}
    >
      <div style={{ width: "25rem" }} className="text-left ml-2">
        {course.title}
      </div>
    </button>
  );
};

export default CourseCard;
