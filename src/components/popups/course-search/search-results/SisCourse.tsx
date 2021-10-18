import React, { useEffect, useState } from "react";
import Select from "react-select";
import CourseVersion from "./CourseVersion";
import { ReactComponent as Question } from "../../../../resources/svg/Question.svg";
import { ReactComponent as Arrow } from "../../../../resources/svg/ArrowDown.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentPlanCourses,
  selectPlan,
  updateCurrentPlanCourses,
  updateSelectedPlan,
} from "../../../../slices/currentPlanSlice";
import {
  selectInspectedCourse,
  selectSemester,
  selectYear,
  selectSearchStack,
  popSearchStack,
  selectVersion,
  updateInspectedVersion,
  updateSearchTime,
} from "../../../../slices/searchSlice";
import { Course, Plan, Year } from "../../../../resources/commonTypes";
import ReactTooltip from "react-tooltip";
import {
  selectCourseToShow,
  selectShowCourseInfo,
  updateAddingPrereq,
  updateCourseToShow,
  updateShowCourseInfo,
} from "../../../../slices/popupSlice";
import { api } from "../../../../resources/assets";

type SisCourseProps = {
  inspectedArea: string;
  setInspectedArea: Function;
  addCourse: Function;
};

/**
 * Displays a sis course when searching.
 *
 * @prop inspectedArea - the area to add the course to
 * @prop setInspectedArea - sets the area to add the course to
 * @prop addCourse - adds course to plan.
 */
const SisCourse = (props: SisCourseProps) => {
  // Redux Setup
  const dispatch = useDispatch();
  const inspected = useSelector(selectInspectedCourse);
  const version = useSelector(selectVersion);
  const currentPlan = useSelector(selectPlan);
  const searchYear = useSelector(selectYear);
  const searchSemester = useSelector(selectSemester);
  const searchStack = useSelector(selectSearchStack);
  const showCourseInfo = useSelector(selectShowCourseInfo);
  const courseToShow = useSelector(selectCourseToShow);
  const currentCourses = useSelector(selectCurrentPlanCourses);

  const [versionIndex, updateVersionIndex] = useState<number>(0);

  useEffect(() => {
    if (inspected !== "None" && version !== "None") {
      const index: number = inspected.terms.indexOf(version.term.toString());
      updateVersionIndex(index);
    }
    ReactTooltip.rebuild();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [version]);

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

  // For changing the year to add course while in the search popout.
  const handleYearChange = (event: any): void => {
    dispatch(
      updateSearchTime({
        searchYear: event.target.value,
        searchSemester: searchSemester,
      })
    );
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

  /**
   * Cleanup and opens adding prereqs
   */
  const addPrereq = () => {
    dispatch(updateCourseToShow(null));
    dispatch(updateShowCourseInfo(false));
    dispatch(updateAddingPrereq(true));
  };

  /**
   * Updates course by deleting old course and adding new.
   */
  const updateCourse = (): void => {
    if (courseToShow !== null) {
      fetch(api + "/courses/" + courseToShow._id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((retrieved) => {
        retrieved.json().then((data) => {
          if (data.errors === undefined) {
            const updated = currentCourses.filter((course) => {
              if (course._id === courseToShow._id) {
                return false;
              } else {
                return true;
              }
            });
            dispatch(updateCurrentPlanCourses(updated));
            const allYears: Year[] = [...currentPlan.years];
            const newYears: Year[] = [];
            allYears.forEach((y) => {
              const yCourses = y.courses.filter((course) => {
                if (course === courseToShow._id) {
                  return false;
                } else {
                  return true;
                }
              });
              newYears.push({ ...y, courses: yCourses });
            });
            const newPlan: Plan = { ...currentPlan, years: newYears };
            dispatch(updateSelectedPlan(newPlan));
            props.addCourse(newPlan);
          } else {
            console.log("ERROR: Failed to add", data.errors);
          }
        });
      });
    }
  };

  return (
    <div className="flex flex-col h-full">
      {inspected !== "None" ? (
        <>
          <div className="pb-5 pt-4 px-5 w-full h-full text-base bg-white rounded-t select-text overflow-y-auto">
            <div className="flex flex-row mb-1 w-full h-auto">
              {searchStack.length !== 0 ? (
                <button
                  className="mt-1 focus:outline-none transform rotate-90 hover:scale-125 transition duration-200 ease-in"
                  onClick={() => {
                    dispatch(popSearchStack());
                  }}
                >
                  <Arrow />
                </button>
              ) : null}
              <h1 className="flex flex-row w-auto h-auto transform hover:scale-105 transition duration-200 ease-in">
                <div className="w-full h-auto text-2xl font-bold">
                  {inspected.title}
                </div>
              </h1>
              {searchStack.length !== 0 && showCourseInfo ? (
                <button
                  className="-mt-1 ml-auto p-1 px-2 text-white text-xl hover:bg-blue-400 bg-green-400 rounded focus:outline-none transform hover:scale-105 transition duration-200 ease-in"
                  onClick={addPrereq}
                >
                  Add Prereq
                </button>
              ) : null}
            </div>
            <div className="flex flex-row items-center font-semibold">
              <div className="flex flex-row">
                Term
                <div className="flex-grow mt-1">
                  <Question
                    className="h-4"
                    data-for="godTip"
                    data-tip={`<p>This is a specific snapshot of course information at a specific time in the past or present.</p><p>NOTE: This is NOT to determine where on the plan you are adding the course.</p><p>(ie. Course Version "Spring, 2021" may not equal "Spring, Senior")</p>`}
                  />
                </div>
                :
              </div>
              <Select
                className="ml-2 w-44"
                options={inspected.terms
                  .filter(
                    (term) =>
                      term
                        .toLowerCase()
                        .includes(searchSemester.toLowerCase()) ||
                      (courseToShow !== null &&
                        term
                          .toLowerCase()
                          .includes(courseToShow.term.toLowerCase()))
                  )
                  .map((term) => {
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
          {(showCourseInfo && searchStack.length === 0) || !showCourseInfo ? (
            <div className="relative bottom-0 flex flex-row items-center px-4 py-2 w-full h-20 bg-gray-100 rounded-b">
              <div className="flex flex-col flex-grow justify-center">
                <div className="mb-1 font-medium">Selecting for</div>
                <div className="flex tight:flex-col flex-row">
                  <div className="flex flex-row items-center tight:ml-0 tight:mt-2 w-auto h-auto">
                    Year
                    <div className="flex-grow">
                      <Question
                        className="h-4"
                        data-for="godTip"
                        data-tip={`<p>This is the year you're selecting for.</p><p>The version you are viewing gives you a snapshot of the information of the course at a specific time to give you an understanding of the past and current states of the course. This is NOT to determine where on the plan you are adding the course.</p><p>NOTE: This could be different from the version of the course you are viewing.</p><p>(ie. Course Version "Spring, 2021" may not equal "Spring, Senior")</p>`}
                      />
                    </div>
                    <select
                      className="ml-2 text-black text-coursecard rounded focus:outline-none"
                      onChange={handleYearChange}
                      value={searchYear}
                    >
                      {currentPlan.years.map((currPlanYear) => (
                        <option key={currPlanYear._id} value={currPlanYear._id}>
                          {currPlanYear.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-row items-center tight:ml-0 ml-5 tight:mt-2 w-auto h-auto">
                    Area
                    <div className="flex-grow">
                      <Question
                        className="h-4"
                        data-for="godTip"
                        data-tip={
                          "<p>Areas designate the specific subset a course belongs to. Each degree requires students to take a certain amount of credits or courses in a spcific area.</p><p>H - Humanities</p><p>S - Social Sciences</p><p>E - Engineering</p><p>N - Natural Sciences</p><p>Q - Quantitative</p>"
                        }
                      />
                    </div>
                    :
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
              {!showCourseInfo ? (
                <button
                  className="mt-2 p-2 w-auto h-10 text-white hover:bg-blue-400 bg-green-400 rounded focus:outline-none transform hover:scale-105 transition duration-200 ease-in"
                  onClick={() => props.addCourse()}
                >
                  Add Course
                </button>
              ) : (
                <button
                  className="mt-2 p-2 w-auto h-10 text-white hover:bg-blue-400 bg-green-400 rounded focus:outline-none transform hover:scale-105 transition duration-200 ease-in"
                  onClick={updateCourse}
                >
                  Update Course
                </button>
              )}
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
};

export default SisCourse;
