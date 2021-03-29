import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser, selectPlan } from "../../slices/userSlice";
import PlanChoose from "./PlanChoose";
const api = "https://ucredit-api.herokuapp.com/api";

const InfoCard: React.FC<any> = () => {
  // Redux Setup
  const user = useSelector(selectUser);
  const currentPlan = useSelector(selectPlan);

  // Holds temporary plan name.
  const [planName, setPlanName] = useState<string>(currentPlan.name);

  // Determines whether we're editting the name.
  const [editName, setEditName] = useState<boolean>(false);

  // Updates temporary plan name and notifies useffect on state change to update db plan name with debounce.
  const handlePlanNameChange = (event: any) => {
    setPlanName(event.target.value);
    setEditName(true);
  };

  //
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
      setEditName(false);
    });
  };

  useEffect(() => setPlanName(currentPlan.name), [currentPlan]);

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
      <PlanChoose />
    </div>
  );
};

export default InfoCard;
