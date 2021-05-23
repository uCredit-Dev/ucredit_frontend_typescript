import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUser,
  selectPlan,
  selectPlanList,
  updatePlanList,
  updateSelectedPlan,
  updateGuestPlanIds,
  updateDeleteStatus,
} from "../slices/userSlice";
import { testMajorCSNew } from "../testObjs";
import axios from "axios";
import { Plan } from "../commonTypes";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GenerateNewPlan from "../GenerateNewPlan";
const api = "https://ucredit-api.herokuapp.com/api";

const DeletePlanPopup = () => {
  // Redux Setup
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const currentPlan = useSelector(selectPlan);
  const planList = useSelector(selectPlanList);

  const [generateNew, setGenerateNew] = useState<boolean>(false);
  const setGenerateNewFalse = () => {
    setGenerateNew(false);
  }

  const deleteCurrentPlan = () => {
    // delete plan from db
    // update plan array
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
        let updatedList = [...planList]; // TODO: Once user routes are figured out, pull user info from db.
        updatedList = updatedList.filter((plan) => {
          return plan._id !== currentPlan._id;
        });

        // If it is length 1, autogenerate a new plan. Otherwise, update the list.
        if (updatedList.length === 0 && user._id !== "noUser") {
          // Post req body for a new plan
          setGenerateNew(true);
        } else {
          dispatch(updateSelectedPlan(updatedList[0]));
          dispatch(updatePlanList(updatedList));
        }
        dispatch(updateDeleteStatus(false));
      })
      .catch((err) => console.log(err));
  };

  const cancel = () => {
    dispatch(updateDeleteStatus(false));
  };

  return (
    <>
      <GenerateNewPlan 
        generateNew = { generateNew }
        setGenerateNewFalse = { setGenerateNewFalse }
        _id = { user._id }
        currentPlan = { currentPlan }
      />
      <div className="absolute top-0">
        {/* Background Grey */}
        <div className="fixed z-20 left-0 top-0 m-0 w-full h-screen bg-black opacity-50"></div>
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
