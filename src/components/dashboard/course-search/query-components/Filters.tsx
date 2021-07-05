import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { all_deps, course_tags } from "../../../../resources/assets";
import { FilterType, SemesterType } from "../../../../resources/commonTypes";
import {
  selectSearchFilters,
  selectYear,
  updateSearchFilters,
  updateSearchTime,
} from "../../../../slices/searchSlice";

const creditFilters = ["Any", 0, 1, 2, 3, 4];
const distributionFilters = ["N", "S", "H", "Q", "E"];
const termFilters: SemesterType[] = [
  "Fall",
  "Spring",
  "Intersession",
  "Summer",
];
const yearFilters = [2021, 2020, 2019, 2018, 2017];
const wiFilters = ["Any", "Yes", "No"];
type filterProps = {
  showCriteria: boolean;
};

/**
 * The component containing all search filters.
 */
const Filters = ({ showCriteria }: filterProps) => {
  // Set up redux dispatch and variables.
  const dispatch = useDispatch();
  const searchFilters = useSelector(selectSearchFilters);
  const year = useSelector(selectYear);

  // Update searching for certain amounts of credits
  const handleCreditFilterChange = (event: any): void => {
    let credits = "";
    event.forEach((c: { label: string; value: string }) => {
      credits = credits.concat(c.label);
    });
    const params: { filter: FilterType; value: any } = {
      filter: "credits",
      value: credits.length === 0 || credits.includes("Any") ? null : credits,
    };
    dispatch(updateSearchFilters(params));
  };

  // Update searching for a certain distribution.
  const handleDistributionFilterChange = (event: any): void => {
    let areas: string = "";
    event.forEach((a: { label: string; value: string }) => {
      areas = areas.concat(a.label);
    });
    const params: { filter: FilterType; value: any } = {
      filter: "distribution",
      value: areas.length === 0 ? null : areas,
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
      value: event.value === "Yes" ? true : event.value === "No" ? false : null,
    };
    dispatch(updateSearchFilters(params));
  };

  // Update searching for a certain department.
  const handleDepartmentFilterChange = (event: any): void => {
    let departments = "";
    event.forEach((dep: { label: string; value: string }, i: number) => {
      departments = departments.concat(dep.label);
      if (i < event.length - 1) {
        departments = departments.concat("|");
      }
    });
    console.log(departments, event);
    const params: { filter: FilterType; value: any } = {
      filter: "department",
      value: departments.length === 0 ? null : departments,
    };
    dispatch(updateSearchFilters(params));
  };

  // Update searching for a certain tag
  const handleTagsFilterChange = (event: any): void => {
    let tags = "";
    event.forEach((tag: { label: string; value: string }, i: number) => {
      tags = tags.concat(tag.label);
      if (i < event.length - 1) {
        tags = tags.concat("|");
      }
    });
    const params: { filter: FilterType; value: any } = {
      filter: "tags",
      value: tags.length === 0 ? null : tags,
    };
    dispatch(updateSearchFilters(params));
  };

  // Update searching for a certain level
  const handleLevelFilterChange = (event: any): void => {
    let levels = "";
    event.forEach((level: { label: string; value: string }, i: number) => {
      levels = levels.concat(level.label);
      if (i < event.length - 1) {
        levels = levels.concat("|");
      }
    });
    const params: { filter: FilterType; value: any } = {
      filter: "levels",
      value: levels.length === 0 ? null : levels,
    };
    dispatch(updateSearchFilters(params));
  };

  const handleYearFilterChange = (event: any): void => {
    const params: { filter: FilterType; value: any } = {
      filter: "year",
      value: event.value,
    };
    dispatch(updateSearchFilters(params));
  };

  return (
    <>
      <div className="flex flex-row items-center justify-between mb-2 w-full h-auto">
        <Select
          options={[
            ...termFilters.map((term: any) => ({
              value: term,
              label: term,
            })),
          ]}
          className="mx-1 w-40 rounded outline-none"
          onChange={handleTermFilterChange}
          value={{
            value: searchFilters.term,
            label: searchFilters.term,
          }}
        />
        <Select
          options={[
            ...yearFilters.map((year: any) => ({
              value: year,
              label: year,
            })),
          ]}
          className="mx-1 w-40 rounded outline-none"
          onChange={handleYearFilterChange}
          value={{
            value: searchFilters.year,
            label: searchFilters.year,
          }}
        />
      </div>
      {showCriteria ? (
        <div>
          <div className="flex flex-row items-center justify-between mb-2 w-full h-auto">
            Department
            <Select
              options={[
                ...all_deps.map((department) => ({
                  value: department,
                  label: department,
                })),
              ]}
              isMulti
              className="w-40 rounded outline-none"
              onChange={handleDepartmentFilterChange}
            />
          </div>
          <div className="flex flex-row items-center justify-between mb-2 w-full h-auto">
            Credits
            <Select
              onChange={handleCreditFilterChange}
              isMulti
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
            Areas
            <Select
              isMulti
              options={[
                ...distributionFilters.map((distribution: any) => ({
                  value: distribution,
                  label: distribution,
                })),
              ]}
              className="w-40 rounded outline-none"
              onChange={handleDistributionFilterChange}
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
                ...course_tags.map((tag: any) => ({
                  value: tag,
                  label: tag,
                })),
              ]}
              className="w-40 rounded outline-none"
              onChange={handleTagsFilterChange}
              isMulti
            />
          </div>{" "}
          <div className="flex flex-row items-center justify-between mb-2 w-full h-auto">
            Level
            <Select
              options={[
                ...[
                  "Upper Level Undergraduate",
                  "Lower Level Undergraduate",
                ].map((level: any) => ({
                  value: level,
                  label: level,
                })),
              ]}
              className="w-40 rounded outline-none"
              onChange={handleLevelFilterChange}
              isMulti
            />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Filters;
