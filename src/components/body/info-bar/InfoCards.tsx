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
import { ReactComponent as RemoveSvg } from "../../svg/remove.svg";
import { ReactComponent as UserSvg } from "../../svg/user.svg";
import { ReactComponent as MajorSvg } from "../../svg/major.svg";

const api = "https://ucredit-api.herokuapp.com/api";

const InfoCards: React.FC<any> = () => {
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
      // TODO: There are many codes like this to update the planList in other functions. we need to generalize or simplify this sometime. either as a common function or a function on the userSlice
      let newPlanList = [...planList];
      for (let i = 0; i < planList.length; i++) {
        if (newPlanList[i]._id === currentPlan._id) {
          newPlanList[i] = { ...newPlan };
        }
      }
      console.log("after name change list is ", newPlanList);
      setEditName(false);
      dispatch(updatePlanList(newPlanList));
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
      // If it is length 1, autogenerate a new plan. Otherwise, update the list.
      if (planList.length === 1) {
        console.log("user is ", user);
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
            updatedList[0] = data.data;
          });
        });
      } else {
        dispatch(updateSelectedPlan(updatedList[0]));
      }
      console.log("updatedList is ", updatedList);
      dispatch(updatePlanList(updatedList));

      // TODO: update user
    });
  };

  return (
    <div className='flex tight:flex-col flex-row tight:items-center mb-8 w-full h-auto'>
      <div className='w-infocard flex flex-col items-center justify-center tight:mb-4 tight:mr-0 mr-4 p-4 h-48 border-2 border-solid rounded-xl shadow-lg'>
        <div className='flex flex-row items-center justify-center mb-2 w-full h-auto'>
          <input
            value={planName}
            className='w-plancardinput h-auto text-center text-myplan outline-none'
            onChange={handlePlanNameChange}
          />
          <RemoveSvg
            className='w-6 h-6 stroke-2 cursor-pointer select-none transform hover:translate-x-0.5 hover:translate-y-0.5 transition duration-200 ease-in'
            onClick={deleteCurrentPlan}
          />
        </div>
        <PlanChoose className='w-planchoose flex flex-row items-center justify-center px-16 h-auto text-white text-infocard bg-secondary appearance-none cursor-pointer select-none' />
      </div>

      <div className='w-infocard flex flex-col items-center justify-center p-4 h-48 text-infocard border-2 border-solid rounded-xl shadow-lg'>
        <div className='mb-2 w-14 h-14 bg-secondary rounded-full'></div>
        <div className='flex flex-row w-auto h-auto text-center'>
          {user.firstName} {user.lastName}
        </div>
        <div className='flex flex-row w-auto h-auto font-light stroke-2'>
          {currentPlan.majors}
        </div>
      </div>
    </div>
  );
};

export default InfoCards;
