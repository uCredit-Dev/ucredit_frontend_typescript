import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import ReactTooltip from "react-tooltip";
import { ReactComponent as Question } from "../../../../resources/svg/Question.svg";
import { all_deps, course_tags } from "../../../../resources/assets";
import { FilterType } from "../../../../resources/commonTypes";
import {
  selectSearchFilters,
  updateSearchFilters,
} from "../../../../slices/searchSlice";

const creditFilters = ["Any", 0, 1, 2, 3, 4];
const distributionFilters = ["N", "S", "H", "Q", "E"];
const date: Date = new Date();
const year: number = date.getFullYear();
const month: number = date.getMonth();
const wiFilters = ["Any", "Yes", "No"];

/**
 * The component containing all search filters.
 */
const Filters: FC<{
  showCriteria: boolean;
}> = (props) => {
  // Set up redux dispatch and variables.
  const dispatch = useDispatch();
  const searchFilters = useSelector(selectSearchFilters);

  useEffect(() => {
    ReactTooltip.rebuild();
  });

  /**
   * Update searching filter state for credits.
   * @param event - the event sent when handling credit dropdown
   */
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

  /**
   * Update searching filter state for distributions.
   * @param event - the event sent when handling distribution dropdown
   */
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

  /**
   * Update searching filter state for written intensives.
   * @param event - the event sent when handling WI dropdown
   */
  const handleWIFilterChange = (event: any): void => {
    const params: { filter: FilterType; value: any } = {
      filter: "wi",
      value: event.value === "Yes" ? true : event.value === "No" ? false : null,
    };
    dispatch(updateSearchFilters(params));
  };

  /**
   * Update searching filter state for department.
   * @param event - the event sent when handling department dropdown
   */
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

  /**
   * Update searching filter state for tags.
   * @param event - the event sent when handling tag dropdown
   */
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

  /**
   * Update searching filter state for level.
   * @param event - the event sent when handling upper/lower level dropdown
   */
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

  /**
   * Update searching filter state for year.
   * @param event - the event sent when handling year dropdown
   */
  const handleYearFilterChange = (event: any): void => {
    const params: { filter: FilterType; value: any } = {
      filter: "year",
      value: event.value,
    };
    dispatch(updateSearchFilters(params));
  };

  /**
   * Gets search filter department as a string.
   * @returns a department string
   */
  const getDepString = (): string => {
    return (
      "Selected " +
      (searchFilters.department !== null
        ? searchFilters.department.split("|").map((dep) => " " + dep)
        : "nothing")
    );
  };

  /**
   * Gets search filter tag as a string
   * @returns a tag string
   */
  const getTagString = () => {
    return (
      "Selected " +
      (searchFilters.tags !== null
        ? searchFilters.tags.split("|").map((tag) => " " + tag)
        : "nothing")
    );
  };

  /**
   * Gets search filter level as a string
   * @returns a level string (either upper or lower level undergraduate)
   */
  const getLevelString = (): string => {
    return (
      "Selected " +
      (searchFilters.levels !== null
        ? searchFilters.levels.split("|").map((level) => " " + level)
        : "nothing")
    );
  };

  /**
   * Gets array of years to display in the filters
   * @returns an array of options for the year select.
   */
  const getYears = (): { value: number; label: number }[] => {
    const years =
      month >= 9
        ? [year + 1, year, year - 1, year - 2, year - 3]
        : [year, year - 1, year - 2, year - 3];
    return years.map((y: any) => ({
      value: y,
      label: y,
    }));
  };

  // TODO: We can probably modularize distribution bars.
  return (
    <>
      <div className="flex flex-row items-center justify-between mb-2 w-full h-auto">
        Version Year
        <div className="flex flex-row flex-grow">
          <Question
            className="h-4 fill-gray"
            data-for="godTip"
            data-tip={`<p>This is to search for a specific snapshot of course information at a specific time in the past or present.</p><p>NOTE: This is NOT to determine where on the plan you are adding the course.</p><p>(ie. Course Version "Spring, 2021" may not equal "Spring, Senior")</p>`}
          />
        </div>{" "}
        <Select
          options={getYears()}
          className="mx-1 w-40 rounded outline-none"
          onChange={handleYearFilterChange}
          value={{
            value: searchFilters.year,
            label: searchFilters.year,
          }}
        />
      </div>
      {props.showCriteria ? (
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
            data-tip={
              "Areas of study for the searched courses, please refer to your advisor for more info about the tags that you need to fulfill your major."
            }
            data-for="godTip"
          >
            Areas
            <div className="flex-grow">
              <Question
                className="h-4"
                data-for="godTip"
                data-tip={
                  "<p>Areas designate the specific subset a course belongs to. Each degree requires students to take a certain amount of credits or courses in a spcific area.</p><p>H - Humanities</p><p>S - Social Sciences</p><p>E - Engineering</p><p>N - Natural Sciences</p><p>Q - Quantitative</p>"
                }
              />
            </div>
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
          <div className="flex flex-row items-center justify-between mb-2 w-full h-auto">
            Tag{" "}
            <div className="flex-grow">
              <Question
                className="h-4"
                data-for="godTip"
                data-tip={
                  "<p>Many degree and a few courses require students to complete a specific amount of courses under a certain tag.</p><p>These usually come in the form of 3-4 letters designating department (ie. CSC = Computer Science) followed by 2+ letters signalling the specific subgroup designation within the department (ie. SOFT = Software).</p>"
                }
              />
            </div>
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
