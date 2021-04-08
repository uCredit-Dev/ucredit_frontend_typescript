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

type PlanChooseProps = {
  className?: string;
};

const PlanChoose: React.FC<PlanChooseProps> = (props) => {
  const [newPlan, setNewPlan] = useState(0);

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
        console.log("retrieved ", retrieved);
        // const testList = [testPlan1, testPlan2, ...retrievedPlans];
        console.log("plans are ", retrievedPlans);
        dispatch(updatePlanList(retrievedPlans));
        // dispatch(updatePlanList(testList));
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
    const options = planList.map((plan) => (
      <option key={id++} value={plan.name}>
        {plan.name}
      </option>
    ));
    console.log("setting");
    setdropdownOptions(options);
  }, [planList, currentPlan]);

  // Handles onClick for when a dropdown option is selected
  const handlePlanChange = (event: any) => {
    const selectedOption = event.target.value;
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
          console.log(data);
          const testMajor = testMajorCS;
          const newRetrievedPlan = data.data.data;
          testMajor.generalDistributions.forEach((distr, index) => {
            axios
              .post(api + "/distributions", {
                name: distr,
                required: 1,
                user_id: user._id,
                plan_id: newRetrievedPlan._id,
              })
              .then((newDistr: { data: { data: Distribution } }) => {
                const newDistributionID = newDistr.data.data._id;
                newRetrievedPlan.distribution_ids.push(newDistributionID);
              })
              .then(() => {
                if (index === testMajor.generalDistributions.length - 1) {
                  console.log("retrievedJson is ", newRetrievedPlan);
                  dispatch(updateSelectedPlan(newRetrievedPlan));
                  setNewPlan(newPlan + 1);
                }
              });
          });
          // return data;
        });
      // .then((data: { data: { data: Plan } }) => {
      //   console.log("retrievedJson is ", data.data.data);
      //   dispatch(updateSelectedPlan(data.data.data));
      //   setNewPlan(newPlan + 1);
      // });
      console.log("create new plan");
    } else {
      let newSelected: Plan = currentPlan;
      planList.forEach((plan) => {
        if (plan.name === event.target.value) {
          newSelected = plan;
        }
      });
      dispatch(updateSelectedPlan(newSelected));
    }
  };

  useEffect(() => {
    if (user.plan_ids.length === 0 && user._id !== "") {
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
          setNewPlan(newPlan + 1);
        });
      });
    }
  });

  return (
    <select
      className={props.className}
      value={currentPlan.name === "" ? "Create a new plan +" : currentPlan.name}
      onChange={handlePlanChange}
      defaultValue={currentPlan.name}
    >
      {dropdownOptions}
      <option value="new plan">Create a plan +</option>
    </select>
  );
};

export default PlanChoose;
