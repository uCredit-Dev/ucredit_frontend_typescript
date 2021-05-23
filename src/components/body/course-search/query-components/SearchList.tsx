import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectRetrievedCourses,
  updateInspectedCourse,
  updatePlaceholder,
} from "../../../slices/searchSlice";
import CourseCard from "./CourseCard";
import ReactPaginate from "react-paginate";
import { ReactComponent as CustomCourseSvg } from "../../../svg/Custom.svg";
import ReactTooltip from "react-tooltip";

/* 
  List of searched courses.
*/
const SearchList = () => {
  const [pageNum, setPageNum] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const courses = useSelector(selectRetrievedCourses);
  const dispatch = useDispatch();
  let coursesPerPage = 10;

  // Updates pagination every time the searched courses change.
  useEffect(() => {
    // If coursesPerPage doesn't divide perfectly into total courses, we need one more page.
    const division = Math.floor(courses.length / coursesPerPage);
    const pages =
      courses.length % coursesPerPage === 0 ? division : division + 1;
    setPageCount(pages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courses]);

  // Generates a list of 10 retrieved course matching the search queries and page number.
  const courseList = () => {
    let toDisplay: any = [];
    let startingIndex = pageNum * coursesPerPage;
    let endingIndex =
      startingIndex + coursesPerPage > courses.length
        ? courses.length - 1
        : startingIndex + coursesPerPage - 1;
    for (let i = startingIndex; i <= endingIndex; i++) {
      toDisplay[i - startingIndex] = (
        <div key={courses[i].number}>
          <CourseCard course={courses[i]} />
        </div>
      );
    }
    return toDisplay;
  };

  // Sets page number when clicking on a page in the pagination component.
  const handlePageClick = (event: any) => {
    setPageNum(event.selected);
  };

  // Activates placeholder adding.
  const onPlaceholderClick = () => {
    dispatch(updatePlaceholder(true));
    const placeholderCourse = {
      title: "placeholder",
      number: "placeholder",
      areas: "",
      terms: [],
      school: "none",
      department: "none",
      credits: "",
      wi: false,
      bio: "This is a placeholder course",
      tags: [],
      preReq: [],
      restrictions: [],
    };
    dispatch(updateInspectedCourse(placeholderCourse));
  };

  return (
    <>
      <div className="flex flex-row items-center justify-between px-5 py-2 w-full h-12 bg-gray-200">
        <div>Search Results </div>
        <div
          className="flex flex-row items-center justify-center w-6 h-6 bg-white rounded cursor-pointer"
          onClick={onPlaceholderClick}
          data-tip="Add a placeholder/custom course"
        >
          <CustomCourseSvg className="w-4 h-4 stroke-2" />
        </div>
      </div>
      {/* <div className='relative z-10 -top-3 left-0  right-blurr block flex-none h-4 bg-gradient-to-b from-white to-gray-200 pointer-events-none'></div> */}
      <div className="py px-5 w-full h-full bg-gray-200 border-b border-black select-none overflow-y-auto">
        <ReactTooltip />
        <div className="w-full h-full">
          {courses.length > 0 ? (
            <>
              <div className="y-full flex flex-col w-full">{courseList()}</div>
              {pageCount > 1 ? (
                <div className="flex flex-row justify-center w-full h-auto">
                  <Pagination
                    pageCount={pageCount}
                    handlePageClick={handlePageClick}
                  />
                </div>
              ) : null}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-full">
              <div>😢</div>
              Sorry, no course found...
            </div>
          )}
        </div>
      </div>
    </>
  );
};

type PaginationProps = {
  pageCount: number;
  handlePageClick: any;
};

const Pagination: React.FC<PaginationProps> = ({
  pageCount,
  handlePageClick,
}) => {
  /* A Pagination component we'll use! Prop list and docs here: https://github.com/AdeleD/react-paginate. '
      Use it to add new classnames when styling and add new props for logic */
  return (
    <ReactPaginate
      previousLabel={"<"}
      nextLabel={">"}
      previousClassName={"m-2"}
      nextClassName={"m-2"}
      breakLabel={"..."}
      breakClassName={""}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      onPageChange={handlePageClick}
      containerClassName={"flex"}
      activeClassName={"bg-gray-200"}
      pageClassName={"m-2"}
    />
  );
};

export default SearchList;
