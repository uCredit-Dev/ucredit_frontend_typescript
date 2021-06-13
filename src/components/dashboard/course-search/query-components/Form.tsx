import React, { useEffect, useState } from "react";
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
  AreaType,
  DepartmentType,
  SemesterType,
  SISRetrievedCourse,
  TagType,
} from "../../../../resources/commonTypes";
import { ReactComponent as FilterFilledSvg } from "../../../../resources/svg/FilterFilled.svg";
import { ReactComponent as FilterNonFilledSvg } from "../../../../resources/svg/FilterNonFilled.svg";
import ReactTooltip from "react-tooltip";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Filters from "./Filters";
import { selectAllCourses } from "../../../../slices/userSlice";

/**
 * Search form, including the search query input and filters.
 * TODO: Multi select for various filters.
 *
 * @param setSearching - sets searching state
 */
const Form = (props: { setSearching: Function }) => {
  // Set up redux dispatch and variables.
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchterm);
  const searchFilters = useSelector(selectSearchFilters);
  const semester = useSelector(selectSemester);
  const allCourses = useSelector(selectAllCourses);

  // Component state setup
  const [showCriteria, setShowCriteria] = useState(false);
  const [showAllResults, setShowAllResults] = useState<boolean>(false);
  const [searchedCourses] = useState<Map<String, SearchMapEl>>(
    new Map<String, SearchMapEl>()
  );

  // On opening search, set the term filter to match semester you're adding to.
  useEffect(() => {
    dispatch(updateSearchFilters({ filter: "term", value: semester }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  type SearchExtras = {
    query: string;
    credits: number | null;
    areas: AreaType | null;
    tags: TagType | null;
    term: SemesterType | null;
    department: DepartmentType | null;
    wi: boolean | null;
  };

  type SearchMapEl = {
    course: SISRetrievedCourse;
    priority: number;
  };

  // Search with debouncing of 2/4s of a second.
  const minLength = 3;
  useEffect(() => {
    searchedCourses.clear();
    props.setSearching(false);
    // Skip searching if no filters or queries are specified
    if (
      searchTerm.length === 0 &&
      searchFilters.credits === "Any" &&
      searchFilters.distribution === "Any" &&
      searchFilters.wi === "Any" &&
      searchFilters.department === "Any" &&
      searchFilters.tags === "Any"
    ) {
      dispatch(updateRetrievedCourses([]));
      return;
    }

    // Search params.
    const extras: SearchExtras = {
      query: searchTerm,
      credits: searchFilters.credits === "Any" ? null : searchFilters.credits,
      areas:
        searchFilters.distribution === "Any"
          ? null
          : searchFilters.distribution,
      wi: searchFilters.wi === "Any" ? null : searchFilters.wi,
      term: searchFilters.term === "Any" ? null : searchFilters.term,
      department:
        searchFilters.department === "Any" ? null : searchFilters.department,
      tags: searchFilters.tags === "Any" ? null : searchFilters.tags,
    };

    // Search with half second debounce.
    const search = setTimeout(
      performSmartSearch(extras, searchTerm.length),
      500
    );
    return () => clearTimeout(search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, searchFilters, showAllResults]);

  // Finds course based on the search conditions given in extras.
  // Finds all relevant courses by starting with all courses and filtering them out.
  const find = (extras: SearchExtras): SISRetrievedCourse[] => {
    let courses: SISRetrievedCourse[] = [...allCourses];
    if (extras.query.length > 0) {
      courses = courses.filter((course) => {
        if (
          extras.query.includes(".") ||
          !isNaN(parseInt(extras.query)) ||
          extras.query.startsWith("EN.") ||
          extras.query.startsWith("AS.")
        ) {
          return course.number
            .toLowerCase()
            .includes(extras.query.toLowerCase());
        } else {
          return course.title
            .toLowerCase()
            .includes(extras.query.toLowerCase());
        }
      });
    }

    const credits = extras.credits;
    if (credits !== null) {
      courses = courses.filter((course) => {
        let satisfied = false;
        course.versions.forEach((v) => {
          if (v.credits.toString() === credits.toString()) {
            satisfied = true;
          }
        });
        return satisfied;
      });
    }

    const areas = extras.areas;
    if (areas !== null) {
      courses = courses.filter((course) => {
        let satisfied = false;
        course.versions.forEach((v) => {
          if (v.areas.includes(areas)) {
            satisfied = true;
          }
        });
        return satisfied;
      });
    }

    const department = extras.department;
    if (department !== null) {
      courses = courses.filter((course) => {
        let satisfied = false;
        course.versions.forEach((v) => {
          if (v.department === department) {
            satisfied = true;
          }
        });
        return satisfied;
      });
    }

    const tag = extras.tags;
    if (tag !== null) {
      courses = courses.filter((course) => {
        let satisfied = false;
        course.versions.forEach((v) => {
          if (v.tags.includes(tag)) {
            satisfied = true;
          }
        });
        return satisfied;
      });
    }

    const term = extras.term;
    if (term !== null) {
      courses = courses.filter((course) => {
        let found = false;
        course.terms.forEach((courseTerm) => {
          if (courseTerm.includes(term)) {
            found = true;
          }
        });
        return found;
      });
    }

    const wi = extras.wi;
    if (wi !== null) {
      courses = courses.filter((course) => {
        let satisfied = false;
        course.versions.forEach((v) => {
          if (v.wi && wi) {
            satisfied = true;
          }
        });
        return satisfied;
      });
      // courses = courses.filter((course) => course.wi && wi);
    }

    return courses;
  };

  // Updates search results and makes a toast based on amount of results found.
  const updateSearchResults = (results: SISRetrievedCourse[]) => {
    dispatch(updateRetrievedCourses(results));
    if (results.length > 0) {
      props.setSearching(false);
      toast.success("Found " + results.length + " results!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
      });
    } else {
      toast.error("Found 0 results!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
      });
    }
  };

  // Searches for all subquery combinations for the specific substring length, queryLength.
  // Calls performSmartSearch again if the queryLength is still greater than the
  // minimum query length. Otherwise, displays results.
  function substringSearch(
    extras: SearchExtras,
    queryLength: number,
    querySubstrs: string[]
  ) {
    let courses: SISRetrievedCourse[] = [];

    querySubstrs.forEach((subQuery) => {
      courses.push(...find({ ...extras, query: subQuery }));
    });

    courses.forEach((course: SISRetrievedCourse) => {
      if (!searchedCourses.has(course.number)) {
        searchedCourses.set(course.number, {
          course: course,
          priority: queryLength,
        });
      }
    });

    if (queryLength > minLength) {
      performSmartSearch(extras, queryLength - 1)();
    } else {
      const newSearchList: SISRetrievedCourse[] = getNewSearchList();
      updateSearchResults(newSearchList);
    }
  }

  // Performs search call with filters to backend and updates redux with retrieved courses.
  // Smart search: performs search with all possible substring combinations of lengths 3 and above based on search query.
  const performSmartSearch =
    (extras: SearchExtras, queryLength: number) => () => {
      const querySubstrs: string[] = [];
      props.setSearching(true);

      if (
        queryLength >= minLength &&
        !extras.query.startsWith("EN.") &&
        !extras.query.startsWith("AS.") &&
        !extras.query.includes(".") &&
        isNaN(parseInt(extras.query))
      ) {
        // Finds all substring combinations and searches.
        for (let i = 0; i < searchTerm.length - queryLength + 1; i++) {
          querySubstrs.push(searchTerm.substring(i, i + queryLength));
        }
        substringSearch(extras, queryLength, querySubstrs);
      } else {
        // Perform old search if search query is less than the minLength for a smart search.
        let courses: SISRetrievedCourse[] = find(extras);
        updateSearchResults(courses);
      }
    };

  // Gets new list of searched courses.
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

    if (!showAllResults) {
      searchList = searchList.slice(0, 10);
    }

    return searchList;
  };

  // Update search term
  const handleSearchTerm = (event: any): void => {
    dispatch(updateSearchTerm(event.target.value));
  };

  // Shows all results.
  const showAll = () => {
    setShowAllResults(true);
  };

  // Only shows first page of results.
  const dontShowAll = () => {
    setShowAllResults(false);
  };

  return (
    <div className="pt-3 px-5 w-full h-auto text-coursecard border-b border-black select-none">
      <ReactTooltip />
      <div className="flex-full flex flex-row h-auto">
        <input
          autoFocus
          className="mb-2 mr-2 px-1 w-full h-6 rounded outline-none"
          type="text"
          placeholder={"Course title or number (ie. Physics, 601.280, etc.)"}
          style={{ width: "100%" }}
          defaultValue={searchTerm}
          onChange={handleSearchTerm}
        />
        <div
          className="flex flex-none flex-row items-center justify-center w-6 h-6 bg-white rounded cursor-pointer transform hover:scale-125 transition duration-200 ease-in"
          onClick={() => setShowCriteria(!showCriteria)}
          data-tip={
            showCriteria ? "Hide search criteria" : "Show search criteria"
          }
        >
          {!showCriteria ? (
            <FilterNonFilledSvg className="w-4 h-4" />
          ) : (
            <FilterFilledSvg className="w-4 h-4" />
          )}
        </div>
      </div>
      <div className="mb-2">
        {showAllResults ? (
          <button onClick={dontShowAll} className="focus:outline-none">
            <u>Show Top 10 Results</u>
          </button>
        ) : (
          <button onClick={showAll} className="focus:outline-none">
            <u>Don't see your class? Show all results.</u>
          </button>
        )}
      </div>
      {showCriteria ? <Filters /> : null}
    </div>
  );
};

export default Form;
