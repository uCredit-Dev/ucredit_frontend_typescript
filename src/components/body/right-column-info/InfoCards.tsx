import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUser,
  selectPlan,
  selectPlanList,
  updatePlanList,
  updateSelectedPlan,
  updateDeleteStatus,
} from "../../slices/userSlice";
import PlanChoose from "./PlanChoose";
import { ReactComponent as RemoveSvg } from "../../svg/Remove.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const api = "https://ucredit-api.herokuapp.com/api";

/* 
  User/Current plan information area.
*/
const InfoCards = () => {
  // Redux Setup
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const currentPlan = useSelector(selectPlan);
  const planList = useSelector(selectPlanList);

  // Holds temporary plan name.
  const [planName, setPlanName] = useState<string>(currentPlan.name);

  // Determines whether we're editing the name.
  const [editName, setEditName] = useState<boolean>(false);

  // Updates temporary plan name and notifies useffect on state change to update db plan name with debounce.
  const handlePlanNameChange = (event: any) => {
    setPlanName(event.target.value);
    setEditName(true);
  };

  const [newPlan, setNewPlan] = useState(0);

  // Only edits name if editName is true. If true, calls debounce update function
  useEffect(() => {
    if (editName) {
      const update = setTimeout(updateName, 1000);
      return () => clearTimeout(update);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    })
      .then((resp) => {
        const newUpdatedPlan = { ...currentPlan, name: planName };
        dispatch(updateSelectedPlan(newUpdatedPlan));
        // TODO: There are many codes like this to update the planList in other functions. we need to generalize or simplify this sometime. either as a common function or a function on the userSlice
        let newPlanList = [...planList];
        for (let i = 0; i < planList.length; i++) {
          if (newPlanList[i]._id === currentPlan._id) {
            newPlanList[i] = { ...newUpdatedPlan };
          }
        }
        toast.success("Plan name changed to " + newUpdatedPlan.name + "!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setEditName(false);
        dispatch(updatePlanList(newPlanList));
      })
      .catch((err) => console.log(err));
  };

  // Updates current plan every time current plan changes
  useEffect(() => {
    setPlanName(currentPlan.name);
  }, [currentPlan]);

  // Activates delete plan popup.
  const activateDeletePlan = () => {
    dispatch(updateDeleteStatus(true));
  };

  return (
    <div className="flex tight:flex-col flex-row tight:items-center mb-4 h-auto">
      <div className="flex flex-col items-center justify-center tight:mb-4 tight:mr-0 p-6 w-full h-auto bg-white rounded shadow">
        <div className="flex flex-col mb-2 w-auto h-auto">
          <div className="flex flex-row items-center justify-center mb-2 w-full h-auto">
            <input
              value={planName}
              className="w-plancardinput h-auto text-center text-myplan outline-none"
              onChange={handlePlanNameChange}
            />
            <RemoveSvg
              className="w-6 h-6 stroke-2 cursor-pointer select-none transform hover:translate-x-0.5 hover:translate-y-0.5 transition duration-200 ease-in"
              onClick={activateDeletePlan}
            />
          </div>
          <PlanChoose
            className="flex flex-row items-center justify-center w-planchoose h-auto text-white text-infocard bg-secondary cursor-pointer select-none"
            newPlan={newPlan}
            setNewPlan={setNewPlan}
          />
        </div>
        <div className="flex flex-col items-center">
          <div className="w-auto h-auto text-center">{user.name}</div>
          <div className="w-auto h-auto font-light stroke-2">
            {currentPlan.majors}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCards;
