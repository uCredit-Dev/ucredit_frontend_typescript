import React, { useState, useEffect } from "react";
import axios from "axios";
import { Distribution, Plan } from "../../commonTypes";
import { useDispatch, useSelector } from "react-redux";
import {
  updateSelectedPlan,
  updatePlanList,
  updateGuestPlanIds,
  selectUser,
  selectPlan,
  selectPlanList,
} from "../../slices/userSlice";
import { testMajorCSNew } from "../../testObjs";
// import { generateNewPlan } from "../../assets";
const api = "https://ucredit-api.herokuapp.com/api";

type PlanChooseProps = {
  className?: string;
  newPlan: number;
  setNewPlan: Function;
};

const PlanChoose: React.FC<PlanChooseProps> = (props) => {
  // Redux setup
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const currentPlan = useSelector(selectPlan);
  const planList = useSelector(selectPlanList);

  // Gets all users's plans and updates state everytime a new user is chosen.
  useEffect(() => {
    if (user._id !== "") {
      axios.get(api + "/plansByUser/" + user._id).then((retrieved) => {
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
          // Initial load, there is no current plan, so we set the current to be the first plan in the array.
          dispatch(updatePlanList(retrievedPlans));
          dispatch(updateSelectedPlan(retrievedPlans[0]));
        } else if (
          retrievedPlans.length === 0 &&
          user._id !== "noUser" &&
          user._id !== "guestUser"
        ) {
          // If no plans, automatically generate a new plan
          // TODO: Modularize creating courses into its own common function
          // GenerateNewPlan(user, retrievedPlans);
          // .then(() => {
          //         if (
          //           index ===
          //           testMajorCSNew.generalDistributions.length - 1
          //         ) {
          //           dispatch(updateSelectedPlan(newRetrievedPlan));
          //           dispatch(updatePlanList(retrievedPlans));
          //           props.setNewPlan(props.newPlan + 1);
          //         }
          //       });
          //   }
          console.log("new plan 1");
          const planBody = {
            name: "Unnamed Plan",
            user_id: user._id,
            majors: [testMajorCSNew],
          };
          axios.post(api + "/plans", planBody).then((data: any) => {
            const newRetrievedPlan = { ...data.data.data };
            testMajorCSNew.generalDistributions.forEach(
              (distr: any, index: number) => {
                axios
                  .post(api + "/distributions", {
                    name: distr.name,
                    required: distr.required,
                    user_id: user._id,
                    plan_id: newRetrievedPlan._id,
                  })
                  .then((newDistr: any) => {
                    newRetrievedPlan.distribution_ids = [
                      ...newRetrievedPlan.distribution_ids,
                      newDistr.data.data._id,
                    ];
                  })
                  .then(() => {
                    if (
                      index ===
                      testMajorCSNew.generalDistributions.length - 1
                    ) {
                      dispatch(updateSelectedPlan(newRetrievedPlan));
                      props.setNewPlan(props.newPlan + 1);
                      if (user._id === "guestUser") {
                        const planIdArray = [newRetrievedPlan._id];
                        dispatch(updateGuestPlanIds(planIdArray));
                        dispatch(
                          updatePlanList([newRetrievedPlan, ...planList])
                        );
                      }
                    }
                  });
              }
            );
          });
        } else {
          // If there is already a current plan, simply update the plan list.
          dispatch(updatePlanList(retrievedPlans));
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, props.newPlan, planList.length]);

  // Handles onClick for when a dropdown option is selected
  const handlePlanChange = (event: any) => {
    setDropdown(false);
    const selectedOption = event.target.value;
    const planListClone = [...planList];
    if (selectedOption === "new plan" && user._id !== "noUser") {
      console.log("new plan 2");
      // Post req body for a new plan
      const planBody = {
        name: "Unnamed Plan",
        user_id: user._id,
        majors: [testMajorCSNew.name],
      };

      axios.post(api + "/plans", planBody).then((data: any) => {
        const newRetrievedPlan: Plan = { ...data.data.data };
        testMajorCSNew.generalDistributions.forEach(
          (distr: any, index: number) => {
            axios
              .post(api + "/distributions", {
                name: distr.name,
                required: distr.required,
                user_id: user._id,
                plan_id: newRetrievedPlan._id,
              })
              .then((newDistr: any) => {
                newRetrievedPlan.distribution_ids = [
                  ...newRetrievedPlan.distribution_ids,
                  newDistr.data.data._id,
                ];
              })
              .then(() => {
                if (index === testMajorCSNew.generalDistributions.length - 1) {
                  dispatch(updateSelectedPlan(newRetrievedPlan));
                  props.setNewPlan(props.newPlan + 1);
                  if (user._id === "guestUser") {
                    const planIdArray = [newRetrievedPlan._id];
                    dispatch(updateGuestPlanIds(planIdArray));
                    dispatch(updatePlanList([newRetrievedPlan, ...planList]));
                  }
                }
              });
          }
        );
      });
    } else {
      let newSelected: Plan = currentPlan;
      planList.forEach((plan, index) => {
        if (plan._id === event.target.value) {
          newSelected = plan;
          planListClone.splice(index, 1);
          planListClone.splice(0, 0, newSelected);
        }
      });
      dispatch(updateSelectedPlan(newSelected));
      dispatch(updatePlanList(planListClone));
    }
  };

  useEffect(() => {
    if (user.plan_ids.length === 0 && user._id !== "noUser") {
      console.log("new plan 3", user);
      // Post req body for a new plan
      const planBody = {
        name: "Unnamed Plan",
        user_id: user._id,
        majors: [testMajorCSNew.name],
      };

      axios.post(api + "/plans", planBody).then((data: any) => {
        const newRetrievedPlan = { ...data.data.data };
        testMajorCSNew.generalDistributions.forEach(
          (distr: any, index: number) => {
            axios
              .post(api + "/distributions", {
                name: distr.name,
                required: distr.required,
                user_id: user._id,
                plan_id: newRetrievedPlan._id,
              })
              .then((newDistr: any) => {
                newRetrievedPlan.distribution_ids = [
                  ...newRetrievedPlan.distribution_ids,
                  newDistr.data.data._id,
                ];
              })
              .then(() => {
                if (index === testMajorCSNew.generalDistributions.length - 1) {
                  dispatch(updateSelectedPlan(newRetrievedPlan));
                  props.setNewPlan(props.newPlan + 1);
                  if (user._id === "guestUser") {
                    const planIdArray = [newRetrievedPlan._id];
                    dispatch(updateGuestPlanIds(planIdArray));
                    dispatch(updatePlanList([newRetrievedPlan, ...planList]));
                  }
                }
              });
          }
        );
      });
    }
  });

  const [dropdown, setDropdown] = useState<boolean>(false);
  const openSelectDropdown = () => {
    setDropdown(!dropdown);
  };

  return (
    <>
      <button className='text-white bg-primary' onClick={openSelectDropdown}>
        Select Plan
      </button>
      {dropdown ? (
        <div className='flex flex-col text-white bg-secondary'>
          {planList.map((plan, index) => (
            <button key={index} value={plan._id} onClick={handlePlanChange}>
              {plan.name}
            </button>
          ))}
          <button value='new plan' onClick={handlePlanChange}>
            Create a plan +
          </button>
        </div>
      ) : null}
      {/* {dropdownOptions} */}
    </>
  );
};

export default PlanChoose;
