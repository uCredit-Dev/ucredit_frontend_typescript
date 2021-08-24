import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateSearchTerm,
  updateRetrievedCourses,
  updateRetrievedVersions,
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
import { ReactComponent as ArrowUp } from "../../../../resources/svg/ArrowUp.svg";
import { ReactComponent as ArrowDown } from "../../../../resources/svg/ArrowDown.svg";
import "react-toastify/dist/ReactToastify.css";
import Filters from "./Filters";
import { selectCourseCache, selectRetrievedAll, updateCourseCache } from "../../../../slices/userSlice";
import axios from "axios";
import { api } from "../../../../resources/assets";

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
  const courseCache = useSelector(selectCourseCache);
  const retrievedAll = useSelector(selectRetrievedAll);

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

  type SearchMapEl = {
    course: SISRetrievedCourse;
    version: number;
    priority: number;
  };

  // TODO: A lot of redundancies with FilterType. Please look into modularization.
  type SearchExtras = {
    query: string;
    credits: string | null;
    areas: AreaType | null;
    tags: TagType | null;
    term: SemesterType;
    year: number;
    department: DepartmentType | null;
    wi: boolean | null;
    levels: string | null;
  };

  // Search with debouncing of 2/4s of a second.
  const minLength = 3;
  useEffect(() => {
    searchedCourses.clear();
    props.setSearching(false);
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
      dispatch(updateRetrievedVersions([]));
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
  const find = (extras: SearchExtras): Promise<[SISRetrievedCourse[], number[]]> => {
    return new Promise((resolve) => {
      let courses: SISRetrievedCourse[] = [...courseCache];
      console.log(retrievedAll);
      if (!retrievedAll) {
        axios.get("https://ucredit-dev.herokuapp.com/api/search", {
          params: {
            query: extras.query,
            department: extras.department,
            term: extras.term,
            areas: extras.areas,
            credits: extras.credits,
            wi: extras.wi,
            tags: extras.tags,
          },
        }).then((retrieved) => {
          let retrievedCourses : SISRetrievedCourse[] = retrieved.data.data;
          dispatch(updateCourseCache([...retrievedCourses]));
          let SISRetrieved: SISRetrievedCourse[] = retrieved.data.data;
          return resolve([SISRetrieved, []]);
        })
        .catch(() => {return [[], []]});
      } else {
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
    
        let credits = extras.credits;
        if (credits !== null) {
          const creditsString = credits.toString();
          courses = courses.filter((course) => {
            let satisfied = false;
            creditsString.split("").forEach((c: string) =>
              course.versions.forEach((v) => {
                if (v.credits.toString() === c) {
                  satisfied = true;
                }
              })
            );
            return satisfied;
          });
        }
    
        const areas = extras.areas;
        if (areas !== null) {
          courses = courses.filter((course) => {
            let satisfied = false;
            areas.split("").forEach((a: string) =>
              course.versions.forEach((v) => {
                if (v.areas.includes(a)) {
                  satisfied = true;
                }
              })
            );
            return satisfied;
          });
        }
    
        const departments = extras.department;
        if (departments !== null) {
          courses = courses.filter((course) => {
            let satisfied = false;
            departments.split("|").forEach((d: string) =>
              course.versions.forEach((v) => {
                if (v.department === d) {
                  satisfied = true;
                }
              })
            );
            return satisfied;
          });
        }
    
        const tags = extras.tags;
        if (tags !== null) {
          courses = courses.filter((course) => {
            let satisfied = false;
            tags.split("|").forEach((t: string) =>
              course.versions.forEach((v) => {
                if (v.tags.includes(t)) {
                  satisfied = true;
                }
              })
            );
            return satisfied;
          });
        }
    
        const levels = extras.levels;
        if (levels !== null) {
          courses = courses.filter((course) => {
            let satisfied = false;
            course.versions.forEach((v) => {
              levels.split("|").forEach((level) => {
                if (v.level === level) {
                  satisfied = true;
                }
              });
            });
            return satisfied;
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
        }
    
        const semester = extras.term + " " + extras.year;
        let versions: number[] = [];
        courses = courses.filter((course) => {
          let toReturn = false;
          course.terms.forEach((term) => {
            if (term === semester) {
              toReturn = true;
            }
          });
          return toReturn;
        });
        return resolve([courses, versions]);
      }
    })
  };

  // Updates search results.
  const updateSearchResults = (
    results: SISRetrievedCourse[],
    versions: number[]
  ) => {
    dispatch(updateRetrievedCourses(results));
    dispatch(updateRetrievedVersions(versions));
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
            if (!searchedCourses.has(course.number)) {
              searchedCourses.set(course.number, {
                course: course,
                version: versions[index],
                priority: queryLength,
              });
            }
          });
          const newSearchList: [SISRetrievedCourse[], number[]] =
              getNewSearchList();
          updateSearchResults(newSearchList[0], newSearchList[1]);
          if (queryLength > minLength) {
            performSmartSearch(extras, queryLength - 1)();
          }
        }
      })
    });
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
        find(extras).then((courses) => {
          updateSearchResults(courses[0], courses[1]);
        })
      }
    };

  // Gets new list of searched courses.
  const getNewSearchList = (): [SISRetrievedCourse[], number[]] => {
    let searchList: SISRetrievedCourse[] = [];
    let versions: number[] = [];
    // sorts searchedCourses map by priority.
    searchedCourses[Symbol.iterator] = function* () {
      yield* [...this.entries()]
        .sort((a, b) => a[1].course.title.length - b[1].course.title.length)
        .sort((a, b) => b[1].priority - a[1].priority);
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (let [key, value] of searchedCourses) {
      searchList.push(value.course);
      versions.push(value.version);
    }

    if (!showAllResults) {
      searchList = searchList.slice(0, 10);
    }
    return [searchList, versions];
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
            <ArrowUp className="w-4 h-4 transform" />
          ) : (
            <ArrowDown className="w-4 h-4 transform" />
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
            <u>Don't see your class? Show all results</u>
          </button>
        )}
      </div>
      <Filters showCriteria={showCriteria} />
    </div>
  );
};

export default Form;
