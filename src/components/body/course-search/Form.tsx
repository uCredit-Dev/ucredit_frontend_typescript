import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateSearchTerm,
  updateRetrievedCourses,
  updateSearchFilters,
  selectSearchterm,
  selectSearchFilters,
  selectSemester,
} from "../../slices/searchSlice";
import axios from "axios";
import { Course, FilterType, SemesterType } from "../../commonTypes";
import { all_majors, course_tags } from "../../assets";

// TODO: This file could be modularized. Esp with the recurring code for options.
const api = "https://ucredit-api.herokuapp.com/api";

const creditFilters = ["None", 0, 1, 2, 3, 4];
const distributionFilters = ["None", "N", "S", "H", "Q", "E"];
const termFilters: (SemesterType | "None")[] = [
  "None",
  "fall",
  "spring",
  "intersession",
  "summer",
];
const wiFilters = ["None", "True", "False"];
const departmentFilters = ["None", ...all_majors];
const tagFilters = ["None", ...course_tags];

const Form = () => {
  // Set up redux dispatch and variables.
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchterm);
  const searchFilters = useSelector(selectSearchFilters);
  const semester = useSelector(selectSemester);

  // On opening search, set the term filter to match semester you're adding to.
  useEffect(() => {
    dispatch(updateSearchFilters({ filter: "term", value: semester }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Search with debouncing of 3/4s of a second.
  useEffect(() => {
    if (
      searchTerm === "" &&
      searchFilters.credits === "None" &&
      searchFilters.distribution === "None" &&
      searchFilters.term === "None" &&
      searchFilters.wi === "None" &&
      searchFilters.department === "None" &&
      searchFilters.tags === "None"
    ) {
      // If search term is empty with no filters, don't show any results.
      dispatch(updateRetrievedCourses([]));
    } else {
      // Otherwise, user is searching for something.
      const search = setTimeout(performSearch, 500);
      return () => clearTimeout(search);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, searchFilters]);

  // Performs search call with filters to backend and updates redux with retrieved courses.
  const performSearch = () => {
    const extras = {
      query: searchTerm,
      credits: searchFilters.credits === "None" ? null : searchFilters.credits,
      areas:
        searchFilters.distribution === "None" ? "" : searchFilters.distribution,
      wi: searchFilters.wi === "None" ? null : searchFilters.wi,
      term: searchFilters.term === "None" ? "" : searchFilters.term,
      department:
        searchFilters.department === "None" ? null : searchFilters.department,
    };
    console.log("extras is ", extras);
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
        console.log(returned);
        dispatch(updateRetrievedCourses(returned));
      })
      .catch((err) => {
        console.log(err);
      });
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
    dispatch(updateSearchFilters(params));
  };

  // Update searching for a writing intensives or not..
  const handleWIFilterChange = (event: any): void => {
    const params: { filter: FilterType; value: any } = {
      filter: "wi",
      value:
        event.target.value === "True"
          ? true
          : event.target.value === "False"
          ? false
          : "None",
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
    <div className={"p-5"}>
      <p>
        <input
          className="border-b-2"
          type="text"
          placeholder={"Course title or number (ie. Physics, 601.280, etc.)"}
          style={{ width: "100%" }}
          defaultValue={searchTerm}
          onChange={handleSearchTerm}
        ></input>
      </p>
      <label>
        <p>
          Department:
          {/* <input
          className="border-b-2"
          type="text"
          placeholder={"Put in the department you are looking for"}
          style={{ width: "100%" }}
          defaultValue={""}
          onChange={handleDepartmentFilterChange}
        ></input> */}
          <select
            onChange={handleDepartmentFilterChange}
            defaultValue={searchFilters.department}
          >
            {departmentFilters.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>
        </p>
        <p>
          Credits:
          <select
            onChange={handleCreditFilterChange}
            defaultValue={searchFilters.credits}
          >
            {creditFilters.map((credits) => (
              <option key={credits} value={credits}>
                {credits}
              </option>
            ))}
          </select>
        </p>
        <p>
          Area:
          <select
            onChange={handleDistributionFilterChange}
            defaultValue={searchFilters.distribution}
          >
            {distributionFilters.map((distribution) => (
              <option key={distribution} value={distribution}>
                {distribution}
              </option>
            ))}
          </select>
        </p>
        <p>
          Term:
          <select onChange={handleTermFilterChange} defaultValue={semester}>
            {termFilters.map((term) => (
              <option key={term} value={term}>
                {term}
              </option>
            ))}
          </select>
        </p>
        <p>
          Writing Intensive:
          <select
            onChange={handleWIFilterChange}
            defaultValue={searchFilters.distribution}
          >
            {wiFilters.map((wi) => (
              <option key={wi} value={wi}>
                {wi}
              </option>
            ))}
          </select>
        </p>
        <p>
          Tag:
          <select
            onChange={handleTagsFilterChange}
            defaultValue={searchFilters.distribution}
          >
            {tagFilters.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </p>
      </label>
    </div>
  );
};

export default Form;
