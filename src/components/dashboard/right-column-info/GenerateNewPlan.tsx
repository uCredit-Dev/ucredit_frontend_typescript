import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { DistributionObj, Plan } from "../../../resources/commonTypes";
import {
  updatePlanList,
  selectUser,
  selectPlanList,
  updateGuestPlanIds,
} from "../../../slices/userSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  clearToAdd,
  selectGeneratePlanAddStatus,
  selectToAddMajor,
  selectToAddName,
  updateGeneratePlanAddStatus,
  updateSelectedPlan,
} from "../../../slices/currentPlanSlice";
import { api } from "../../../resources/assets";

type generateNewPlanProps = {
  _id?: String;
};

/**
 * Reusable component that generates a new empty plan.
 * @param _id - id of component
 */
const GenerateNewPlan = (props: generateNewPlanProps) => {
  // Redux setup
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const planList = useSelector(selectPlanList);
  const toAddName = useSelector(selectToAddName);
  const toAddMajor = useSelector(selectToAddMajor);
  const generatePlanAddStatus = useSelector(selectGeneratePlanAddStatus);

  // UseEffect that generates a new plan everytime generateNew is true.
  useEffect(() => {
    if (generatePlanAddStatus === false || toAddMajor === null) return;

    const planBody = {
      name: "Unnamed Plan",
      user_id: user._id,
      majors: [toAddMajor.degree_name],
      expireAt:
        user._id === "guestUser" ? Date.now() + 60 * 60 * 24 * 1000 : undefined,
    };

    if (toAddName !== planBody.name) {
      planBody.name = toAddName;
    }

    let newPlan: Plan;
    axios
      .post(api + "/plans", planBody)
      .then((response: any) => {
        const newPlanResponse = response.data.data;
        axios.get(api + "/years/" + newPlanResponse._id).then((resp) => {
          newPlan = { ...newPlanResponse, years: resp.data.data };
          // Make a new distribution for each distribution of the major of the plan.
          toAddMajor.distributions.forEach(
            (distr: DistributionObj, index: number) => {
              const distributionBody = {
                name: distr.name,
                required: true,
                user_id: user._id,
                plan_id: newPlan._id,
                filter: "",
                expireAt:
                  user._id === "guestUser"
                    ? Date.now() + 60 * 60 * 24 * 1000
                    : undefined,
              };
              axios
                .post(api + "/distributions", distributionBody)
                .then((newDistr: any) => {
                  newPlan = {
                    ...newPlan,
                    distribution_ids: [
                      ...newPlan.distribution_ids,
                      newDistr.data.data._id,
                    ],
                  };
                })
                .then(() => {
                  // After making our last distribution, we update our redux stores.
                  if (index === toAddMajor.distributions.length - 1) {
                    dispatch(updateSelectedPlan(newPlan));
                    dispatch(updatePlanList([newPlan, ...planList]));
                    toast.success(newPlan.name + " created!");
                    if (user._id === "guestUser") {
                      const planIdArray = [newPlan._id];
                      dispatch(updateGuestPlanIds(planIdArray));
                    }
                    dispatch(clearToAdd());
                    dispatch(updateGeneratePlanAddStatus(false));
                  }
                });
            }
          );
        });
      })
      .catch((e) => {
        console.log(e);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generatePlanAddStatus]);

  return <div></div>;
};

export default GenerateNewPlan;
