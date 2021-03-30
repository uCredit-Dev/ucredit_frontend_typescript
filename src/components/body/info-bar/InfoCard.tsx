import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUser,
  selectPlan,
  selectPlanList,
  updateUser,
  updatePlanList,
  updateSelectedPlan,
} from "../../slices/userSlice";
import PlanChoose from "./PlanChoose";
const api = "https://ucredit-api.herokuapp.com/api";

const InfoCard: React.FC<any> = () => {
  // Redux Setup
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const currentPlan = useSelector(selectPlan);
  const planList = useSelector(selectPlanList);

  // Holds temporary plan name.
  const [planName, setPlanName] = useState<string>(currentPlan.name);

  // Determines whether we're editting the name.
  const [editName, setEditName] = useState<boolean>(false);

  // Updates temporary plan name and notifies useffect on state change to update db plan name with debounce.
  const handlePlanNameChange = (event: any) => {
    setPlanName(event.target.value);
    setEditName(true);
  };

  // Only edits name if editName is true. If true, calls debounce update function
  useEffect(() => {
    if (editName) {
      const update = setTimeout(updateName, 1000);
      return () => clearTimeout(update);
    }
  }, [planName]);

  const updateName = () => {
    const body = {
      plan_id: currentPlan._id,
      majors: currentPlan.majors,
      name: planName,
    };
    fetch(api + "/plans/update", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => {
      console.log("plan updated", resp);
      const newPlan = { ...currentPlan, name: planName };
      dispatch(updateSelectedPlan(newPlan));
      // dispatch(updatePlanList());
      setEditName(false);
    });
  };

  useEffect(() => {
    setPlanName(currentPlan.name);
  }, [currentPlan]);

  const deleteCurrentPlan = () => {
    // delete plan from db
    // update plan array
    fetch(api + "/plans/" + currentPlan._id, {
      method: "DELETE",
    }).then((resp) => {
      console.log("plan updated", resp);
      let updatedList = [...planList]; // TODO: Once user routes are figured out, pull user info from db.
      updatedList = updatedList.filter((plan) => {
        return plan._id === currentPlan._id;
      });
      if (planList.length === 1) {
        dispatch(
          updateSelectedPlan({
            _id: "noPlan",
            name: "",
            majors: [],
            freshman: [],
            sophomore: [],
            junior: [],
            senior: [],
            distribution_ids: [],
            user_id: "",
          })
        );
      } else {
        dispatch(updateSelectedPlan(updatedList[0]));
      }
      dispatch(updatePlanList(updatedList));

      // TODO: update user
    });
  };

  return (
    <div className="flex flex-row justify-between mb-8 mx-8 p-6 w-full h-24 border-2 border-solid rounded-xl shadow-lg">
      <input
        value={planName}
        className="flex flex-row items-center justify-center w-auto h-full text-myplan"
        onChange={handlePlanNameChange}
      ></input>
      <div className="flex flex-row items-center justify-center w-auto h-full text-infocard">
        Name: {user.firstName} {user.lastName}
      </div>
      <div className="flex flex-row items-center justify-center w-auto h-full text-infocard">
        Majors: {currentPlan.majors}
      </div>
      <button onClick={deleteCurrentPlan}>Delete Plan</button>
      <PlanChoose />
    </div>
  );
};

export default InfoCard;
