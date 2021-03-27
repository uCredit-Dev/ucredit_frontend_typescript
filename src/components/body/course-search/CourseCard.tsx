import React from 'react';
import { Course } from '../../commonTypes';
import { useDispatch } from 'react-redux';
import { updateInspectedCourse } from '../../slices/searchSlice';

type cardProps = {
  course: Course;
};

// A course slot displayed in the course list once search is performed.
const CourseCard = (props: cardProps) => {
  const course = props.course;

  // Setup Redux
  const dispatch = useDispatch();

  // User selects a course to look at.
  const handleCourseClick = () => {
    dispatch(updateInspectedCourse(course));
  };
  return (
    <button
      className="flex  bg-gray-100"
      style={{ height: '3rem' }}
      onClick={handleCourseClick}
    >
      {course.title}
    </button>
  );
};

export default CourseCard;
