import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Plan } from "./commonTypes";
import {
  updateSelectedPlan,
  updatePlanList,
  selectUser,
  selectPlanList,
  updateGuestPlanIds,
} from "./slices/userSlice";
import { testMajorCSNew } from "./testObjs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const api = "https://ucredit-api.herokuapp.com/api";

type generateNewPlanProps = {
  generateNew: boolean;
  setGenerateNewFalse: Function;
  _id?: String;
  currentPlan?: Plan;
};

const GenerateNewPlan: React.FC<generateNewPlanProps> = (props) => {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const planList = useSelector(selectPlanList);

  useEffect(() => {
    if (props.generateNew === false) return;

    const planBody = {
      name: "Unnamed Plan",
      user_id: user._id,
      majors: [testMajorCSNew.name],
      createdAt:
        user._id === "guestUser" ? Date.now() + 60 * 60 * 24 * 1000 : null,
    };

    let newPlan: Plan;
    axios
      .post(api + "/plans", planBody)
      .then((response: any) => {
        newPlan = response.data.data;
        testMajorCSNew.distributions.forEach((distr: any, index: number) => {
          const distributionBody = {
            name: distr.name,
            required: distr.required,
            user_id: user._id,
            plan_id: newPlan._id,
            filter: distr.filter,
            createdAt:
              user._id === "guestUser"
                ? Date.now() + 60 * 60 * 24 * 1000
                : null,
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
              if (index === testMajorCSNew.distributions.length - 1) {
                dispatch(updateSelectedPlan(newPlan));
                dispatch(updatePlanList([newPlan, ...planList]));
                props.setGenerateNewFalse();
                toast.success("New Unnamed Plan created!", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
                if (user._id === "guestUser") {
                  const planIdArray = [newPlan._id];
                  dispatch(updateGuestPlanIds(planIdArray));
                }
              }
            });
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }, [props.generateNew]);

  return <div></div>;
};

export default GenerateNewPlan;
