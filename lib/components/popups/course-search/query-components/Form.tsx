import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateSearchTerm,
  updateRetrievedCourses,
  updateSearchFilters,
  updatePageIndex,
  selectSearchterm,
  selectSearchFilters,
  selectSemester,
  selectYear,
  selectPageIndex,
  updatePageCount,
} from '../../../../slices/searchSlice';
import {
  SearchExtras,
  SISRetrievedCourse,
} from '../../../../resources/commonTypes';
import 'react-toastify/dist/ReactToastify.css';
import Filters from './Filters';
import axios from 'axios';
import { getAPI, getParams } from '../../../../resources/assets';
import { selectPlan } from '../../../../slices/currentPlanSlice';

/**
 * Search form, including the search query input and filters.
 * TODO: filter by uppeer/lower levels
 *
 * @prop setSearching - sets searching state
 */
const Form: FC<{
  setSearching: (searching: boolean) => void;
}> = ({ setSearching }) => {
  // Set up redux dispatch and variables.
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchterm);
  const searchFilters = useSelector(selectSearchFilters);
  const semester = useSelector(selectSemester);
  const currentPlan = useSelector(selectPlan);
  const searchYear = useSelector(selectYear);
  const pageIndex = useSelector(selectPageIndex);

  // Component state setup
  const [showCriteria, setShowCriteria] = useState(false);

  const getYearVal = (): number => {
    let year: number = new Date().getFullYear();
    currentPlan.years.forEach((yearObj) => {
      if (yearObj._id === searchYear) year = yearObj.year;
    });
    return year;
  };

  // On opening search, set the term filter to match semester you're adding to.
  useEffect(() => {
    dispatch(updateSearchFilters({ filter: 'term', value: semester }));
    const date: Date = new Date();
    const yearVal: number = getYearVal();
    if (yearVal >= date.getFullYear()) {
      handleFutureYear(date, yearVal);
    } else if (yearVal === date.getFullYear() - 1) {
      // If the year of the semester is one less than current year,
      // we need to check if Summer is valid.
      if (
        (semester === 'Summer' && date.getMonth() < 2) ||
        semester === 'Fall'
      ) {
        dispatch(updateSearchFilters({ filter: 'year', value: yearVal }));
      } else
        dispatch(updateSearchFilters({ filter: 'year', value: yearVal + 1 }));
    } else {
      if (semester === 'Fall' || semester === 'All') {
        dispatch(updateSearchFilters({ filter: 'year', value: yearVal }));
      } else {
        dispatch(updateSearchFilters({ filter: 'year', value: yearVal + 1 }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFutureYear = (date: Date, yearVal: number): void => {
    // If the current year is the same as the year of the semester or later,
    // we need to check Fall, Spring, Intersession, and Summer to see if we need to increase year value.
    if (
      (semester === 'Spring' && date.getMonth() >= 9) ||
      (semester === 'Intersession' && date.getMonth() === 11)
    )
      dispatch(
        updateSearchFilters({ filter: 'year', value: date.getFullYear() + 1 }),
      );
    else if (semester === 'Fall' && date.getMonth() < 2) {
      dispatch(
        updateSearchFilters({ filter: 'year', value: date.getFullYear() - 1 }),
      );
    } else
      dispatch(
        updateSearchFilters({ filter: 'year', value: date.getFullYear() }),
      );
  };

  useEffect(() => {
    dispatch(updatePageIndex(0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, searchFilters]);

  // Search with debouncing of 4/8s of a second.
  useEffect(() => {
    // Search params.
    const extras: SearchExtras = {
      page: pageIndex,
      query: searchTerm,
      credits: searchFilters.credits,
      areas: searchFilters.distribution,
      wi: searchFilters.wi,
      term: searchFilters.term,
      year:
        currentPlan.years[0].year === searchFilters.year
          ? 'All'
          : searchFilters.year,
      department: searchFilters.department,
      tags: searchFilters.tags,
      levels: searchFilters.levels,
    };

    setSearching(true);
    dispatch(updateRetrievedCourses([]));

    // Search with half second debounce.
    const search = setTimeout(performSmartSearch(extras), 500);
    return () => clearTimeout(search);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, searchFilters, pageIndex]);

  /**
   * Performs search call with filters to backend and updates redux with retrieved courses.
   * Smart search: performs search with all possible substring combinations of lengths 3 and above based on search query.
   * @param extras - search params
   * @param queryLength - length of search query
   * @returns reference to a function that conducts smart search
   */
  const performSmartSearch =
    (extras: SearchExtras): (() => void) =>
    (): void => {
      axios
        .get(getAPI(window) + '/search', {
          params: getParams(extras),
        })
        .then((retrieved) => {
          let retrievedCourses: SISRetrievedCourse[] =
            retrieved.data.data.courses;
          const pageCount = retrieved.data.data.pagination.last;
          dispatch(updatePageCount(pageCount));
          dispatch(updateRetrievedCourses(retrievedCourses));
          setSearching(false);
        })
        .catch(() => {
          setSearching(false);
        });
    };

  // Update search term
  const handleSearchTerm = (event: any): void => {
    dispatch(updateSearchTerm(event.target.value));
  };

  return (
    <div className="w-full h-auto px-5 pt-3 border-b border-gray-400 select-none text-coursecard">
      <div className="flex flex-row h-auto flex-full">
        <input
          autoFocus
          className="mb-2 mr-2 px-1 w-full h-6 rounded outline-none width-[100%]"
          type="text"
          placeholder={'Course title or number'}
          defaultValue={searchTerm}
          onChange={handleSearchTerm}
        />
        <div
          className="flex flex-row items-center justify-center flex-none w-6 h-6 transition duration-200 ease-in transform bg-white rounded-full cursor-pointer hover:scale-110"
          onClick={() => setShowCriteria(!showCriteria)}
          data-tooltip-content={
            showCriteria ? 'Hide search criteria' : 'Show search criteria'
          }
          data-tooltip-id="godtip"
        >
          {!showCriteria ? (
            <img
              src="/svg/filter-nonfilled.svg"
              alt=""
              className="w-4 h-4 transform"
            />
          ) : (
            <img
              src="/svg/filter-filled.svg"
              alt=""
              className="w-4 h-4 transform"
            />
          )}
        </div>
      </div>
      <Filters showCriteria={showCriteria} />
    </div>
  );
};

export default Form;
