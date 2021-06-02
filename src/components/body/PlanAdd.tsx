import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  selectToAddName,
  updateToAddName,
  updateAddingStatus,
  selectPlanList,
  updateToAddMajor,
  selectToAddMajor,
} from "../slices/userSlice";
import { allMajors } from "./majors/major";
import Select from "react-select";

const majorOptions = [
  ...allMajors.map((major, index) => ({
    value: index,
    label: major.name,
  })),
];

/**
 * Popup for adding a new plan.
 * Props:
 *  setGenerateNew - function that gives a signal to make a new plan.
 * */
const PlanAdd = (props: { setGenerateNew: Function }) => {
  // Redux setup
  const dispatch = useDispatch();
  const toAddName = useSelector(selectToAddName);
  const toAddMajor = useSelector(selectToAddMajor);
  const planList = useSelector(selectPlanList);

  // Handles the user's intention to create a new plan.
  const createNewPlan = () => {
    if (toAddMajor === null) {
      toast.error("Please choose a valid major!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      dispatch(updateAddingStatus(false));
      props.setGenerateNew(true);
    }
  };

  // Handles new plan name change.
  const handleNameChange = (event: any) => {
    dispatch(updateToAddName(event.target.value));
  };

  // Handles user's intention to cancel creating a new plan.
  const handleCancel = () => {
    if (planList.length === 0) {
      toast.error("Please create at least one plan to continue!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      dispatch(updateAddingStatus(false));
    }
  };

  // Handles changing the major of the new plan.
  const handleMajorChange = (event: any) => {
    if (event.value >= 0) {
      dispatch(updateToAddMajor(allMajors[event.value]));
    }
  };

  return (
    <div className="absolute top-0">
      {/* Background Grey */}
      <div className="fixed z-20 left-0 top-0 m-0 w-full h-screen bg-black opacity-50"></div>

      {/* Popup */}
      <div
        className={
          "fixed flex flex-col bg-primary rounded z-20 w-9/12 h-5/6 top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3"
        }
      >
        <div className="px-4 py-2 text-white text-coursecard font-semibold select-none">
          Adding a new plan!
        </div>
        {/* Search area */}
        <div className="flex w-full h-full text-coursecard">
          <div
            className={
              "flex flex-col rounded bg-gray-200 w-full h-full flex-none"
            }
          >
            <input
              autoFocus
              className="mr-2 px-1 w-full w-full h-6 rounded outline-none"
              type="text"
              placeholder={
                "Course title or number (ie. Physics, 601.280, etc.)"
              }
              defaultValue={toAddName}
              onChange={handleNameChange}
            />
            Select Major
            <Select options={majorOptions} onChange={handleMajorChange} />
            <button onClick={createNewPlan}>Add</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanAdd;
