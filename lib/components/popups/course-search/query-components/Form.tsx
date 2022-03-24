import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateSearchTerm,
  updateRetrievedCourses,
  updateSearchFilters,
  selectSearchterm,
  selectSearchFilters,
  selectSemester,
  selectYear,
} from '../../../../slices/searchSlice';
import {
  SearchExtras,
  SISRetrievedCourse,
} from '../../../../resources/commonTypes';
import 'react-toastify/dist/ReactToastify.css';
import Filters from './Filters';
import {
  selectCourseCache,
  selectRetrievedAll,
  updateCourseCache,
} from '../../../../slices/userSlice';
import axios from 'axios';
import { api } from '../../../../resources/assets';
import { filterCourses } from './formUtils';
import { selectPlan } from '../../../../slices/currentPlanSlice';

type SearchMapEl = {
  course: SISRetrievedCourse;
  version: number;
  priority: number;
};

/**
 * Search form, including the search query input and filters.
 * TODO: Multi select for various filters.
 *
 * @prop setSearching - sets searching state
 */
const Form: FC<{ setSearching: (searching: boolean) => void }> = (props) => {
  // Set up redux dispatch and variables.
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchterm);
  const searchFilters = useSelector(selectSearchFilters);
  const semester = useSelector(selectSemester);
  const courseCache = useSelector(selectCourseCache);
  const retrievedAll = useSelector(selectRetrievedAll);
  const currentPlan = useSelector(selectPlan);
  const searchYear = useSelector(selectYear);

  // Component state setup
  const [showCriteria, setShowCriteria] = useState(false);
  const [searchedCourses] = useState<Map<string, SearchMapEl>>(
    new Map<string, SearchMapEl>(),
  );
  const [searchedCoursesFrequency] = useState<Map<string, number>>(
    new Map<string, number>(),
  );
  const [initialQueryLength, setInitialQueryLength] = useState<number>(0);

  const getYearVal = (): number => {
    let year: number = new Date().getFullYear();
    currentPlan.years.forEach((yearObj) => {
      if (yearObj._id === searchYear) year = yearObj.year;
    });
    return year;
  };

  // On opening search, set the term filter to match semester you're adding to.
  // TODO: update registration times for each semester
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
      (semester === 'Intersession' && date.getMonth() === 11) ||
      (semester === 'Summer' &&
        date.getMonth() >= 2 &&
        yearVal !== date.getFullYear())
    )
      dispatch(
        updateSearchFilters({ filter: 'year', value: date.getFullYear() + 1 }),
      );
    else if (semester === 'Fall' && date.getMonth() < 5) {
      dispatch(
        updateSearchFilters({ filter: 'year', value: date.getFullYear() - 1 }),
      );
    } else
      dispatch(
        updateSearchFilters({ filter: 'year', value: date.getFullYear() }),
      );
  };

  // Search with debouncing of 2/4s of a second.
  // this is where the process to make search call to the API begins
  const minLength = 4;
  useEffect(() => {
    searchedCourses.clear();
    setInitialQueryLength(searchTerm.length);
    // Skip searching if no filters or queries are specified
    if (
      searchTerm.length === 0 &&
      searchFilters.credits === null &&
      searchFilters.distribution === null &&
      searchFilters.wi === null &&
      searchFilters.department === null &&
      searchFilters.tags === null &&
      searchFilters.levels === null
    ) {
      dispatch(updateRetrievedCourses([]));
      props.setSearching(false);
      return;
    }
    // Search params.
    const extras: SearchExtras = {
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

    props.setSearching(true);

    if (searchTerm.length > 0) {
      // Search with half second debounce.

      const search = setTimeout(() => {
        performMultiSmartSearch(searchTerm, extras, searchTerm.length)();
      }, 500);
      return () => clearTimeout(search);
    } else {
      find(extras).then((found) => dispatch(updateRetrievedCourses(found[0])));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, searchFilters]);

  /**
   * Finds course based on the search conditions given in extras.
   * Finds all relevant courses by starting with all courses and filtering them out.
   * @param extras - search params
   * @returns a promise that resolves when searching is concluded
   */
  const find = (
    extras: SearchExtras,
  ): Promise<[SISRetrievedCourse[], number[]]> => {
    return new Promise(async (resolve) => {
      let courses: SISRetrievedCourse[] = [...courseCache];
      if (!retrievedAll) {
        const retrieved: any = await axios
          .get(api + '/search', {
            params: getParams(extras),
          })
          .catch(() => {
            return [[], []];
          });
        if (!retrieved.data) {
          console.log(retrieved);
        }
        let SISRetrieved: SISRetrievedCourse[] = processedRetrievedData(
          retrieved.data.data,
          extras,
        );
        return resolve([SISRetrieved, []]);
      } else {
        const filterProcessing = filterCourses(extras, courses);
        if (filterProcessing) return filterProcessing;
        return resolve([courses, []]);
      }
    });
  };

  // Promise that sends API call for courses, resolves all matching courses in an array
  const multiFind = (
    extras: SearchExtras,
    queryLength: number,
  ): Promise<[SISRetrievedCourse[], number[]]> => {
    return new Promise(async (resolve) => {
      let courses: SISRetrievedCourse[] = [...courseCache];
      if (!retrievedAll) {
        const retrieved: any = await axios
          .get(api + '/search/smart/multi', {
            params: { ...getParams(extras), queryLength },
          })
          .catch(() => {
            return [[], []];
          });
        let SISRetrieved: SISRetrievedCourse[] = processedRetrievedData(
          retrieved.data.data,
          extras,
        );
        return resolve([SISRetrieved, []]);
      } else {
        const filterProcessing = filterCourses(extras, courses);
        if (filterProcessing) return filterProcessing;
        return resolve([courses, []]);
      }
    });
  };

  /**
   * Processes retrieved data after searching
   * @param data - retrieved data
   * @param extras - search params
   * @returns SISRetrieved - processed data
   */
  const processedRetrievedData = (
    data: SISRetrievedCourse[],
    extras: SearchExtras,
  ): SISRetrievedCourse[] => {
    let SISRetrieved: SISRetrievedCourse[] = data;
    if (
      extras.query.length <= minLength ||
      searchTerm.length - extras.query.length >= 2
    ) {
      props.setSearching(false);
    }
    return SISRetrieved;
  };

  /**
   * Searches for all subquery combinations for the specific substring length, queryLength.

   * @param originalQuery - da original query B)
   * @param extras - search params
   * @param queryLength - length of search query
   */
  const multiSubstringSearch = async (
    originalQuery: string,
    extras: SearchExtras,
    queryLength: number,
  ): Promise<void> => {
    let courses: SISRetrievedCourse[] = [];
    let versions: number[] = [];
    const courseVersions = await multiFind(extras, queryLength);
    courses.push(...courseVersions[0]);
    versions.push(...courseVersions[1]);
    let searchedQuery = {
      originalQuery,
      courses,
      versions,
      queryLength,
      extras,
    }
    if (searchedQuery !== null) {
      if (
        // only finishes handling if user is still searching same term
        searchedQuery.originalQuery === searchTerm
      ) {
        handleFinishFinding(
          searchedQuery.courses,
          searchedQuery.versions,
          searchedQuery.queryLength,
          searchedQuery.extras,
        );
      }
    }
  };

  // updates the frequency map
  // TODO : description of frequency map
  const updateFrequencyMap = (
    courses: SISRetrievedCourse[],
    versions: number[],
    queryLength: number,
  )  => {
    courses.forEach((course: SISRetrievedCourse, index: number) => {
      if (!searchedCourses.has(course.number + '0')) {
        searchedCourses.set(course.number + '0', {
          course: course,
          version: versions[index],
          priority: queryLength,
        });
        searchedCoursesFrequency.set(course.number, 1);
      } else {
        handleFrequency(course, versions, queryLength, index);
      }
    });
  }

  // Handles the finishing of finding courses.
  // tracks the number of times a course appears in the searchedCourses after a search
  // and presumably uses it to sort the list by relevancy (the map thingy)
  // also recursively calls the smartSearch
  const handleFinishFinding = (
    courses: SISRetrievedCourse[],
    versions: number[],
    queryLength: number,
    extras: SearchExtras,
  ) => {
    updateFrequencyMap(courses, versions, queryLength);
    const newSearchList: SISRetrievedCourse[] = getNewSearchList();
    dispatch(updateRetrievedCourses(newSearchList));
    if (queryLength > minLength && initialQueryLength - queryLength < 9) {
      performMultiSmartSearch(extras.query, extras, queryLength - 1)(); // new
    }
  };

  // Handles the frequency of a course.
  const handleFrequency = (
    course: SISRetrievedCourse,
    versions,
    queryLength: number,
    index: number,
  ) => {
    let frequency = searchedCoursesFrequency.get(course.number);
    let flag = false;
    if (frequency !== undefined) {
      for (let i = 0; i < frequency;   i++) {
        if (
          searchedCourses.get(course.number + i)?.course.title === course.title
        ) {
          flag = true;
        }
      }
      if (!flag) {
        searchedCourses.set(course.number + frequency, {
          course: course,
          version: versions[index],
          priority: queryLength,
        });
        searchedCoursesFrequency.set(course.number, frequency + 1);
      }
    }
  };

  const performMultiSmartSearch =
    (
      originalQuery: string,
      extras: SearchExtras,
      queryLength: number,
    ): (() => void) =>
    (): void => {
      if (queryLength >= minLength) {
        // Finds all substring combinations and searches.
        multiSubstringSearch(originalQuery, extras, queryLength);
      } else if (queryLength > 0 && queryLength < minLength) {
        // Perform normal search if query length is between 1 and minLength
        axios
          .get(api + '/search', {
            params: getParams(extras),
          })
          .then((retrieved) => {
            let retrievedCourses: SISRetrievedCourse[] = retrieved.data.data;
            dispatch(updateCourseCache([...retrievedCourses]));
            let SISRetrieved: SISRetrievedCourse[] = retrieved.data.data;
            dispatch(updateRetrievedCourses(SISRetrieved));
            props.setSearching(false);
          })
          .catch(() => {
            props.setSearching(false);
          });
      } else {
        props.setSearching(false);
      }
    };

  /**
   * Gets new list of searched courses.
   * @returns an array of retrieved courses
   */
  const getNewSearchList = (): SISRetrievedCourse[] => {
    let searchList: SISRetrievedCourse[] = [];
    // sorts searchedCourses map by priority.
    searchedCourses[Symbol.iterator] = function* () {
      yield* [...this.entries()]
        .sort((a, b) => a[1].course.title.length - b[1].course.title.length)
        .sort((a, b) => b[1].priority - a[1].priority);
    };
    for (let [, value] of searchedCourses) {
      searchList.push(value.course);
    }
    return searchList;
  };

  // Update search term
  const handleSearchTerm = (event: any): void => {
    dispatch(updateSearchTerm(event.target.value));
  };

  // Returns search fetch params
  const getParams = (extras: SearchExtras) => ({
    query: extras.query,
    department: extras.department,
    term: extras.term,
    areas: extras.areas,
    credits: extras.credits,
    wi: extras.wi,
    tags: extras.tags,
    level: extras.levels,
    year: extras.year,
  });

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
          className="flex flex-row items-center justify-center flex-none w-6 h-6 transition duration-200 ease-in transform bg-white rounded-full shadow cursor-pointer hover:scale-110"
          onClick={() => setShowCriteria(!showCriteria)}
          data-tip={
            showCriteria ? 'Hide search criteria' : 'Show search criteria'
          }
          data-for="godTip"
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
