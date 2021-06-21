import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  selectToAddName,
  updateToAddName,
  updateAddingPlanStatus,
  selectPlanList,
  updateToAddMajor,
  selectToAddMajor,
  updateGeneratePlanAddStatus,
} from "../../slices/userSlice";
import { allMajors } from "../../resources/majors";
import Select from "react-select";

const majorOptions = [
  ...allMajors.map((major, index) => ({
    value: index,
    label: major.degree_name,
  })),
];

/**
 * Popup for adding a new plan.
 * TODO: Implement all commented code features
 * @param setGenerateNew - signals the generateNewPlan component to generate a new plan.
 * */
const PlanAdd = () => {
  // Redux setup
  const dispatch = useDispatch();
  const toAddName = useSelector(selectToAddName);
  const toAddMajor = useSelector(selectToAddMajor);
  const planList = useSelector(selectPlanList);

  /**
   * Handles the user's intention to create a new plan.
   */
  const createNewPlan = () => {
    if (toAddMajor === null) {
      toast.error("Please choose a valid major!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        progress: 0,
      });
    } else {
      // TODO: resolve confusing naming; generatePlanAddStatus signals generateNewPlan to generate a new plan, updateAdding signals planAdd to pop up
      dispatch(updateAddingPlanStatus(false));
      dispatch(updateGeneratePlanAddStatus(true));
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
        progress: 0,
      });
    } else {
      dispatch(updateAddingPlanStatus(false));
    }
  };

  // Handles changing the major of the new plan.
  const handleMajorChange = (event: any) => {
    if (event.value >= 0) {
      dispatch(updateToAddMajor(allMajors[event.value]));
    }
  };

  // const placeholderOptions = [
  //   { value: "foo", label: "foo" },
  //   { value: "bar", label: "bar" },
  //   { value: "baz", label: "baz" },
  // ];

  // const selectPlanOption = [
  //   { value: "default", label: "Default" },
  //   { value: "template", label: "Template" },
  // ];

  return (
    <div className="absolute top-0">
      {/* Background Grey */}
      <div className="fixed z-50 left-0 top-0 m-0 w-full h-screen bg-black opacity-50"></div>

      {/* Popup */}
      <div
        className={
          "z-50 fixed flex flex-col bg-gradient-to-r shadow from-blue-500 to-green-400 select-none rounded z-20 h-auto w-3/12 top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3 min-w-planAdd"
        }
      >
        <div className="px-4 py-2 text-white text-coursecard select-none">
          Adding a new plan!
        </div>
        {/* Search area */}
        <div className="w-full h-full text-coursecard">
          <div className="p-8 w-full h-auto bg-gray-200 rounded">
            <div className="flex flex-row mb-4">
              <input
                autoFocus
                className="flex-none mr-8 px-1 w-full h-selectbox rounded focus:outline-none"
                type="text"
                placeholder="Plan Name"
                defaultValue={toAddName}
                onChange={handleNameChange}
              />
              {/* <div className="flex flex-row w-full">
                <div className="flex flex-none flex-row items-center mr-2">
                  Number of years
                </div>
                <Select
                  options={placeholderOptions}
                  className="flex-grow px-1 h-6 rounded"
                />
              </div> */}
            </div>
            <div className="z-50 flex flex-row justify-between mb-4">
              <Select
                options={majorOptions}
                onChange={handleMajorChange}
                placeholder="Primary Major"
                className="z-50 w-full"
              />
              {/* <Select
                options={placeholderOptions}
                onChange={() => {}}
                placeholder="Secondary Major (developing)"
                className="w-full"
              />
            </div>
            <div className="flex flex-row justify-between mb-4">
              <Select
                options={placeholderOptions}
                onChange={() => {}}
                placeholder="Select a Plan Option (developing)"
                className="mr-8 w-full"
              />
              <Select
                options={placeholderOptions}
                onChange={() => {}}
                placeholder="Minor (developing)"
                className="w-full"
              /> */}
            </div>
            {/* <div className="flex flex-row items-center mb-4 w-full">
              <div className="flex-none mr-8">Select a Plan Option</div>
              <Select
                options={selectPlanOption}
                onChange={() => {}}
                placeholder="Please Select"
                className="w-full"
              />
            </div> */}
            <div className="flex flex-row justify-end">
              <button
                className="z-30 mr-4 p-2 w-16 h-10 text-white bg-blue-500 rounded focus:outline-none transform hover:scale-105 transition duration-200 ease-in"
                onClick={createNewPlan}
              >
                Add
              </button>
              <button
                className="z-30 p-2 w-16 h-10 text-black bg-white border border-solid border-secondary rounded focus:outline-none transform hover:scale-105 transition duration-200 ease-in"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanAdd;
