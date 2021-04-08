import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUser,
  selectPlan,
  selectPlanList,
  updatePlanList,
  updateSelectedPlan,
} from "../../slices/userSlice";
import PlanChoose from "./PlanChoose";
import { ReactComponent as RemoveSvg } from "../../svg/remove.svg";
import { testMajorCS } from "../../testObjs";
import axios from "axios";
import { Distribution, Plan } from "../../commonTypes";
const testMajor = testMajorCS;

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
        const newPlan = { ...currentPlan, name: planName };
        dispatch(updateSelectedPlan(newPlan));
        // TODO: There are many codes like this to update the planList in other functions. we need to generalize or simplify this sometime. either as a common function or a function on the userSlice
        let newPlanList = [...planList];
        for (let i = 0; i < planList.length; i++) {
          if (newPlanList[i]._id === currentPlan._id) {
            newPlanList[i] = { ...newPlan };
          }
        }
        setEditName(false);
        dispatch(updatePlanList(newPlanList));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setPlanName(currentPlan.name);
  }, [currentPlan]);

  const deleteCurrentPlan = () => {
    // delete plan from db
    // update plan array
    fetch(api + "/plans/" + currentPlan._id, {
      method: "DELETE",
    })
      .then((resp) => {
        let updatedList = [...planList]; // TODO: Once user routes are figured out, pull user info from db.
        updatedList = updatedList.filter((plan) => {
          return plan._id !== currentPlan._id;
        });
        // If it is length 1, autogenerate a new plan. Otherwise, update the list.
        if (updatedList.length === 0) {
          // Post req body for a new plan
          const planBody = {
            name: "Unnamed Plan",
            user_id: user._id,
            majors: ["Computer Science"],
          };

          axios
            .post(api + "/plans", planBody)
            .then((data: { data: { data: Plan } }) => {
              const newRetrievedPlan = data.data.data;
              testMajor.generalDistributions.forEach((distr, index) => {
                axios
                  .post(api + "/distributions", {
                    name: distr.name,
                    required: distr.required,
                    user_id: user._id,
                    plan_id: newRetrievedPlan._id,
                  })
                  .then((newDistr: { data: { data: Distribution } }) => {
                    newRetrievedPlan.distribution_ids = [
                      ...newRetrievedPlan.distribution_ids,
                      newDistr.data.data._id,
                    ];
                  })
                  .then(() => {
                    if (index === testMajor.generalDistributions.length - 1) {
                      dispatch(updateSelectedPlan(newRetrievedPlan));
                      dispatch(updatePlanList(updatedList));
                      setNewPlan(newPlan + 1);
                    }
                  });
              });
            });
        } else {
          dispatch(updateSelectedPlan(updatedList[0]));
          dispatch(updatePlanList(updatedList));
          setNewPlan(newPlan + 1);
        }
        // dispatch(updateSelectedPlan(updatedList[0]));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex tight:flex-col flex-row tight:items-center mb-8 w-full h-auto">
      <div className="flex flex-wrap items-center justify-start tight:mb-4 tight:mr-0 mr-4 p-4 w-full h-auto border-2 border-solid rounded-xl shadow-lg">
        <div className="flex flex-col ml-auto mr-auto">
          <div className="flex flex-row items-center justify-center mb-2 w-full h-auto">
            <input
              value={planName}
              className="w-plancardinput h-auto text-center text-myplan outline-none"
              onChange={handlePlanNameChange}
            />
            <RemoveSvg
              className="w-6 h-6 stroke-2 cursor-pointer select-none transform hover:translate-x-0.5 hover:translate-y-0.5 transition duration-200 ease-in"
              onClick={deleteCurrentPlan}
            />
          </div>
          <PlanChoose
            className="flex flex-row items-center justify-center px-16 w-planchoose h-auto text-white text-infocard bg-secondary appearance-none cursor-pointer select-none"
            newPlan={newPlan}
            setNewPlan={setNewPlan}
          />
        </div>
        <div className="m-auto min-w-max overflow-visible">
          <div className="flex flex-row w-auto h-auto text-center">
            {user.firstName} {user.lastName}
          </div>
          <div className="flex flex-row w-auto h-auto font-light stroke-2">
            {currentPlan.majors}
          </div>
        </div>
      </div>

      {/* <div className="flex flex-col items-center justify-center p-4 w-infocard h-28 text-infocard border-2 border-solid rounded-xl shadow-lg">
        <div className="mb-2 w-14 h-14 bg-secondary rounded-full"></div>
        <div className="flex flex-row w-auto h-auto text-center">
          {user.firstName} {user.lastName}
        </div>
        <div className="flex flex-row w-auto h-auto font-light stroke-2">
          {currentPlan.majors}
        </div>
      </div>  */}
    </div>
  );
};

export default InfoCards;
