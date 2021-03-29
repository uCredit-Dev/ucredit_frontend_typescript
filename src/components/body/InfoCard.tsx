import axios from "axios";
import clsx from "clsx";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plan } from "../commonTypes";
import {
  updateSelectedPlan,
  selectUser,
  selectPlan,
} from "../slices/userSlice";
import { testPlan1, testPlan2 } from "../testObjs";
const api = "https://ucredit-api.herokuapp.com/api";

const InfoCard: React.FC<any> = () => {
  // Redux Setup
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const currentPlan = useSelector(selectPlan);

  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectPlanDown, setSelectPlanDown] = useState<boolean>(false);

  useEffect(() => {
    axios.get(api + "/plansByUser/" + user._id).then((retrieved) => {
      console.log("retrieved ", retrieved);
      setPlans([testPlan1, testPlan2, ...retrieved.data.data]);
    });
  }, [user]);

  const getPlanOptions = () =>
    plans.map((plan) => <option value={plan.name}>{plan.name}</option>);

  const handlePlanChange = (event: any) => {
    const selectedOption = event.target.value;
    if (selectedOption === "new plan") {
      // Create a new plan
      console.log("create new plan");
    } else {
      let newSelected: Plan = currentPlan;
      plans.forEach((plan) => {
        if (plan.name === event.target.value) {
          newSelected = plan;
        }
      });
      dispatch(updateSelectedPlan(newSelected));
    }
  };

  return (
    <div className="flex flex-row justify-between mb-8 mx-8 p-6 w-full h-24 border-2 border-solid rounded-xl shadow-lg">
      <div className="flex flex-row items-center justify-center w-auto h-full text-myplan">
        {currentPlan.name}
      </div>
      <div className="flex flex-row items-center justify-center w-auto h-full text-infocard">
        Name: {user.firstName} {user.lastName}
      </div>
      <div className="flex flex-row items-center justify-center w-auto h-full text-infocard">
        Majors: {currentPlan.majors}
      </div>
      <select
        className={clsx(
          "flex flex-row items-center justify-center px-8 w-auto h-full text-white text-infocard bg-secondary rounded-xl cursor-pointer select-none",
          { "ring-2 ring-green-200": selectPlanDown }
        )}
        onMouseDown={() => setSelectPlanDown(true)}
        onMouseUp={() => setSelectPlanDown(false)}
        value={currentPlan.name === "" ? "new plan" : currentPlan.name}
        onChange={handlePlanChange}
      >
        {getPlanOptions()}
        <option value="new plan">Create a plan +</option>
      </select>
    </div>
  );
};

export default InfoCard;
