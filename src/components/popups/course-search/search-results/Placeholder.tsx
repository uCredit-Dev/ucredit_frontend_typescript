import React, { useState, useEffect } from "react";
import { Course, Plan, Year } from "../../../../resources/commonTypes";
import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as CloseSvg } from "../../../../resources/svg/Close.svg";
import {
  updateInspectedVersion,
  selectPlaceholder,
  selectVersion,
  updateInspectedCourse,
  updatePlaceholder,
  selectSearchStatus,
} from "../../../../slices/searchSlice";
import { ReactComponent as Question } from "../../../../resources/svg/Question.svg";
import Select from "react-select";
import { all_deps, api, course_tags } from "../../../../resources/assets";
import { selectCourseToShow } from "../../../../slices/popupSlice";
import {
  selectCurrentPlanCourses,
  selectPlan,
  updateCurrentPlanCourses,
  updateSelectedPlan,
} from "../../../../slices/currentPlanSlice";
import ReactTooltip from "react-tooltip";

const departmentFilters = ["none", ...all_deps];
const tagFilters = ["none", ...course_tags];

/**
 * Page for adding a placeholder
 * @param addCourse - a function that adds the placeholder to the plan.
 */
const Placeholder = (props: { addCourse: any }) => {
  // Redux Setup
  const inspectedVersion = useSelector(selectVersion);
  const courseToShow = useSelector(selectCourseToShow);
  const placeholder = useSelector(selectPlaceholder);
  const searchStatus = useSelector(selectSearchStatus);
  const currentCourses = useSelector(selectCurrentPlanCourses);
  const currentPlan = useSelector(selectPlan);
  const dispatch = useDispatch();

  // Component state setup.
  const [placeholderTitle, setPlaceholderTitle] =
    useState<string>("placeholder");
  const [placeholderArea, setPlaceholderArea] = useState<string>("none");
  const [placeholderCredits, setPlaceholderCredits] = useState<string>("0");
  const [placeholderNumber, setPlaceholderNumber] = useState<string>("");
  const [placeholderDepartment, setPlaceholderDepartment] =
    useState<string>("none");
  const [placeholderTag, setPlaceholderTag] = useState<string>("none");

  // Updates placeholder information everytime inspected course changes.
  useEffect(() => {
    if (placeholder && inspectedVersion !== "None") {
      setPlaceholderArea(inspectedVersion.areas);
      setPlaceholderTitle(inspectedVersion.title);
      setPlaceholderCredits(inspectedVersion.credits);
      setPlaceholderNumber(inspectedVersion.number);
      setPlaceholderDepartment(inspectedVersion.department);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inspectedVersion]);

  // On placeholder title change
  const onPTChange = (event: any) => {
    const title = event.target.value;
    setPlaceholderTitle(title);
    if (inspectedVersion !== "None") {
      const inspCopy: Course = { ...inspectedVersion, title: title };
      dispatch(updateInspectedVersion(inspCopy));
    }
  };

  // On placeholder area change
  const onPAChange = (event: any) => {
    const area = event.value;
    setPlaceholderArea(area);
    if (inspectedVersion !== "None") {
      const inspectedCourseCopy: Course = { ...inspectedVersion, areas: area };
      dispatch(updateInspectedVersion(inspectedCourseCopy));
    }
  };

  // On placeholder credits change
  const onPCChange = (event: any) => {
    const cred = event.value;
    setPlaceholderCredits(cred);
    if (inspectedVersion !== "None") {
      const inspCopy: Course = { ...inspectedVersion, credits: cred };
      dispatch(updateInspectedVersion(inspCopy));
    }
  };

  // On placeholder number change
  const onPNChange = (event: any) => {
    const num = event.target.value;
    setPlaceholderNumber(num);
    if (inspectedVersion !== "None") {
      const inspCopy: Course = { ...inspectedVersion, number: num };
      dispatch(updateInspectedVersion(inspCopy));
    }
  };

  // On placeholder department change
  const onPDChange = (event: any) => {
    const dep = event.value;
    setPlaceholderDepartment(dep);
    if (inspectedVersion !== "None") {
      const inspCopy: Course = { ...inspectedVersion, department: dep };
      dispatch(updateInspectedVersion(inspCopy));
    }
  };

  // On placeholder tag change
  const onPTagChange = (event: any) => {
    const tag = event.value;
    setPlaceholderTag(tag);
    if (inspectedVersion !== "None") {
      const inspCopy: Course = { ...inspectedVersion };
      inspCopy.tags.push(tag);
      dispatch(updateInspectedVersion(inspCopy));
    }
  };

  // Clears inspected course.
  const clearInspected = (): void => {
    dispatch(updatePlaceholder(false));
    dispatch(updateInspectedCourse("None"));
  };

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

  useEffect(() => {
    ReactTooltip.rebuild();
  });

  return (
    <div className="flex flex-col h-full font-medium">
      <div className="flex flex-row items-center w-full">
        <div className="mr-auto text-2xl">Add a placeholder</div>
        <button
          className="mr-10 pl-16 text-2xl focus:outline-none transform hover:scale-110 transition duration-200 ease-in"
          onClick={clearInspected}
        >
          <CloseSvg className="w-7 h-7 stroke-2" />
        </button>
      </div>
      <div
        className="flex flex-col flex-wrap pb-5"
        style={{ maxHeight: "70%" }}
      >
        <div className="flex flex-col mt-3 w-2/6">
          Title
          <input
            className="mt-1 p-1 focus:outline-none"
            onChange={onPTChange}
            value={placeholderTitle}
          ></input>
        </div>
        <div className="flex flex-col mt-2 w-2/6">
          Number
          <input
            className="mt-1 p-1 focus:outline-none"
            onChange={onPNChange}
            value={placeholderNumber}
          ></input>
        </div>

        <div className="flex flex-col mt-2 w-56">
          Department
          <Select
            options={[
              ...departmentFilters.map((department) => ({
                value: department,
                label: department,
              })),
            ]}
            className="mt-1"
            onChange={onPDChange}
            value={{
              value: placeholderDepartment,
              label: placeholderDepartment,
            }}
          />
        </div>
        <div className="flex flex-col mt-2 w-1/6">
          <div className="flex flex-row">
            Tag
            <div className="flex-grow">
              <Question
                className="h-4"
                data-for="godTip"
                data-tip={
                  "<p>Many degree and a few courses require students to complete a specific amount of courses under a certain tag.</p><p>These usually come in the form of 3-4 letters designating department (ie. CSC = Computer Science) followed by 2+ letters signalling the specific subgroup designation within the department (ie. SOFT = Software).</p>"
                }
              />
            </div>
          </div>
          <Select
            options={[
              ...tagFilters.map((tag: any) => ({ label: tag, value: tag })),
            ]}
            className="mt-1 w-40 rounded outline-none"
            onChange={onPTagChange}
            value={{
              value: placeholderTag,
              label: placeholderTag,
            }}
          />
        </div>
        <div className="flex flex-col mt-2 w-20">
          Credits
          <Select
            onChange={onPCChange}
            options={[
              "0",
              "0.5",
              "1",
              "1.5",
              "2",
              "2.5",
              "3",
              "3.5",
              "4",
              "4.5",
              "5",
              "5.5",
              "6",
              "6.5",
              "7",
              "7.5",
              "8",
            ].map((cred: any) => ({ label: cred, value: cred }))}
            className="mt-1"
            defaultValue={{
              label: placeholderCredits,
              value: placeholderCredits,
            }}
          />
        </div>
        <div className="flex flex-col mt-2 w-1/6">
          <div className="flex flex-row">
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
          </div>
          <Select
            options={["none", "N", "S", "H", "E", "Q"].map((area: any) => ({
              label: area,
              value: area,
            }))}
            className="mt-1 w-40 rounded outline-none"
            onChange={onPAChange}
            defaultValue={{ label: placeholderArea, value: placeholderArea }}
          />
        </div>
      </div>
      {searchStatus ? (
        <button
          className="mr-0 p-2 w-28 text-white bg-blue-500 rounded focus:outline-none transform hover:scale-110 transition duration-200 ease-in"
          onClick={props.addCourse}
        >
          Add Course
        </button>
      ) : (
        <button
          className="mr-0 p-2 w-28 text-white bg-blue-500 rounded focus:outline-none transform hover:scale-110 transition duration-200 ease-in"
          onClick={updateCourse}
        >
          Update Course
        </button>
      )}
    </div>
  );
};

export default Placeholder;
