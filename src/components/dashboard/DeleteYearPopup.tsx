import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUser,
  selectYearToDelete,
  updateYearToDelete,
  updateDeleteYearStatus,
} from "../../slices/userSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GenerateNewPlan from "./right-column-info/GenerateNewPlan";
import { selectPlan, updateSelectedPlan } from "../../slices/currentPlanSlice";
import { api } from "../../resources/assets";

/**
 * This is the confirmation popup that appears when users press the button to delete a plan.
 * It actually performs the deletion or cancels it.
 */
const DeleteYearPopup = () => {
  // Redux Setup
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const currentPlan = useSelector(selectPlan);
  const year = useSelector(selectYearToDelete);

  /**
   * Popup for deleting current plan.
   */
  // Delete the selected year
  const activateDeleteYear = () => {
    if (currentPlan.years.length > 1 && year !== null) {
      fetch(api + "/years/" + year._id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(() => {
          const newYearArray = [...currentPlan.years].filter(
            (yr) => yr._id !== year._id
          );
          const newUpdatedPlan = { ...currentPlan, years: newYearArray };
          dispatch(updateSelectedPlan(newUpdatedPlan));
          dispatch(updateYearToDelete(null));
          dispatch(updateDeleteYearStatus(false));
          toast.error("Deleted " + year.name + "!");
        })
        .catch((err) => console.log(err));
    } else {
      toast.error("Cannot delete last year!");
    }
  };

  // Cancels plan delete
  const cancel = () => {
    dispatch(updateDeleteYearStatus(false));
  };

  return (
    <>
      <GenerateNewPlan _id={user._id} />
      <div className="absolute top-0">
        {/* Background Grey */}
        <div className="fixed z-20 left-0 top-0 m-0 w-full h-screen bg-black opacity-50"></div>

        {/* Actual popup */}
        <div
          className={
            "fixed flex flex-col bg-gray-100 rounded z-20 top-1/3 left-1/2 transform -translate-x-1/2 p-5"
          }
        >
          <b className="mr-8 mt-4 w-full text-center">
            Are you sure you want to delete{" "}
            {year !== null ? year.name : " invalid year"}?
          </b>
          <div className="flex flex-row justify-center mb-4 mt-8 w-full">
            <button
              className="m-1 p-1 w-1/6 text-white bg-red-500 focus:outline-none transform hover:scale-110 transition duration-200 ease-in"
              onClick={activateDeleteYear}
            >
              <b>Yes</b>
            </button>
            <button
              className="m-1 ml-20 p-1 w-1/6 text-white bg-secondary focus:outline-none transform hover:scale-110 transition duration-200 ease-in"
              onClick={cancel}
            >
              <b>No</b>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteYearPopup;
