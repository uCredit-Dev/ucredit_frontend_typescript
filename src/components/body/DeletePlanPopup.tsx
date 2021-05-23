import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUser,
  selectPlan,
  selectPlanList,
  updatePlanList,
  updateSelectedPlan,
  updateDeleteStatus,
} from "../slices/userSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GenerateNewPlan from "./right-column-info/GenerateNewPlan";
const api = "https://ucredit-api.herokuapp.com/api";

/* 
  This is the confirmation popup that appears when users press the button to delete a plan.
  It actually performs the deletion or cancels it.
*/
const DeletePlanPopup = () => {
  // Redux Setup
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const currentPlan = useSelector(selectPlan);
  const planList = useSelector(selectPlanList);

  const [generateNew, setGenerateNew] = useState<boolean>(false);
  const setGenerateNewFalse = () => {
    setGenerateNew(false);
  };

  // Deletes current plan.
  const deleteCurrentPlan = () => {
    // delete plan from db
    // update plan array
    // If plan list has more than one plan, delete. Otherwise, don't.
    if (planList.length > 1 && user._id !== "noUser") {
      fetch(api + "/plans/" + currentPlan._id, {
        method: "DELETE",
      })
        .then(() => {
          toast.error(currentPlan.name + " deleted!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
          });
          let updatedList = [...planList];
          updatedList = updatedList.filter((plan) => {
            return plan._id !== currentPlan._id;
          });
          dispatch(updateSelectedPlan(updatedList[0]));
          dispatch(updatePlanList(updatedList));
          dispatch(updateDeleteStatus(false));
        })
        .catch((err) => console.log(err));
    } else {
      toast.error("Cannot delete last plan!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  // Cancels plan delete
  const cancel = () => {
    dispatch(updateDeleteStatus(false));
  };

  return (
    <>
      <GenerateNewPlan
        generateNew={generateNew}
        setGenerateNewFalse={setGenerateNewFalse}
        _id={user._id}
        currentPlan={currentPlan}
      />
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
            Are you sure you want to delete {currentPlan.name}?
          </b>
          <div className="flex flex-row justify-center mb-4 mt-8 w-full">
            <button
              className="m-1 p-1 w-1/6 text-white bg-red-500"
              onClick={deleteCurrentPlan}
            >
              <b>Yes</b>
            </button>
            <button
              className="m-1 ml-20 p-1 w-1/6 text-white bg-secondary"
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

export default DeletePlanPopup;
