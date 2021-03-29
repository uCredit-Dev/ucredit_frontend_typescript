import React from "react";
import { useSelector } from "react-redux";
import { selectUser, selectPlan } from "../../slices/userSlice";
import PlanChoose from "./PlanChoose";

const InfoCard: React.FC<any> = () => {
  // Redux Setup
  const user = useSelector(selectUser);
  const currentPlan = useSelector(selectPlan);

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
      <PlanChoose />
    </div>
  );
};

export default InfoCard;
