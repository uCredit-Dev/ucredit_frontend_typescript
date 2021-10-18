import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateSearchTerm,
  updateRetrievedCourses,
  updateSearchFilters,
  selectSearchterm,
  selectSearchFilters,
  selectSemester,
} from "../../../../slices/searchSlice";
import {
  SearchExtras,
  SISRetrievedCourse,
} from "../../../../resources/commonTypes";
import { ReactComponent as FilterFilled } from "../../../../resources/svg/FilterFilled.svg";
import { ReactComponent as FilterNonFilled } from "../../../../resources/svg/FilterNonFilled.svg";
import "react-toastify/dist/ReactToastify.css";
import Filters from "./Filters";
import {
  selectCourseCache,
  selectRetrievedAll,
  updateCourseCache,
} from "../../../../slices/userSlice";
import axios from "axios";
import { api } from "../../../../resources/assets";
import { filterCourses } from "./formUtils";

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
const Form: FC<{ setSearching: Function }> = (props) => {
  // Set up redux dispatch and variables.
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchterm);
  const searchFilters = useSelector(selectSearchFilters);
  const semester = useSelector(selectSemester);
  const courseCache = useSelector(selectCourseCache);
  const retrievedAll = useSelector(selectRetrievedAll);

  // Component state setup
  const [showCriteria, setShowCriteria] = useState(false);
  const [searchedCourses] = useState<Map<String, SearchMapEl>>(
    new Map<String, SearchMapEl>()
  );
  const [searchedCoursesFrequency] = useState<Map<String, number>>(
    new Map<String, number>()
  );
  const [initialQueryLength, setInitialQueryLength] = useState<number>(0);

  // On opening search, set the term filter to match semester you're adding to.
  useEffect(() => {
    dispatch(updateSearchFilters({ filter: "term", value: semester }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Search with debouncing of 2/4s of a second.
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
      searchFilters.tags === null
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
      year: searchFilters.year,
      department: searchFilters.department,
      tags: searchFilters.tags,
      levels: searchFilters.levels,
    };

    props.setSearching(true);

    if (searchTerm.length > 0) {
      // Search with half second debounce.
      const search = setTimeout(
        performSmartSearch(extras, searchTerm.length),
        500
      );
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
    extras: SearchExtras
  ): Promise<[SISRetrievedCourse[], number[]]> => {
    return new Promise((resolve) => {
      let courses: SISRetrievedCourse[] = [...courseCache];
      if (!retrievedAll) {
        axios
          .get(api + "/search", {
            params: getParams(extras),
          })
          .then((retrieved) => {
            let retrievedCourses: SISRetrievedCourse[] = retrieved.data.data;
            dispatch(updateCourseCache([...retrievedCourses]));
            let SISRetrieved: SISRetrievedCourse[] = retrieved.data.data;
            if (
              extras.query.length <= minLength ||
              searchTerm.length - extras.query.length >= 2
            ) {
              props.setSearching(false);
            }
            console.log(SISRetrieved);
            return resolve([SISRetrieved, []]);
          })
          .catch(() => {
            return [[], []];
          });
      } else {
        const filterProcessing = filterCourses(extras, courses);
        if (filterProcessing) return filterProcessing;
        return resolve([courses, []]);
      }
    });
  };

  /**
   * Searches for all subquery combinations for the specific substring length, queryLength.
   * Calls performSmartSearch again if the queryLength is still greater than the
   * minimum query length. Otherwise, displays results.
   * @param extras - search params
   * @param queryLength - length of search query
   * @param querySubstrs - an array of different substring combinations of search query
   */
  function substringSearch(
    extras: SearchExtras,
    queryLength: number,
    querySubstrs: string[]
  ) {
    let courses: SISRetrievedCourse[] = [];
    let versions: number[] = [];
    let total = 0;
    let cum = 0;
    querySubstrs.forEach((subQuery) => {
      total++;
      find({ ...extras, query: subQuery }).then((courseVersions) => {
        cum++;
        courses.push(...courseVersions[0]);
        versions.push(...courseVersions[1]);
        if (total === cum) {
          courses.forEach((course: SISRetrievedCourse, index: number) => {
            if (!searchedCourses.has(course.number + "0")) {
              searchedCourses.set(course.number + "0", {
                course: course,
                version: versions[index],
                priority: queryLength,
              });
              searchedCoursesFrequency.set(course.number, 1);
            } else {
              var frequency = searchedCoursesFrequency.get(course.number);
              let flag = false;
              if (frequency !== undefined) {
                for (let i = 0; i < frequency; i++) {
                  if (
                    searchedCourses.get(course.number + i)?.course.title ===
                    course.title
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
            }
          });
          const newSearchList: SISRetrievedCourse[] = getNewSearchList();
          dispatch(updateRetrievedCourses(newSearchList));
          if (queryLength > minLength && initialQueryLength - queryLength < 9) {
            performSmartSearch(extras, queryLength - 1)();
          }
        }
      });
    });
  }

  /**
   * Performs search call with filters to backend and updates redux with retrieved courses.
   * Smart search: performs search with all possible substring combinations of lengths 3 and above based on search query.
   * @param extras - search params
   * @param queryLength - length of search query
   * @returns reference to a function that conducts smart search
   */
  const performSmartSearch =
    (extras: SearchExtras, queryLength: number) => () => {
      const querySubstrs: string[] = [];
      if (queryLength >= minLength) {
        // Finds all substring combinations and searches.
        for (let i = 0; i < searchTerm.length - queryLength + 1; i++) {
          querySubstrs.push(searchTerm.substring(i, i + queryLength));
        }
        substringSearch(extras, queryLength, querySubstrs);
      } else if (queryLength > 0 && queryLength < minLength) {
        // Perform normal search if query length is between 1 and minLength
        axios
          .get(api + "/search", {
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (let [key, value] of searchedCourses) {
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
  });

  return (
    <div className="pt-3 px-5 w-full h-auto text-coursecard border-b border-gray-400 select-none">
      <div className="flex-full flex flex-row h-auto">
        <input
          autoFocus
          className="mb-2 mr-2 px-1 w-full h-6 rounded outline-none"
          type="text"
          placeholder={"Course title or number"}
          style={{ width: "100%" }}
          defaultValue={searchTerm}
          onChange={handleSearchTerm}
        />
        <div
          className="flex flex-none flex-row items-center justify-center w-6 h-6 bg-white rounded-full shadow cursor-pointer transform hover:scale-110 transition duration-200 ease-in"
          onClick={() => setShowCriteria(!showCriteria)}
          data-tip={
            showCriteria ? "Hide search criteria" : "Show search criteria"
          }
          data-for="godTip"
        >
          {!showCriteria ? (
            <FilterNonFilled className="w-4 h-4 transform" />
          ) : (
            <FilterFilled className="w-4 h-4 transform" />
          )}
        </div>
      </div>
      <Filters showCriteria={showCriteria} />
    </div>
  );
};

export default Form;
