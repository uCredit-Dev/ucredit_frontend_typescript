import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plan } from "../../../resources/commonTypes";
import { useDispatch, useSelector } from "react-redux";
import {
  updatePlanList,
  selectUser,
  selectPlanList,
} from "../../../slices/userSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GenerateNewPlan from "../../../resources/GenerateNewPlan";
import {
  selectPlan,
  updateSelectedPlan,
} from "../../../slices/currentPlanSlice";
import { api } from "../../../resources/assets";
import { updateAddingPlanStatus } from "../../../slices/popupSlice";

/**
 * Dropdown for choosing a plan to display.
 */
const PlanChoose = () => {
  // Redux setup
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const currentPlan = useSelector(selectPlan);
  const planList = useSelector(selectPlanList);

  // Component state setup
  const [dropdown, setDropdown] = useState<boolean>(false);

  const openSelectDropdown = () => {
    setDropdown(!dropdown);
  };

  // Gets all users's plans and updates state everytime a new user is chosen.
  useEffect(() => {
    if (user._id !== "noUser" && user._id !== "guestUser") {
      console.log(user._id);
      axios
        .get(api + "/plansByUser/" + user._id)
        .then((retrieved) => {
          const retrievedPlans: Plan[] = retrieved.data.data;
          if (retrievedPlans.length > 0) {
            // sort plans by ids if there is more than one plan
            retrievedPlans.sort((plan1: Plan, plan2: Plan) =>
              plan1._id.localeCompare(plan2._id)
            );
          }

          if (currentPlan._id !== "noPlan") {
            // Swap first plan in the list with the current plan.
            retrievedPlans.forEach((plan: Plan, index) => {
              if (plan._id === currentPlan._id) {
                const temp = retrievedPlans[0];
                retrievedPlans[0] = currentPlan;
                retrievedPlans[index] = temp;
              }
            });
          }

          if (retrievedPlans.length > 0 && currentPlan._id === "noPlan") {
            const totPlans: Plan[] = [];
            retrievedPlans.forEach((plan) => {
              axios
                .get(api + "/years/" + plan._id)
                .then((resp) => {
                  totPlans.push({ ...plan, years: resp.data.data });
                  if (totPlans.length === retrievedPlans.length) {
                    // Initial load, there is no current plan, so we set the current to be the first plan in the array.
                    dispatch(updatePlanList(totPlans));
                    dispatch(updateSelectedPlan(totPlans[0]));
                  }
                })
                .catch((err) => console.log(err));
            });

            toast("Retrieved " + retrievedPlans.length + " plans!", {
              position: "top-right",
              autoClose: 5000,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: 0,
            });
          } else if (
            retrievedPlans.length === 0 &&
            user._id !== "noUser" &&
            user._id !== "guestUser"
          ) {
            // If no plans, automatically generate a new plan
            dispatch(updateAddingPlanStatus(true));
          } else {
            // If there is already a current plan, simply update the plan list.
            const totPlans: Plan[] = [];
            retrievedPlans.forEach((plan) => {
              axios
                .get(api + "/years/" + plan._id)
                .then((resp) => {
                  totPlans.push({ ...plan, years: resp.data.data });
                  if (totPlans.length === retrievedPlans.length) {
                    // Initial load, there is no current plan, so we set the current to be the first plan in the array.
                    dispatch(updatePlanList(retrievedPlans));
                  }
                })
                .catch((err) => console.log(err));
            });
          }
        })
        .catch((err) => {
          if (user._id === "guestUser") {
            console.log(
              "In guest user! This is expected as there are no users with this id."
            );
          } else {
            console.log(err);
          }
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user._id]);

  // Handles onClick for when a dropdown option is selected
  const handlePlanChange = (event: any) => {
    setDropdown(false);
    const selectedOption = event.target.value;
    const planListClone = [...planList];
    if (selectedOption === "new plan" && user._id !== "noUser") {
      dispatch(updateAddingPlanStatus(true));
    } else {
      let newSelected: Plan = currentPlan;
      planList.forEach((plan, index) => {
        if (plan._id === event.target.value) {
          newSelected = plan;
          planListClone.splice(index, 1);
          planListClone.splice(0, 0, newSelected);
        }
      });

      toast(newSelected.name + " selected!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
      });
      dispatch(updateSelectedPlan(newSelected));
      dispatch(updatePlanList(planListClone));
    }
  };

  // Adds a new plan every time a new guest user is created and they don't have a a plan.
  useEffect(() => {
    if (user.plan_ids.length === 0 && user._id === "guestUser") {
      // Post req body for a new plan
      dispatch(updateAddingPlanStatus(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user._id]);

  return (
    <>
      {/* dummy component to generate new plans */}
      <GenerateNewPlan />
      {/* <button
        className="mx-auto w-planselect text-white bg-primary rounded focus:outline-none transform hover:scale-105 transition duration-200 ease-in"
        onClick={openSelectDropdown}
      > */}
      <div className="relative flex flex-col">
        <button
          className="ml-auto mr-4 px-2 py-1 text-black bg-white rounded focus:outline-none shadow select-none transform hover:scale-105 transition duration-200 ease-in"
          onClick={openSelectDropdown}
        >
          Select Plan
        </button>
        {dropdown ? (
          // <div className="flex flex-col mx-auto w-planselect text-white bg-secondary rounded">
          <div className="absolute z-40 right-4 top-9 flex flex-col w-40 text-black bg-white rounded shadow">
            {planList.map((plan, index) => (
              <button
                key={index}
                value={plan._id}
                onClick={handlePlanChange}
                className="py-1 hover:bg-gray-300 border-t focus:outline-none transform"
              >
                {plan.name}
              </button>
            ))}
            <button
              value="new plan"
              onClick={handlePlanChange}
              className="py-1 hover:bg-gray-300 border-t focus:outline-none"
            >
              Create a plan +
            </button>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default PlanChoose;
