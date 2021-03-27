import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectRetrievedCourses } from '../../slices/searchSlice';
import CourseCard from './CourseCard';
import ReactPaginate from 'react-paginate';

const SearchList = () => {
  const [pageNum, setPageNum] = useState(1);
  const courses = useSelector(selectRetrievedCourses);

  // Generates a list of 10 retrieved course matching the search queries and page number.
  const courseList = () => {
    console.log('list is ', courses);
    let toDisplay: any = [];
    for (
      let i = pageNum * 10;
      i < pageNum * 10 + 10 && i < courses.length;
      i++
    ) {
      toDisplay[i] = <CourseCard course={courses[i]} />;
    }
    return toDisplay;
  };

  const handlePageClick = (event: any) => {
    setPageNum(event.selected);
  };
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
        pageCount={courses.length / 10}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={'flex'}
        activeClassName={'bg-gray-500'}
        pageClassName={'m-2'}
      />
    </div>
  );
};

export default SearchList;
