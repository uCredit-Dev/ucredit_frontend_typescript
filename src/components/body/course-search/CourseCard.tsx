import React from 'react';
import { Course } from '../../commonTypes';
import { useDispatch } from 'react-redux';
import { updateInspectedCourse } from '../../slices/searchSlice';

type cardProps = {
  course: Course;
};

const CourseCard = (props: cardProps) => {
  const dispatch = useDispatch();
  const course = props.course;
  const handleCourseClick = () => {
    dispatch(updateInspectedCourse(course));
  };
  return (
    <button className="flex  bg-gray-100" onClick={handleCourseClick}>
      {course.title}
    </button>
  );
};

export default CourseCard;
