import React, { useState, useEffect, FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectPageCount,
  selectPageIndex,
  selectPlaceholder,
  selectRetrievedCourses,
  selectSearchFilters,
  updateInspectedVersion,
  updatePageIndex,
  updatePlaceholder,
} from '../../../../slices/searchSlice';
import CourseCard from './CourseCard';
import ReactPaginate from 'react-paginate';
import { Course, SISRetrievedCourse } from '../../../../resources/commonTypes';
import ReactTooltip from 'react-tooltip';
import { QuestionMarkCircleIcon } from '@heroicons/react/solid';
import { NewspaperIcon } from '@heroicons/react/outline';
import { selectPlan } from '../../../../slices/currentPlanSlice';

/* 
  List of searched courses.
*/
const SearchList: FC<{
  searching: boolean;
  hideResults: boolean;
  setHideResults: Function;
  setPageIndex: Function; 
}> = ({ searching, hideResults, setHideResults, setPageIndex }) => {
  // Component state setup.
  const [filteredCourses, setFilteredCourses] = useState<SISRetrievedCourse[]>(
    [],
  );

  // Redux setup
  const courses = useSelector(selectRetrievedCourses);
  const placeholder = useSelector(selectPlaceholder);
  const searchFilters = useSelector(selectSearchFilters);
  const currentPlan = useSelector(selectPlan);
  const pageIndex = useSelector(selectPageIndex);
  const pageCount = useSelector(selectPageCount);
  const dispatch = useDispatch();

  // Updates pagination every time the searched courses change.
  useEffect(() => {
    const SISFilteredCourses: SISRetrievedCourse[] = courses;
    setFilteredCourses(SISFilteredCourses);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courses, searchFilters]);

  /**
   * Generates a list of 10 retrieved course matching the search queries and page number.
   * @returns a list of searched course cards
   */
  const courseList = () => {
    let toDisplay: any = [];
    for (let i = 0; i < filteredCourses.length; i++) {
      const inspecting = { ...filteredCourses[i] };
      for (let j = 0; j < inspecting.versions.length; j++) {
        const v = inspecting.versions[j];
        if (
          (v.term === searchFilters.term + ' ' + searchFilters.year ||
            (searchFilters.term === 'All' &&
              (searchFilters.year === currentPlan.years[0].year ||
                searchFilters.year.toString() === v.term.split(' ')[1])))
        ) {
          toDisplay.push(
            <div
              key={inspecting._id}
              className="transition duration-200 ease-in transform hover:scale-105"
              onClick={() =>
                window.innerWidth < 1200 ? setHideResults(true) : null
              }
            >
              <CourseCard course={inspecting} version={j} />
            </div>,
          );
        }
      }
    }
    return toDisplay;
  };

  /**
   * Sets page number when clicking on a page in the pagination component.
   * @param event event raised on changing search result page
   */
  const handlePageClick = (event: any) => {
    dispatch(updatePageIndex(event.selected));
  };

  /**
   * Activates placeholder adding.
   */
  const onPlaceholderClick = () => {
    if (placeholder) {
      dispatch(updatePlaceholder(false));
      setHideResults(false);
    } else {
      const placeholderCourse: Course = {
        title: 'placeholder',
        number: 'placeholder',
        areas: '',
        term: '',
        school: 'none',
        department: 'none',
        credits: '',
        wi: false,
        bio: 'This is a placeholder course',
        tags: [],
        preReq: [],
        restrictions: [],
        level: '',
      };
      dispatch(updatePlaceholder(true));
      dispatch(updateInspectedVersion(placeholderCourse));
      setHideResults(true);
    }
  };

  /**
   * Gets search result pagination UI
   */
  const getPaginationUI = () =>
    pageCount > 1 && (
      <div className="flex flex-row justify-center w-full h-auto">
        <Pagination pageCount={pageCount} pageIndex={pageIndex} handlePageClick={handlePageClick} />
      </div>
    );

  const getSearchResultsUI = () =>
    courses.length > 0 ? (
      <>
        <div className="flex flex-col w-full y-full">{courseList()}</div>
        {getPaginationUI()}
      </>
    ) : (
      <div className="flex flex-col items-center justify-center w-full mt-24">
        {getSearchingUI()}
      </div>
    );

  /**
   * Gets loading search UI
   */
  const getSearchingUI = () =>
    searching ? (
      <img src="/img/loading.gif" alt="Searching..." className="h-10"></img>
    ) : (
      <div className="text-lg text-center text-gray-400">
        No current search results.
      </div>
    );

  return (
    <>
      <div
        className="flex flex-row items-center justify-between w-full h-12 px-5 py-2 mb-3 bg-gray-200 border-b border-gray-400"
        data-tip="Hide Search Results"
      >
        <div className="flex flex-row">
          <div className="text-lg font-semibold">Search Results</div>
        </div>
        <div className="flex flex-row items-center">
          <div className="flex-grow mr-1">
            <QuestionMarkCircleIcon
              className="h-4 fill-gray"
              data-for="godTip"
              data-tip={
                "<p>Placeholder course used to flexibly add courses to your plan. Any course not covered by the plan can be added in this way. Just remember to fill out all necessary information of the placeholder course you'd like the plan to count towards!</p><p>Examples:</p><p>- A future 3 credit H course.</p><p>- A required lab safety course of number EN.990.110</p><p>- An AP course covering for the 4 credit course, Calculus I (AS.110.108)</p>"
              }
            />
          </div>
          <div
            className="flex flex-row items-center justify-center w-auto h-6 px-1 transition duration-200 ease-in transform bg-white rounded cursor-pointer hover:scale-110"
            onClick={onPlaceholderClick}
            data-tip="Add a placeholder or non-SIS course"
            data-for="godTip"
            onMouseOver={() => {
              ReactTooltip.rebuild();
            }}
          >
            <div className="mr-1">Custom</div>
            <NewspaperIcon className="w-4 h-4 stroke-2" />
          </div>
        </div>
      </div>
      {(!hideResults || window.innerWidth > 700) && (
        <div className="w-full px-5 bg-gray-200 select-none py flex-grow">
          <div className="w-full h-full">{getSearchResultsUI()}</div>
        </div>
      )}
    </>
  );
};

// Below is the pagination component.
type PaginationProps = {
  pageCount: number;
  pageIndex: number;
  handlePageClick: any;
};

const Pagination: React.FC<PaginationProps> = ({
  pageCount,
  pageIndex, 
  handlePageClick,
}) => {
  /* A Pagination component we'll use! Prop list and docs here: https://github.com/AdeleD/react-paginate. '
      Use it to add new classnames when styling and add new props for logic */
  return (
    <ReactPaginate
      previousLabel={'<'}
      nextLabel={'>'}
      previousClassName={'m-2'}
      nextClassName={'m-2'}
      breakLabel={'...'}
      breakClassName={'justify-items-end h-6 mt-1'}
      pageCount={pageCount}
      forcePage={pageIndex}
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      onPageChange={handlePageClick}
      containerClassName={'flex'}
      activeClassName={'bg-gray-400'}
      activeLinkClassName="rounded p-1 py-2 h-10"
      pageClassName={'w-6 h-6 bg-gray-100 m-1 p-1 rounded text-center'}
    />
  );
};

export default SearchList;
