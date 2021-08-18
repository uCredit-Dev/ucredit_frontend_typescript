import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import ReactTooltip from "react-tooltip";
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

  useEffect(() => {
    ReactTooltip.rebuild();
  });

  const getDepString = () => {
    return (
      "Selected " +
      (searchFilters.department !== null
        ? searchFilters.department.split("|").map((dep) => " " + dep)
        : "nothing")
    );
  };

  const getTagString = () => {
    return (
      "Selected " +
      (searchFilters.tags !== null
        ? searchFilters.tags.split("|").map((tag) => " " + tag)
        : "nothing")
    );
  };

  const getLevelString = () => {
    return (
      "Selected " +
      (searchFilters.levels !== null
        ? searchFilters.levels.split("|").map((level) => " " + level)
        : "nothing")
    );
  };

  // TODO: We can probably modularize distribution bars.
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
          <div
            className="flex flex-row items-center justify-between mb-2 w-full h-auto"
            data-tip={"Department of the searched courses"}
            data-for="godTip"
          >
            Department
            <div data-tip={getDepString()} data-for="godTip">
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
                value={
                  searchFilters.department !== null
                    ? searchFilters.department
                        .split("|")
                        .map((dep) => ({ label: dep, value: dep }))
                    : []
                }
              />
            </div>
          </div>
          <div
            className="flex flex-row items-center justify-between mb-2 w-full h-auto"
            data-tip={"Number of credits provided by the searched courses"}
            data-for="godTip"
          >
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
              value={
                searchFilters.credits !== null
                  ? searchFilters.credits
                      .split("")
                      .map((c) => ({ label: c, value: c }))
                  : []
              }
              className="w-40 rounded outline-none"
            />
          </div>
          <div
            className="flex flex-row items-center justify-between mb-2 w-full h-auto"
            data-tip={"Areas of study for the searched courses, please refer to your advisor for more info about the tags that you need to fulfill your major."}
            data-for="godTip"
          >
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
              value={
                searchFilters.distribution !== null
                  ? searchFilters.distribution
                      .split("")
                      .map((distr) => ({ label: distr, value: distr }))
                  : []
              }
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
              value={{
                value: searchFilters.wi,
                label:
                  searchFilters.wi === null
                    ? "Any"
                    : searchFilters.wi
                    ? "True"
                    : "False",
              }}
              className="w-40 rounded outline-none"
              onChange={handleWIFilterChange}
            />
          </div>
          <div
            className="flex flex-row items-center justify-between mb-2 w-full h-auto"
            data-tip={"Tags for the searched courses, please refer to your advisor for more info about the tags that you need to fulfill your major."}
            data-for="godTip"
          >
            Tag
            <div data-tip={getTagString()} data-for="godTip">
              <Select
                options={[
                  ...course_tags.map((tag: any) => ({
                    value: tag,
                    label: tag,
                  })),
                ]}
                className="w-40 rounded outline-none"
                onChange={handleTagsFilterChange}
                value={
                  searchFilters.tags !== null
                    ? searchFilters.tags
                        .split("|")
                        .map((tag) => ({ label: tag, value: tag }))
                    : []
                }
                isMulti
              />
            </div>
          </div>{" "}
          <div
            className="flex flex-row items-center justify-between mb-2 w-full h-auto"
            data-tip={"course level of the searched courses, eg Upper Level"}
            data-for="godTip"
          >
            Level
            <div data-tip={getLevelString()} data-for="godTip">
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
                value={
                  searchFilters.levels !== null
                    ? searchFilters.levels
                        .split("|")
                        .map((level) => ({ label: level, value: level }))
                    : []
                }
                isMulti
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Filters;
