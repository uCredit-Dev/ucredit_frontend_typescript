import React from 'react';
import { useSelector } from 'react-redux';
import { selectRetrievedCourses } from '../../slices/searchSlice';
import CourseCard from './CourseCard';

const SearchList = () => {
  const courses = useSelector(selectRetrievedCourses);
  const courseList = () =>
    courses.map((course) => <CourseCard course={course} />);
  return (
    <div className="flex-1 m-3 p-2 bg-gray-300">
      <p>Search Results </p>
      <div className="flex flex-col overflow-vertical">{courseList()}</div>
    </div>
  );
};

export default SearchList;
