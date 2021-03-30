import React, { useState, useEffect } from "react";
import axios from "axios";
import clsx from "clsx";
import { testPlan1, testPlan2 } from "../../testObjs";
import { Plan } from "../../commonTypes";
import { useDispatch, useSelector } from "react-redux";
import {
  updateSelectedPlan,
  updatePlanList,
  selectUser,
  selectPlan,
  selectPlanList,
} from "../../slices/userSlice";
const api = "https://ucredit-api.herokuapp.com/api";

const PlanChoose = () => {
  const [newPlan, setNewPlan] = useState(0);

  // Redux setup
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const currentPlan = useSelector(selectPlan);
  const planList = useSelector(selectPlanList);

  // State setup
  const [selectPlanDown, setSelectPlanDown] = useState<boolean>(false);

  // Gets all users's plans and updates state everytime a new user is chosen.
  useEffect(() => {
    if (user._id !== "") {
      axios.get(api + "/plansByUser/" + user._id).then((retrieved) => {
        const retrievedPlans = retrieved.data.data;
        dispatch(updatePlanList(retrievedPlans));
        if (retrievedPlans.length > 0) {
          dispatch(updateSelectedPlan(retrievedPlans[0]));
        } else {
          const body = {
            name: "Unnamed Plan",
            user_id: user._id,
            majors: ["Computer Science"],
          };

          fetch(api + "/plans", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          }).then((retrieved) => {
            retrieved.json().then((data) => {
              console.log("retrievedJson is ", data);
              dispatch(updateSelectedPlan(data.data));
              setNewPlan(newPlan + 1);
            });
          });
        }
      });
    }
  }, [user, newPlan, planList.length]);

  // Makes plan dropdown options
  const [dropdownOptions, setdropdownOptions] = useState<any>([]);
  useEffect(() => {
    let id = 0;
    console.log("optionList", planList);
    const options = planList.map((plan) => (
      <option key={id++} value={plan._id}>
        {plan.name}
      </option>
    ));
    console.log("setting");
    setdropdownOptions(options);
  }, [planList, currentPlan.name]);

  // Handles onClick for when a dropdown option is selected
  const handlePlanChange = (event: any) => {
    const selectedOption = event.target.value;
    if (selectedOption === "new plan") {
      // Post req body for a new plan
      const body = {
        name: "Unnamed Plan",
        user_id: user._id,
        majors: ["Computer Science"],
      };

      fetch(api + "/plans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }).then((retrieved) => {
        retrieved.json().then((data) => {
          console.log("retrievedJson is ", data);
          dispatch(updateSelectedPlan(data.data));
          setNewPlan(newPlan + 1);
        });
      });
      console.log("create new plan");
    } else {
      planList.forEach((plan) => {
        if (0 === plan._id.localeCompare(selectedOption)) {
          dispatch(updateSelectedPlan(plan));
        }
      });
    }
  };

  return (
    <select
      className={clsx(
        "flex flex-row items-center justify-center px-8 w-auto h-full text-white text-infocard bg-secondary rounded-xl cursor-pointer select-none",
        { "ring-2 ring-green-200": selectPlanDown }
      )}
      onMouseDown={() => setSelectPlanDown(true)}
      onMouseUp={() => setSelectPlanDown(false)}
      onChange={handlePlanChange}
    >
      {dropdownOptions}
      <option value="new plan">Create a plan +</option>
    </select>
  );
};

export default PlanChoose;
