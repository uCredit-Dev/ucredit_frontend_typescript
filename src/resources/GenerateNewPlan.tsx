import { FC, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { DistributionObj, Plan } from "./commonTypes";
import {
  updatePlanList,
  selectUser,
  selectPlanList,
  updateGuestPlanIds,
} from "../slices/userSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  selectImportingStatus,
  updateSelectedPlan,
} from "../slices/currentPlanSlice";
import { api } from "./assets";
import { updateSearchTime } from "../slices/searchSlice";
import {
  selectToAddName,
  selectToAddMajor,
  selectGeneratePlanAddStatus,
  clearToAdd,
  updateGeneratePlanAddStatus,
} from "../slices/popupSlice";

/**
 * Reusable component that generates a new empty plan.
 */
const GenerateNewPlan: FC = () => {
  // Redux setup
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const planList = useSelector(selectPlanList);
  const toAddName = useSelector(selectToAddName);
  const toAddMajor = useSelector(selectToAddMajor);
  const generatePlanAddStatus = useSelector(selectGeneratePlanAddStatus);
  const importing = useSelector(selectImportingStatus);

  // UseEffect that generates a new plan everytime generateNew is true.
  useEffect(() => {
    if (generatePlanAddStatus === false || toAddMajor === null) return;
    const planBody = {
      name: "Unnamed Plan",
      user_id: user._id,
      majors: [toAddMajor.degree_name],
      year: user.grade,
      expireAt:
        user._id === "guestUser" ? Date.now() + 60 * 60 * 24 * 1000 : undefined,
    };

    planBody.name = toAddName === planBody.name ? planBody.name : toAddName;

    let newPlan: Plan;
    const getData = async () => {
      let response = await axios.post(api + "/plans", planBody);
      const newPlanResponse = response.data.data;
      let resp = await axios.get(api + "/years/" + newPlanResponse._id);
      newPlan = { ...newPlanResponse, years: resp.data.data };
      dispatch(
        updateSearchTime({
          searchSemester: "Fall",
          searchYear: newPlan.years[0]._id,
        })
      );
      // Make a new distribution for each distribution of the major of the plan.
      toAddMajor.distributions.forEach(
        async (distr: DistributionObj, index: number) => {
          const distributionBody = getDistributionBody(
            distr.name,
            user._id,
            newPlan._id
          );
          let newDistr = await axios.post(
            api + "/distributions",
            distributionBody
          );
          newPlan = {
            ...newPlan,
            distribution_ids: [
              ...newPlan.distribution_ids,
              newDistr.data.data._id,
            ],
          };
          // After making our last distribution, we update our redux stores.
          if (index === toAddMajor.distributions.length - 1) {
            dispatch(updateSelectedPlan(newPlan));
            dispatch(updatePlanList([newPlan, ...planList]));
            if (!importing) {
              toast.success(newPlan.name + " created!");
            }
            if (user._id === "guestUser") {
              const planIdArray = [newPlan._id];
              dispatch(updateGuestPlanIds(planIdArray));
            }
            dispatch(clearToAdd());
            dispatch(updateGeneratePlanAddStatus(false));
          }
        }
      );
    };
    getData().catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generatePlanAddStatus]);
  return <div></div>;
};

const getDistributionBody = (
  distrName: string,
  userID: string,
  planID: string
): object => {
  return {
    name: distrName,
    required: true,
    user_id: userID,
    plan_id: planID,
    filter: "",
    expireAt:
      userID === "guestUser" ? Date.now() + 60 * 60 * 24 * 1000 : undefined,
  };
};

export default GenerateNewPlan;
