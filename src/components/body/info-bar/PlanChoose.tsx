import React, { useState, useEffect } from "react";
import axios from "axios";
import { Distribution, Plan } from "../../commonTypes";
import { useDispatch, useSelector } from "react-redux";
import {
  updateSelectedPlan,
  updatePlanList,
  selectUser,
  selectPlan,
  selectPlanList,
} from "../../slices/userSlice";
import { testMajorCS } from "../../testObjs";
const api = "https://ucredit-api.herokuapp.com/api";
const testMajor = testMajorCS;

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
        const retrievedPlans = retrieved.data.data;
        dispatch(updatePlanList(retrievedPlans));
        if (retrievedPlans.length > 0 && currentPlan._id === "noPlan") {
          dispatch(updateSelectedPlan(retrievedPlans[0]));
        } else if (retrievedPlans.length === 0) {
          // TODO: Modularize creating courses into its own common function
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
                      props.setNewPlan(props.newPlan + 1);
                    }
                  });
              });
            });
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, props.newPlan, planList.length]);

  // Handles onClick for when a dropdown option is selected
  const handlePlanChange = (event: any) => {
    const selectedOption = event.target.value;
    const planListClone = [...planList];
    if (selectedOption === "new plan") {
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
                  props.setNewPlan(props.newPlan + 1);
                }
              });
          });
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
    if (user.plan_ids.length === 0 && user._id !== "") {
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
                  props.setNewPlan(props.newPlan + 1);
                }
              });
          });
        });
    }
  });

  // Makes plan dropdown options
  const [dropdownOptions, setdropdownOptions] = useState<any>([]);
  useEffect(() => {
    let id = 0;
    // const sortedPlanList: Plan[] = planList
    //   .slice()
    //   .sort((plan1, plan2) => plan1._id.localeCompare(plan2._id));
    const options = planList.map((plan) => (
      <option key={id++} value={plan._id}>
        {plan.name}
      </option>
    ));

    setdropdownOptions(
      <select
        className={props.className}
        value={
          currentPlan.name === "" ? "Create a new plan +" : currentPlan.name
        }
        onChange={handlePlanChange}
      >
        {options}
        <option value="new plan">Create a plan +</option>
      </select>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planList, currentPlan]);

  return <>{dropdownOptions}</>;
};

export default PlanChoose;
