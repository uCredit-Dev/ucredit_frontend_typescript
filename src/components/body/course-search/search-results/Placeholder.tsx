import React, { useState, useEffect } from "react";
import { Course } from "../../../commonTypes";
import { useSelector, useDispatch } from "react-redux";
import {
  selectInspectedCourse,
  updateInspectedCourse,
  selectPlaceholder,
} from "../../../slices/searchSlice";

const Placeholder = (props: { addCourse: any }) => {
  // Redux Setup
  const inspected = useSelector(selectInspectedCourse);
  const placeholder = useSelector(selectPlaceholder);
  const dispatch = useDispatch();
  const [placeholderTitle, setPlaceholderTitle] = useState<string>(
    "placeholder"
  );
  const [placeholderArea, setPlaceholderArea] = useState<string>("");
  const [placeholderCredits, setPlaceholderCredits] = useState<string>("");
  const [placeholderNumber, setPlaceholderNumber] = useState<string>("");

  useEffect(() => {
    if (placeholder && inspected !== "None") {
      setPlaceholderArea(inspected.areas);
      setPlaceholderTitle(inspected.title);
      setPlaceholderCredits(inspected.credits);
      setPlaceholderNumber(inspected.number);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inspected]);

  const onPTChange = (event: any) => {
    const title = event.target.value;
    setPlaceholderTitle(title);
    if (inspected !== "None") {
      const inspCopy: Course = { ...inspected };
      inspCopy.title = title;
      dispatch(updateInspectedCourse(inspCopy));
    }
  };

  const onPAChange = (event: any) => {
    const area = event.target.value === "None" ? "" : event.target.value;
    setPlaceholderArea(area);
    if (inspected !== "None") {
      const inspCopy: Course = { ...inspected };
      inspCopy.areas = area;
      dispatch(updateInspectedCourse(inspCopy));
    }
  };

  const onPCChange = (event: any) => {
    const cred = event.target.value;
    setPlaceholderCredits(cred);
    if (inspected !== "None") {
      const inspCopy: Course = { ...inspected };
      inspCopy.credits = cred;
      dispatch(updateInspectedCourse(inspCopy));
    }
  };

  const onPNChange = (event: any) => {
    const num = event.target.value;
    setPlaceholderNumber(num);
    if (inspected !== "None") {
      const inspCopy: Course = { ...inspected };
      inspCopy.number = num;
      dispatch(updateInspectedCourse(inspCopy));
    }
  };
  return (
    <div className="flex flex-col h-full font-medium">
      <div className="text-2xl">Add a placeholder</div>
      <div className="flex flex-col mb-10">
        <div className="flex flex-col mt-3 w-2/6">
          Name
          <input
            className="mt-1"
            onChange={onPTChange}
            defaultValue={placeholderTitle}
            value={placeholderTitle}
          ></input>
        </div>
        <div className="flex flex-col mt-2 w-2/6">
          Number
          <input
            className="mt-1"
            onChange={onPNChange}
            defaultValue={placeholderNumber}
            value={placeholderNumber}
          ></input>
        </div>

        <div className="flex flex-col mt-2 w-1/6">
          Area
          <select
            className="mt-1"
            onChange={onPAChange}
            defaultValue={placeholderArea}
            value={placeholderArea}
          >
            {["None", "N", "S", "H", "E", "Q"].map((area: any) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col mt-2 w-1/6">
          Credits
          <select
            className="mt-1"
            onChange={onPCChange}
            defaultValue={placeholderCredits}
            value={placeholderCredits}
          >
            {[
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
            ].map((cred: any) => (
              <option key={cred} value={cred}>
                {cred}
              </option>
            ))}
          </select>
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
