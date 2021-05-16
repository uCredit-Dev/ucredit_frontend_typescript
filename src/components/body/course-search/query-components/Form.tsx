import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateSearchTerm,
  updateRetrievedCourses,
  updateSearchFilters,
  updateSearchTime,
  selectSearchterm,
  selectSearchFilters,
  selectSemester,
  selectYear,
} from "../../../slices/searchSlice";
import axios from "axios";
import {
  AreaType,
  Course,
  DepartmentType,
  FilterType,
  SemesterType,
  TagType,
} from "../../../commonTypes";
import { all_majors, course_tags } from "../../../assets";
import { ReactComponent as ShowSvg } from "../../../svg/Show.svg";
import { ReactComponent as HideSvg } from "../../../svg/Hide.svg";
import ReactTooltip from "react-tooltip";
import clsx from "clsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// TODO: This file could be modularized. Esp with the recurring code for options.
// TODO: Multi select for various filters.
const api = "https://ucredit-api.herokuapp.com/api";

const creditFilters = ["Any", 0, 1, 2, 3, 4];
const distributionFilters = ["Any", "N", "S", "H", "Q", "E"];
const termFilters: SemesterType[] = [
  "fall",
  "spring",
  "intersession",
  "summer",
];
const wiFilters = ["Any", "True", "False"];
const departmentFilters = ["Any", ...all_majors];
const tagFilters = ["Any", ...course_tags];
// Implement smarter search

/* 
  Search form, including the search query input and filters.
*/
const Form = () => {
  const [showCriteria, setShowCriteria] = useState(false);

  // Set up redux dispatch and variables.
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchterm);
  const searchFilters = useSelector(selectSearchFilters);
  const semester = useSelector(selectSemester);
  const year = useSelector(selectYear);

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

  const minLength = 3;
  const [searching, setSearching] = useState<boolean>(false);

  // Search with debouncing of 3/4s of a second.
  useEffect(() => {
    setSearchedCourses(new Map<string, SearchMapEl>());
    // Otherwise, user is searching for something.
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
    const search = setTimeout(
      performSmartSearch(extras, searchTerm.length),
      500
    );

    return () => clearTimeout(search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, searchFilters]);
  const [searchedCourses, setSearchedCourses] = useState<
    Map<string, SearchMapEl>
  >(new Map<string, SearchMapEl>());

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

  // Performs search call with filters to backend and updates redux with retrieved courses.
  // Smart search: performs search with all possible substring combinations of lengths 3 and above based on search query.
  // TODO: Optimize this so it doesn't call 10 billioin search get requests.
  const performSmartSearch = (
    extras: SearchExtras,
    queryLength: number
  ) => () => {
    const querySubstrs: string[] = [];
    const retrievedCourses: Map<string, SearchMapEl> = searchedCourses;
    const doneSearchSubQueries: string[] = [];
    setSearching(true);

    if (queryLength >= minLength) {
      for (let i = 0; i < searchTerm.length - queryLength + 1; i++) {
        querySubstrs.push(searchTerm.substring(i, i + queryLength));
      }
    } else if (searchTerm.length < minLength) {
      // Perform old search if search query is less than the minLength fora  smart search.
      axios
        .get(api + "/search", {
          params: extras,
        })
        .then((courses) => {
          let returned = courses.data.data.sort(
            (course1: Course, course2: Course) =>
              course1.title.localeCompare(course2.title)
          );
          if (searchFilters.distribution === "N") {
            returned = returned.filter(
              (course: Course) => course.areas !== "None"
            );
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
          if (searchFilters.distribution === "N") {
            returned = returned.filter(
              (course: Course) => course.areas !== "None"
            );
          }

          returned.forEach((course: Course) => {
            if (!retrievedCourses.has(course.number)) {
              retrievedCourses.set(course.number, {
                course: course,
                priority: queryLength,
              });
            }
          });

          // All subqueries are done searching
          if (doneSearchSubQueries.length === querySubstrs.length) {
            if (queryLength > minLength) {
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

  // Update searching for certain amounts of credits
  const handleCreditFilterChange = (event: any): void => {
    const params: { filter: FilterType; value: any } = {
      filter: "credits",
      value: event.target.value,
    };
    dispatch(updateSearchFilters(params));
  };

  // Update searching for a certain distribution.
  const handleDistributionFilterChange = (event: any): void => {
    const params: { filter: FilterType; value: any } = {
      filter: "distribution",
      value: event.target.value,
    };
    dispatch(updateSearchFilters(params));
  };

  // Update searching for a certain term.
  const handleTermFilterChange = (event: any): void => {
    const params: { filter: FilterType; value: any } = {
      filter: "term",
      value: event.target.value,
    };
    dispatch(
      updateSearchTime({ searchSemester: event.target.value, searchYear: year })
    );
    dispatch(updateSearchFilters(params));
  };

  // Update searching for a writing intensives or not..
  const handleWIFilterChange = (event: any): void => {
    const params: { filter: FilterType; value: any } = {
      filter: "wi",
      value:
        event.target.value === "Yes"
          ? true
          : event.target.value === "No"
          ? false
          : "Any",
    };
    dispatch(updateSearchFilters(params));
  };

  // Update searching for a certain department.
  const handleDepartmentFilterChange = (event: any): void => {
    const params: { filter: FilterType; value: any } = {
      filter: "department",
      value: event.target.value,
    };
    dispatch(updateSearchFilters(params));
  };

  // Update searching for a certain tag
  const handleTagsFilterChange = (event: any): void => {
    const params: { filter: FilterType; value: any } = {
      filter: "tags",
      value: event.target.value,
    };
    dispatch(updateSearchFilters(params));
  };

  return (
    <div className="px-5 py-3 w-full h-auto text-coursecard border-b border-black select-none">
      <ReactTooltip />
      <div className="flex-full flex flex-row h-auto">
        <input
          className={clsx(" mr-2 px-1 w-full h-6 rounded outline-none", {
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
      {showCriteria ? (
        <div>
          <div className="flex flex-row items-center justify-between mb-2 w-full h-auto">
            Department
            <select
              className="w-36 h-6 rounded outline-none"
              onChange={handleDepartmentFilterChange}
              defaultValue={searchFilters.department}
            >
              {departmentFilters.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-row items-center justify-between mb-2 w-full h-auto">
            Credits
            <select
              className="w-auto h-6 rounded outline-none"
              onChange={handleCreditFilterChange}
              defaultValue={searchFilters.credits}
            >
              {creditFilters.map((credits) => (
                <option key={credits} value={credits}>
                  {credits}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-row items-center justify-between mb-2 w-full h-auto">
            Area
            <select
              className="w-auto h-6 rounded outline-none"
              onChange={handleDistributionFilterChange}
              defaultValue={searchFilters.distribution}
            >
              {distributionFilters.map((distribution) => (
                <option key={distribution} value={distribution}>
                  {distribution}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-row items-center justify-between mb-2 w-full h-auto">
            Term
            <select
              className="w-14 h-6 rounded outline-none"
              onChange={handleTermFilterChange}
              defaultValue={semester}
            >
              {termFilters.map((term) => (
                <option key={term} value={term}>
                  {term}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-row items-center justify-between mb-2 w-full h-auto">
            Writing Intensive
            <select
              className="w-auto h-6 rounded outline-none"
              onChange={handleWIFilterChange}
              defaultValue={searchFilters.distribution}
            >
              {wiFilters.map((wi) => (
                <option key={wi} value={wi}>
                  {wi}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-row items-center justify-between mb-2 w-full h-auto">
            Tag
            <select
              className="w-18 h-6 rounded outline-none"
              onChange={handleTagsFilterChange}
              defaultValue={searchFilters.distribution}
            >
              {tagFilters.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Form;
