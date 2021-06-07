import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { all_majors, course_tags } from "../../../assets";
import { FilterType, SemesterType } from "../../../commonTypes";
import {
  selectSearchFilters,
  selectYear,
  updateSearchFilters,
  updateSearchTime,
} from "../../../slices/searchSlice";

const creditFilters = ["Any", 0, 1, 2, 3, 4];
const distributionFilters = ["Any", "N", "S", "H", "Q", "E"];
const termFilters: SemesterType[] = [
  "Fall",
  "Spring",
  "Intersession",
  "Summer",
];
const wiFilters = ["Any", "Yes", "No"];
const departmentFilters = ["Any", ...all_majors];
const tagFilters = ["Any", ...course_tags];

/**
 * The component containing all search filters.
 */
const Filters = () => {
  // Set up redux dispatch and variables.
  const dispatch = useDispatch();
  const searchFilters = useSelector(selectSearchFilters);
  const year = useSelector(selectYear);

  // Update searching for certain amounts of credits
  const handleCreditFilterChange = (event: any): void => {
    const params: { filter: FilterType; value: any } = {
      filter: "credits",
      value: event.value,
    };
    dispatch(updateSearchFilters(params));
  };

  // Update searching for a certain distribution.
  const handleDistributionFilterChange = (event: any): void => {
    const params: { filter: FilterType; value: any } = {
      filter: "distribution",
      value: event.value,
    };
    dispatch(updateSearchFilters(params));
  };

  // Update searching for a certain term.
  const handleTermFilterChange = (event: any): void => {
    const params: { filter: FilterType; value: any } = {
      filter: "term",
      value: event.value,
    };
    dispatch(
      updateSearchTime({ searchSemester: event.value, searchYear: year })
    );
    dispatch(updateSearchFilters(params));
  };

  // Update searching for a writing intensives or not..
  const handleWIFilterChange = (event: any): void => {
    const params: { filter: FilterType; value: any } = {
      filter: "wi",
      value:
        event.value === "Yes" ? true : event.value === "No" ? false : "Any",
    };
    dispatch(updateSearchFilters(params));
  };

  // Update searching for a certain department.
  const handleDepartmentFilterChange = (event: any): void => {
    const params: { filter: FilterType; value: any } = {
      filter: "department",
      value: event.value,
    };
    dispatch(updateSearchFilters(params));
  };

  // Update searching for a certain tag
  const handleTagsFilterChange = (event: any): void => {
    const params: { filter: FilterType; value: any } = {
      filter: "tags",
      value: event.value,
    };
    dispatch(updateSearchFilters(params));
  };

  return (
    <>
      <div className="flex flex-row items-center justify-between mb-2 w-full h-auto">
        Department
        <Select
          options={[
            ...departmentFilters.map((department) => ({
              value: department,
              label: department,
            })),
          ]}
          className="w-40 rounded outline-none"
          onChange={handleDepartmentFilterChange}
          value={{
            value: searchFilters.department,
            label: searchFilters.department,
          }}
        />
      </div>
      <div className="flex flex-row items-center justify-between mb-2 w-full h-auto">
        Credits
        <Select
          onChange={handleCreditFilterChange}
          value={{ value: searchFilters.credits, label: searchFilters.credits }}
          options={[
            ...creditFilters.map((credits: any) => ({
              value: credits,
              label: credits,
            })),
          ]}
          className="w-40 rounded outline-none"
        />
      </div>
      <div className="flex flex-row items-center justify-between mb-2 w-full h-auto">
        Area
        <Select
          options={[
            ...distributionFilters.map((distribution: any) => ({
              value: distribution,
              label: distribution,
            })),
          ]}
          className="w-40 rounded outline-none"
          onChange={handleDistributionFilterChange}
          value={{
            value: searchFilters.distribution,
            label: searchFilters.distribution,
          }}
        />
      </div>
      <div className="flex flex-row items-center justify-between mb-2 w-full h-auto">
        Term
        <Select
          options={[
            ...termFilters.map((term: any) => ({
              value: term,
              label: term,
            })),
          ]}
          className="w-40 rounded outline-none"
          onChange={handleTermFilterChange}
          value={{
            value: searchFilters.term,
            label: searchFilters.term,
          }}
        />
      </div>
      <div className="flex flex-row items-center justify-between mb-2 w-full h-auto">
        Writing Intensive
        <Select
          options={[
            ...wiFilters.map((wi: any) => ({
              value: wi,
              label: wi,
            })),
          ]}
          className="w-40 rounded outline-none"
          onChange={handleWIFilterChange}
        />
      </div>
      <div className="flex flex-row items-center justify-between mb-2 w-full h-auto">
        Tag
        <Select
          options={[
            ...tagFilters.map((tag: any) => ({
              value: tag,
              label: tag,
            })),
          ]}
          className="w-40 rounded outline-none"
          onChange={handleTagsFilterChange}
          value={{
            value: searchFilters.tags,
            label: searchFilters.tags,
          }}
        />
      </div>
    </>
  );
};

export default Filters;
