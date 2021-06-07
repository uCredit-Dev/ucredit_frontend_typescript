import React, { useState, useEffect } from "react";
import { Course } from "../../../commonTypes";
import { useSelector, useDispatch } from "react-redux";
import {
  updateInspectedVersion,
  selectPlaceholder,
  selectVersion,
} from "../../../slices/searchSlice";
import Select from "react-select";
import { all_majors, course_tags } from "../../../assets";

const departmentFilters = ["none", ...all_majors];
const tagFilters = ["none", ...course_tags];

/**
 * Page for adding a placeholder
 * @param addCourse - a function that adds the placeholder to the plan.
 */
const Placeholder = (props: { addCourse: any }) => {
  // Redux Setup
  const inspected = useSelector(selectVersion);
  const placeholder = useSelector(selectPlaceholder);
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
    if (placeholder && inspected !== "None") {
      setPlaceholderArea(inspected.areas);
      setPlaceholderTitle(inspected.title);
      setPlaceholderCredits(inspected.credits);
      setPlaceholderNumber(inspected.number);
      setPlaceholderDepartment(inspected.department);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inspected]);

  // On placeholder title change
  const onPTChange = (event: any) => {
    const title = event.target.value;
    setPlaceholderTitle(title);
    if (inspected !== "None") {
      const inspCopy: Course = { ...inspected, title: title };
      dispatch(updateInspectedVersion(inspCopy));
    }
  };

  // On placeholder area change
  const onPAChange = (event: any) => {
    const area = event.value;
    setPlaceholderArea(area);
    if (inspected !== "None") {
      const inspectedCourseCopy: Course = { ...inspected, areas: area };
      dispatch(updateInspectedVersion(inspectedCourseCopy));
    }
  };

  // On placeholder credits change
  const onPCChange = (event: any) => {
    const cred = event.value;
    setPlaceholderCredits(cred);
    if (inspected !== "None") {
      const inspCopy: Course = { ...inspected, credits: cred };
      dispatch(updateInspectedVersion(inspCopy));
    }
  };

  // On placeholder number change
  const onPNChange = (event: any) => {
    const num = event.value;
    setPlaceholderNumber(num);
    if (inspected !== "None") {
      const inspCopy: Course = { ...inspected, number: num };
      dispatch(updateInspectedVersion(inspCopy));
    }
  };

  // On placeholder department change
  const onPDChange = (event: any) => {
    const dep = event.value;
    setPlaceholderDepartment(dep);
    if (inspected !== "None") {
      const inspCopy: Course = { ...inspected, department: dep };
      dispatch(updateInspectedVersion(inspCopy));
    }
  };

  // On placeholder tag change
  const onPTagChange = (event: any) => {
    const tag = event.value;
    setPlaceholderTag(tag);
    if (inspected !== "None") {
      const inspCopy: Course = { ...inspected };
      inspCopy.tags.push(tag);
      dispatch(updateInspectedVersion(inspCopy));
    }
  };

  return (
    <div className="flex flex-col h-full font-medium">
      <div className="text-2xl">Add a placeholder</div>
      <div className="flex flex-col mb-10">
        <div className="flex flex-col mt-3 w-2/6">
          Title
          <input
            className="mt-1"
            onChange={onPTChange}
            value={placeholderTitle}
          ></input>
        </div>
        <div className="flex flex-col mt-2 w-2/6">
          Number
          <input
            className="mt-1"
            onChange={onPNChange}
            value={placeholderNumber}
          ></input>
        </div>

        <div className="flex flex-col mt-2 w-1/6">
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
          Tag
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
        <div className="flex flex-col mt-2 w-1/6">
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
          Area
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
      <button
        className="mr-0 p-2 w-1/6 text-white bg-primary rounded"
        onClick={props.addCourse}
      >
        Add Course
      </button>
    </div>
  );
};

export default Placeholder;
