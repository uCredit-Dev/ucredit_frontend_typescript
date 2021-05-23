import React, { useEffect } from 'react'
import axios from "axios"
import { useDispatch, useSelector } from "react-redux";
import { Plan, Distribution } from "./commonTypes";
import {
  updateSelectedPlan,
  updatePlanList,
  selectUser,
  selectPlanList,
  updateGuestPlanIds,
} from "./slices/userSlice";
import { testMajorCSNew } from "./testObjs";

const api = "https://ucredit-api.herokuapp.com/api";

type generateNewPlanProps = {
  //setNewPlan: Function;
  generateNew: boolean;
  setGenerateNewFalse: Function;
  _id?: String;
  currentPlan?: Plan;
};

const GenerateNewPlan: React.FC<generateNewPlanProps> = (props) => {
  const dispatch = useDispatch();

  const user = useSelector(selectUser)
  const planList = useSelector(selectPlanList);

  //const [generateNew, setGenerateNew] = useState<boolean>(props.generateNew);

  useEffect(() => {
    if (props.generateNew === false) return;

    const planBody = {
      name: "Unnamed Plan",
      user_id: user._id,
      majors: [testMajorCSNew.name],
    };

    let newPlan : Plan;
    axios
      .post(api + "/plans", planBody)
      .then((response : any) => {
        newPlan = response.data.data;
        //const newRetrievedPlan = data.data.data;
        testMajorCSNew.generalDistributions.forEach(
          (distr: any, index: number) => {
            axios
              .post(api + "/distributions", {
                name: distr.name,
                required: distr.required,
                user_id: user._id,
                plan_id: newPlan._id,
              })
              .then((newDistr: { data: { data: Distribution; }; }) => {
                newPlan = {
                  ...newPlan,
                  distribution_ids: [
                    ...newPlan.distribution_ids,
                    newDistr.data.data._id,
                  ],
                };
              })
              .then(() => {
                if (index === testMajorCSNew.generalDistributions.length - 1) {
                  dispatch(updateSelectedPlan(newPlan));
                  if (props._id == null || props.currentPlan == null) {
                    dispatch(updatePlanList([newPlan, ...planList]));
                    props.setGenerateNewFalse();
                  } else {
                    if (user._id === "guestUser") {
                      let updatedList = [...planList]; // TODO: Once user routes are figured out, pull user info from db.
                      updatedList = updatedList.filter((plan) => {
                        if (props.currentPlan == undefined) return false;
                        return plan._id !== props.currentPlan._id;
                      });
                      const planIdArray = [newPlan._id];
                      dispatch(updateGuestPlanIds(planIdArray));
                      dispatch(
                        updatePlanList([newPlan, ...updatedList])
                      );
                    }
                  }
                }
              });
          }
        )
      })
      .catch((e) => {
        console.log(e);
      });
  }, [props.generateNew]);


  return (
    <div>
    </div>
  )
}

export default GenerateNewPlan
