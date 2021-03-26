import React from 'react';
import { useSelector } from 'react-redux';
import { selectRetrievedCourses } from '../../slices/searchSlice';
import CourseCard from './CourseCard';
import ReactPaginate from 'react-paginate';

const SearchList = () => {
  const courses = useSelector(selectRetrievedCourses);

  // Generates a list of retrieved course matching the search queries
  const courseList = () =>
    courses.map((course) => <CourseCard course={course} />);
  const handlePageClick = () => {};
  return (
    <div className="flex-1 m-3 p-2 bg-gray-300">
      <p>Search Results </p>
      <div className="flex flex-col overflow-vertical">{courseList()}</div>
      {/* A Pagination component we'll use! Prop list and docs here: https://github.com/AdeleD/react-paginate. '
      Use it to add new classnames when styling and add new props for logic */}
      <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        previousClassName={'m-2'}
        nextClassName={'m-2'}
        breakLabel={'...'}
        breakClassName={''}
        pageCount={3}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'flex'}
        activeClassName={'bg-gray-500'}
        pageClassName={'m-2'}
      />
    </div>
  );
};

export default SearchList;
