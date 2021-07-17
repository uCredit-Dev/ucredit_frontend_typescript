import React, { MouseEventHandler, useEffect, useState } from "react";
import { ReactComponent as CloseSvg } from "../../../../resources/svg/Close.svg";
import Select from "react-select";
import CourseVersion from "./CourseVersion";
import { useDispatch, useSelector } from "react-redux";
import { selectPlan } from "../../../../slices/currentPlanSlice";
import {
  selectInspectedCourse,
  selectSemester,
  selectYear,
  selectSearchStack,
  popSearchStack,
  selectVersion,
  updateInspectedCourse,
  updateInspectedVersion,
  updateSearchFilters,
  updateSearchTime,
} from "../../../../slices/searchSlice";
import {
  FilterType,
  Course,
  SemesterType,
} from "../../../../resources/commonTypes";
import ReactTooltip from "react-tooltip";

type SisCourseProps = {
  inspectedArea: string;
  setInspectedArea: Function;
  addCourse: MouseEventHandler<HTMLButtonElement>;
};

const termFilters: (SemesterType | "None")[] = [
  "None",
  "Fall",
  "Spring",
  "Intersession",
  "Summer",
];

/**
 * Displays a sis course when searching.
 *
 * @param inspectedArea - the area to add the course to
 * @param setInspectedArea - sets the area to add the course to
 * @param addCourse - adds course to plan.
 */
const SisCourse = (props: SisCourseProps) => {
  // Redux Setup
  const dispatch = useDispatch();
  const inspected = useSelector(selectInspectedCourse);
  const version = useSelector(selectVersion);
  const semester = useSelector(selectSemester);
  const year = useSelector(selectYear);
  const currentPlan = useSelector(selectPlan);
  const searchYear = useSelector(selectYear);
  const searchSemester = useSelector(selectSemester);
  const searchStack = useSelector(selectSearchStack);

  const [versionIndex, updateVersionIndex] = useState(0);

  useEffect(() => {
    if (inspected !== "None" && version !== "None") {
      updateVersionIndex(inspected.terms.indexOf(version.term.toString()));
    }
    ReactTooltip.rebuild();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [version]);

  const course = useSelector(selectInspectedCourse);

  // Returns an array of select options for the distribution area users want to add the course to.
  const getInspectedAreas = () => {
    if (version !== "None" && version.areas !== "None") {
      const areaOptions = version.areas.split("").map((area) => (
        <option key={version.number + area} value={area}>
          {area}
        </option>
      ));
      areaOptions.push(<option value={"None"}>None</option>);
      return areaOptions;
    } else {
      return <option value={"None"}>None</option>;
    }
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

  // For changing the year to add course while in the search popout.
  const handleYearChange = (event: any): void => {
    dispatch(
      updateSearchTime({
        searchYear: parseInt(event.target.value),
        searchSemester: searchSemester,
      })
    );
  };

  // Clears inspected course.
  const clearInspected = (): void => {
    dispatch(updateInspectedCourse("None"));
  };

  // Handles switching displayed term.
  const handleTermSwitch = (event: any): void => {
    if (inspected !== "None") {
      inspected.versions.forEach((ver) => {
        if (ver.term === event.value) {
          const newInspected: Course = {
            title: inspected.title,
            number: inspected.number,
            ...ver,
          };
          dispatch(updateInspectedVersion(newInspected));
        }
      });
    }
  };

  return (
    <>
      {inspected !== "None" ? (
        <>
          <div className="pb-5 pt-4 px-5 w-full h-full text-base bg-white rounded overflow-y-auto">
            {searchStack.length !== 0 ? (
              <button
                className="focus:outline-none transform hover:scale-125 transition duration-200 ease-in"
                onClick={() => {
                  dispatch(popSearchStack());
                }}
              >
                Back
              </button>
            ) : null}
            <div className="flex flex-row justify-between mb-1 w-full h-auto">
              <h1 className="flex flex-row w-auto h-auto transform hover:scale-105 transition duration-200 ease-in">
                <div className="w-full h-auto text-2xl font-bold">
                  {inspected.title}
                </div>
              </h1>
              <button
                className="text-2xl focus:outline-none transform hover:scale-110 transition duration-200 ease-in"
                onClick={clearInspected}
              >
                <CloseSvg className="w-7 h-7 stroke-2" />
              </button>
            </div>
            <div className="flex flex-row items-center font-semibold">
              Term:{" "}
              <Select
                className="ml-2 w-44"
                options={inspected.terms.map((term) => {
                  return { label: term, value: term };
                })}
                value={{
                  label: inspected.terms[versionIndex],
                  value: inspected.terms[versionIndex],
                }}
                onChange={handleTermSwitch}
              />
            </div>
            <CourseVersion setInspectedArea={props.setInspectedArea} />
          </div>
          <div className="flex flex-row flex-grow items-center mt-2">
            <div className="flex flex-col flex-grow justify-center">
              <div className="mb-1 font-medium">Selecting for</div>
              <div className="flex tight:flex-col flex-row">
                <div className="flex flex-row items-center tight:ml-0 tight:mt-2 w-auto h-auto">
                  Year:
                  <select
                    className="ml-2 text-black text-coursecard rounded focus:outline-none"
                    onChange={handleYearChange}
                    value={searchYear}
                  >
                    {currentPlan.years.map((currPlanYear) => (
                      <option key={currPlanYear.year} value={currPlanYear.year}>
                        {currPlanYear.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-row items-center tight:ml-0 ml-5 tight:mt-2 w-auto h-auto">
                  Term:
                  <select
                    className="ml-2 h-6 rounded outline-none"
                    onChange={handleTermFilterChange}
                    value={semester}
                  >
                    {termFilters.map((term) => (
                      <option key={term + inspected.number} value={term}>
                        {term}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-row items-center tight:ml-0 ml-5 tight:mt-2 w-auto h-auto">
                  Area:
                  <select
                    className="ml-2 w-14 h-6 rounded outline-none"
                    value={props.inspectedArea}
                    onChange={(event) =>
                      props.setInspectedArea(event.target.value)
                    }
                  >
                    {getInspectedAreas()}
                  </select>
                </div>
              </div>
            </div>
            <button
              className="mt-2 p-2 w-auto h-10 text-white bg-blue-500 rounded focus:outline-none transform hover:scale-110 transition duration-200 ease-in"
              onClick={props.addCourse}
            >
              Add Course
            </button>
          </div>
        </>
      ) : null}
    </>
  );
};

export default SisCourse;
