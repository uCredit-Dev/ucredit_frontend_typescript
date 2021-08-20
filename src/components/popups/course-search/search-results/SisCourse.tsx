import React, { MouseEventHandler, useEffect, useState } from "react";
// import { ReactComponent as CloseSvg } from "../../../../resources/svg/Close.svg";
import Select from "react-select";
import CourseVersion from "./CourseVersion";
import { ReactComponent as Question } from "../../../../resources/svg/Question.svg";
import { useDispatch, useSelector } from "react-redux";
import { selectPlan } from "../../../../slices/currentPlanSlice";
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
import { Course } from "../../../../resources/commonTypes";
import ReactTooltip from "react-tooltip";
import { selectShowCourseInfo } from "../../../../slices/popupSlice";

type SisCourseProps = {
  inspectedArea: string;
  setInspectedArea: Function;
  addCourse: MouseEventHandler<HTMLButtonElement>;
};

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
  const currentPlan = useSelector(selectPlan);
  const searchYear = useSelector(selectYear);
  const searchSemester = useSelector(selectSemester);
  const searchStack = useSelector(selectSearchStack);
  const showCourseInfo = useSelector(selectShowCourseInfo);

  const [versionIndex, updateVersionIndex] = useState(0);

  useEffect(() => {
    if (inspected !== "None" && version !== "None") {
      updateVersionIndex(inspected.terms.indexOf(version.term.toString()));
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

  // Clears inspected course.
  // const clearInspected = (): void => {
  //   dispatch(updateInspectedCourse("None"));
  // };

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
          <div className="pb-5 pt-4 px-5 w-full h-full text-base bg-white rounded select-text overflow-y-auto">
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
              {/* <button
                className="text-2xl focus:outline-none transform hover:scale-110 transition duration-200 ease-in"
                onClick={clearInspected}
              >
                <CloseSvg className="w-7 h-7 stroke-2" />
              </button> */}
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
          {!showCourseInfo ? (
            <div className="flex flex-row flex-grow items-center mt-2">
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
              <button
                className="mt-2 p-2 w-auto h-10 text-white bg-blue-500 rounded focus:outline-none transform hover:scale-110 transition duration-200 ease-in"
                onClick={props.addCourse}
              >
                Add Course
              </button>
            </div>
          ) : null}
        </>
      ) : null}
    </>
  );
};

export default SisCourse;
