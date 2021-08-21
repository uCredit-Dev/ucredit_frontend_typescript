import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectPlaceholder,
  selectRetrievedCourses,
  selectSearchFilters,
  updateInspectedVersion,
  updatePlaceholder,
} from "../../../../slices/searchSlice";
import CourseCard from "./CourseCard";
import ReactPaginate from "react-paginate";
import { ReactComponent as PlaceholderFilledSvg } from "../../../../resources/svg/PlaceholderFilled.svg";
import { ReactComponent as PlaceholderEmptySvg } from "../../../../resources/svg/PlaceholderEmpty.svg";
import { ReactComponent as Question } from "../../../../resources/svg/Question.svg";
import { Course } from "../../../../resources/commonTypes";
import ReactTooltip from "react-tooltip";

/* 
  List of searched courses.
*/
const SearchList = (props: { searching: boolean }) => {
  // Component state setup.
  const [pageNum, setPageNum] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(0);
  const [hideResults, setHideResults] = useState<boolean>(false);

  // Redux setup
  const courses = useSelector(selectRetrievedCourses);
  const placeholder = useSelector(selectPlaceholder);
  const searchFilters = useSelector(selectSearchFilters);
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
      const inspecting = { ...courses[i] };
      inspecting.versions.forEach((v: any, i: number) => {
        if (v.term === searchFilters.term + " " + searchFilters.year) {
          toDisplay.push(
            <div
              key={inspecting.number}
              className="transform hover:scale-105 transition duration-200 ease-in"
              onClick={() => setHideResults(true)}
            >
              <CourseCard course={inspecting} version={i} />
            </div>
          );
        }
      });
    }
    return toDisplay;
  };

  // Sets page number when clicking on a page in the pagination component.
  const handlePageClick = (event: any) => {
    setPageNum(event.selected);
  };

  // Activates placeholder adding.
  const onPlaceholderClick = () => {
    if (placeholder) {
      dispatch(updatePlaceholder(false));
      setHideResults(false);
    } else {
      const placeholderCourse: Course = {
        title: "placeholder",
        number: "placeholder",
        areas: "",
        term: "",
        school: "none",
        department: "none",
        credits: "",
        wi: false,
        bio: "This is a placeholder course",
        tags: [],
        preReq: [],
        restrictions: [],
        level: "",
      };
      dispatch(updatePlaceholder(true));
      dispatch(updateInspectedVersion(placeholderCourse));
      setHideResults(true);
    }
  };

  return (
    <>
      <div
        className="flex flex-row items-center justify-between mb-3 px-5 py-2 w-full h-12 bg-gray-200 border-b border-gray-400"
        data-tip="Hide Search Results"
      >
        <div className="flex flex-row">
          <div className="text-lg font-semibold">Search Results</div>{" "}
          {window.innerWidth < 800 ? (
            <button
              className="ml-2 focus:outline-none"
              onClick={() => {
                setHideResults(!hideResults);
              }}
            >
              {!hideResults ? "Hide Results" : "Show Results"}
            </button>
          ) : null}
        </div>
        <div className="flex flex-row items-center">
          <div className="flex-grow mr-1">
            <Question
              className="h-4"
              data-for="godTip"
              data-tip={
                "<p>Placeholder course used to flexibly add courses to your plan. Any course not covered by the plan can be added in this way. Just remember to fill out all necessary information of the placeholder course you'd like the plan to count towards!</p><p>Examples:</p><p>- A future 3 credit H course.</p><p>- A required lab safety course of number EN.990.110</p><p>- An AP course covering for the 4 credit course, Calculus I (AS.110.108)</p>"
              }
            />
          </div>
          <div
            className="flex flex-row items-center justify-center px-1 w-auto h-6 bg-white rounded cursor-pointer transform hover:scale-110 transition duration-200 ease-in"
            onClick={onPlaceholderClick}
            data-tip="Add a placeholder or non-SIS course"
            data-for="godTip"
            onMouseOver={() => {
              ReactTooltip.rebuild();
            }}
          >
            <div className="mr-1">Custom</div>
            {placeholder ? (
              <PlaceholderFilledSvg className="w-4 h-4 stroke-2" />
            ) : (
              <PlaceholderEmptySvg className="w-4 h-4 stroke-2" />
            )}
          </div>
        </div>
      </div>
      {!hideResults || window.innerWidth > 700 ? (
        <div className="py px-5 w-full bg-gray-200 select-none">
          <div className="w-full h-full">
            {courses.length > 0 ? (
              <>
                <div className="y-full flex flex-col w-full">
                  {courseList()}
                </div>
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
              <div className="flex flex-col items-center justify-center mt-24 w-full">
                {props.searching ? (
                  <>
                    <div>😢</div>
                    Sorry, no course found...
                  </>
                ) : (
                  <div className="text-center text-gray-400 text-lg">
                    Type something in the search box or use the filters to start
                    searching!
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};

// Below is the pagination component.
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
