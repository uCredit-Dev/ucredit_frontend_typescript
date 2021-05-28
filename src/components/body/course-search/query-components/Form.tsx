import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateSearchTerm,
  updateRetrievedCourses,
  updateSearchFilters,
  selectSearchterm,
  selectSearchFilters,
  selectSemester,
} from "../../../slices/searchSlice";
import axios from "axios";
import {
  AreaType,
  Course,
  DepartmentType,
  SemesterType,
  TagType,
} from "../../../commonTypes";
import { ReactComponent as ShowSvg } from "../../../svg/Show.svg";
import { ReactComponent as HideSvg } from "../../../svg/Hide.svg";
import ReactTooltip from "react-tooltip";
import clsx from "clsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Filters from "./Filters";

// TODO: Multi select for various filters.
const api = "https://ucredit-api.herokuapp.com/api";

/* 
  Search form, including the search query input and filters.
*/
const Form = () => {
  // Set up redux dispatch and variables.
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchterm);
  const searchFilters = useSelector(selectSearchFilters);
  const semester = useSelector(selectSemester);

  // Component state setup
  const [showCriteria, setShowCriteria] = useState(false);
  const [showAllResults, setShowAllResults] = useState<boolean>(false);
  const [searchedCourses, setSearchedCourses] = useState<
    Map<string, SearchMapEl>
  >(new Map<string, SearchMapEl>());
  const [searching, setSearching] = useState<boolean>(false);

  // On opening search, set the term filter to match semester you're adding to.
  useEffect(() => {
    dispatch(updateSearchFilters({ filter: "term", value: semester }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  type SearchExtras = {
    query: string;
    credits: number | null;
    areas: AreaType | null;
    tags: TagType | null; // TODO: fill this out with array of all tags
    term: SemesterType | null;
    department: DepartmentType | null; // TODO: fill this out with array of departments
    wi: boolean | null;
  };

  type SearchMapEl = {
    course: Course;
    priority: number;
  };

  // Search with debouncing of 2/4s of a second.
  const minLength = 3;
  useEffect(() => {
    setSearchedCourses(new Map<string, SearchMapEl>());

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

  useEffect(() => {
    if (searching) {
      toast("Searching!", {
        position: "top-right",
        autoClose: false,
        draggable: true,
        progress: undefined,
      });
    }
  }, [searching]);

  // TODO: change from any to FilterObj type (but with Redux)
  function filterNone(searchFilters: any, returned: any[]) { 
    if (searchFilters.distribution === "N") {
      returned = returned.filter(
        (course: Course) => course.areas !== "None"
      );
    }
  }

  // Performs search call with filters to backend and updates redux with retrieved courses.
  // Smart search: performs search with all possible substring combinations of lengths 3 and above based on search query.
  // TODO: Optimize this so it doesn't call 10 billion get requests.
  const performSmartSearch =
    (extras: SearchExtras, queryLength: number) => () => {
      const querySubstrs: string[] = [];
      const retrievedCourses: Map<string, SearchMapEl> = searchedCourses;
      const doneSearchSubQueries: string[] = [];
      setSearching(true);

      if (
        queryLength >= minLength &&
        !extras.query.startsWith("EN.") &&
        !extras.query.startsWith("AS.") &&
        !extras.query.includes(".")
      ) {
        for (let i = 0; i < searchTerm.length - queryLength + 1; i++) {
          querySubstrs.push(searchTerm.substring(i, i + queryLength));
        }
      } else {
        // Perform old search if search query is less than the minLength for a smart search.
        axios
          .get(api + "/search", {
            params: extras,
          })
          .then((courses) => {
            let returned: any[] = courses.data.data.sort(
              (course1: Course, course2: Course) =>
                course1.title.localeCompare(course2.title)
            );
            
            filterNone(searchFilters, returned);
            
            if (!showAllResults) {
              // if showAllResults is selected, we search for all; otherwise, we only show top few.
              returned = returned.slice(0, 10);
            }

            setSearching(false);
            dispatch(updateRetrievedCourses(returned));

            toast.dismiss();
            toast.success("Found " + returned.length + " results!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }

      // For each query substring, search.
      querySubstrs.forEach((subQuery) => {
        extras.query = subQuery;
        axios
          .get(api + "/search", {
            params: extras,
          })
          .then((courses) => {
            doneSearchSubQueries.push(subQuery);

            let returned: Course[] = courses.data.data.sort(
              (course1: Course, course2: Course) =>
                course1.number.localeCompare(course2.number)
            );

            filterNone(searchFilters, returned);

            returned.forEach((course: Course) => {
              if (
                !retrievedCourses.has(course.number) &&
                (searchedCourses.size < 10 ||
                  extras.query.length === 0 ||
                  showAllResults) // if showAllResults is selected, we search for all; otherwise, we only show top few.
              ) {
                retrievedCourses.set(course.number, {
                  course: course,
                  priority: queryLength,
                });
              }
            });

            // All subqueries are done searching
            if (doneSearchSubQueries.length === querySubstrs.length) {
              if (
                queryLength > minLength &&
                (searchedCourses.size < 10 ||
                  extras.query.length === 0 ||
                  showAllResults) // if showAllResults is selected, we search for all; otherwise, we only show top few.
              ) {
                setSearchedCourses(
                  new Map<string, SearchMapEl>(retrievedCourses)
                );
                performSmartSearch(extras, queryLength - 1)();
              } else {
                const newSearchList: Course[] = getNewSearchList();
                dispatch(updateRetrievedCourses(newSearchList));
                setSearching(false);

                toast.dismiss();
                toast.success("Found " + newSearchList.length + " results!", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              }
            }
          })
          .catch((err) => {
            doneSearchSubQueries.push(subQuery);
            console.log(err);
          });
      });
    };

  // Gets new list of searched courses.
  const getNewSearchList = (): Course[] => {
    const searchList: Course[] = [];

    // sorts searchedCourses map by priority.
    searchedCourses[Symbol.iterator] = function* () {
      yield* [...this.entries()].sort((a, b) => b[1].priority - a[1].priority);
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

  const showAll = () => {
    setShowAllResults(true);
  };

  const dontShowAll = () => {
    setShowAllResults(false);
  };

  return (
    <div className="px-5 py-3 w-full h-auto text-coursecard border-b border-black select-none">
      <ReactTooltip />
      <div className="flex-full flex flex-row h-auto">
        <input
          autoFocus
          className={clsx("mr-2 px-1 w-full h-6 rounded outline-none", {
            "mb-2": showCriteria,
          })}
          type="text"
          placeholder={"Course title or number (ie. Physics, 601.280, etc.)"}
          style={{ width: "100%" }}
          defaultValue={searchTerm}
          onChange={handleSearchTerm}
        />
        <div
          className="flex flex-none flex-row items-center justify-center w-6 h-6 bg-white rounded cursor-pointer"
          onClick={() => setShowCriteria(!showCriteria)}
          data-tip={
            showCriteria ? "Hide search criteria" : "Show search criteria"
          }
        >
          {!showCriteria ? (
            <ShowSvg className="w-4 h-4 stroke-2" />
          ) : (
            <HideSvg className="w-4 h-4 stroke-2" />
          )}
        </div>
      </div>
      <div>
        {showAllResults ? (
          <button onClick={dontShowAll}>Show Top Results (faster)</button>
        ) : (
          <button onClick={showAll}>
            Don't see your class? Show all results (slower)
          </button>
        )}
      </div>
      {showCriteria ? <Filters /> : null}
    </div>
  );
};

export default Form;
