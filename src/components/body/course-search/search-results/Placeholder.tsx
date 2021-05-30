import React, { useState, useEffect } from "react";
import { Course } from "../../../commonTypes";
import { useSelector, useDispatch } from "react-redux";
import {
  selectInspectedCourse,
  updateInspectedCourse,
  selectPlaceholder,
} from "../../../slices/searchSlice";
import Select from "react-select";
import { all_majors, course_tags } from "../../../assets";

const departmentFilters = ["none", ...all_majors];
const tagFilters = ["none", ...course_tags];

/* 
  Adding a placeholder
  Props:
    addCourse: function that adds a course to the plan.
*/
const Placeholder = (props: { addCourse: any }) => {
  // Redux Setup
  const inspected = useSelector(selectInspectedCourse);
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
    const title = event.value;
    setPlaceholderTitle(title);
    if (inspected !== "None") {
      const inspCopy: Course = { ...inspected };
      inspCopy.title = title;
      dispatch(updateInspectedCourse(inspCopy));
    }
  };

  // On placeholder area change
  const onPAChange = (event: any) => {
    const area = event.value;
    setPlaceholderArea(area);
    if (inspected !== "None") {
      const inspectedCourseCopy: Course = { ...inspected };
      inspectedCourseCopy.areas = area;
      dispatch(updateInspectedCourse(inspectedCourseCopy));
    }
  };

  // On placeholder credits change
  const onPCChange = (event: any) => {
    const cred = event.value;
    setPlaceholderCredits(cred);
    if (inspected !== "None") {
      const inspCopy: Course = { ...inspected };
      inspCopy.credits = cred;
      dispatch(updateInspectedCourse(inspCopy));
    }
  };

  // On placeholder number change
  const onPNChange = (event: any) => {
    const num = event.value;
    setPlaceholderNumber(num);
    if (inspected !== "None") {
      const inspCopy: Course = { ...inspected };
      inspCopy.number = num;
      dispatch(updateInspectedCourse(inspCopy));
    }
  };

  // On placeholder department change
  const onPDChange = (event: any) => {
    const dep = event.value;
    setPlaceholderDepartment(dep);
    if (inspected !== "None") {
      const inspCopy: Course = { ...inspected };
      inspCopy.department = dep;
      dispatch(updateInspectedCourse(inspCopy));
    }
  };

  // On placeholder tag change
  const onPTagChange = (event: any) => {
    const tag = event.value;
    setPlaceholderTag(tag);
    if (inspected !== "None") {
      const inspCopy: Course = { ...inspected };
      inspCopy.tags.push(tag);
      dispatch(updateInspectedCourse(inspCopy));
    }
  };

  return (
    <div className="flex flex-col h-full font-medium">
      <div className="text-2xl">Add a placeholder</div>
      <div className="flex flex-col mb-10">
        <div className="flex flex-col w-2/6 mt-3">
          Title
          <input
            className="mt-1"
            onChange={onPTChange}
            defaultValue={placeholderTitle}
            value={placeholderTitle}
          ></input>
        </div>
        <div className="flex flex-col w-2/6 mt-2">
          Number
          <input
            className="mt-1"
            onChange={onPNChange}
            defaultValue={placeholderNumber}
            value={placeholderNumber}
          ></input>
        </div>

        <div className="flex flex-col w-1/6 mt-2">
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
        <div className="flex flex-col w-1/6 mt-2">
          Tag
          <Select
            options={[
              ...tagFilters.map((tag: any) => ({ label: tag, value: tag })),
            ]}
            className="w-40 mt-1 rounded outline-none"
            onChange={onPTagChange}
            value={{
              value: placeholderTag,
              label: placeholderTag,
            }}
          />
        </div>
        <div className="flex flex-col w-1/6 mt-2">
          Credits
          <Select
            onChange={onPCChange}
            options={[
              ...[
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
              ].map((cred: any) => ({ label: cred, value: cred })),
            ]}
            value={{ value: placeholderCredits, label: placeholderCredits }}
            className="mt-1"
          />
        </div>
        <div className="flex flex-col w-1/6 mt-2">
          Area
          <Select
            options={[
              ...["none", "N", "S", "H", "E", "Q"].map((area: any) => ({
                label: area,
                value: area,
              })),
            ]}
            className="w-40 mt-1 rounded outline-none"
            onChange={onPAChange}
            value={{
              value: placeholderArea,
              label: placeholderArea,
            }}
          />
        </div>
      </div>
      <button
        className="w-1/6 p-2 mr-0 text-white rounded bg-primary"
        onClick={props.addCourse}
      >
        Add Course
      </button>
    </div>
  );
};

export default Placeholder;
