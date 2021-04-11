import { Course } from "./commonTypes";
import {Plan, Distribution, User} from "./commonTypes";
import { testMajorCSNew } from "./testObjs";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  updateSelectedPlan,
  updatePlanList,
  selectUser,
  selectPlan,
  selectPlanList,
} from "./slices/userSlice";

const api = "https://ucredit-api.herokuapp.com/api";


// import { useDispatch, useSelector } from "react-redux";
// import {
//   updateSelectedPlan,
//   updatePlanList
// } from "./slices/userSlice";

interface DistributionColors {
  total: string[];
  naturalSciences: string[];
  humanities: string[];
  computerScience: string[];
  mathematics: string[];
  general: string[];
}

const DistributionColorsArray: DistributionColors = {
  total: ["#001B87", "#30E7ED", "#0058B3"],
  naturalSciences: ["#26D701", "#95F985", "#4DED30"],
  humanities: ["#E56AB3", "#FCBCD7", "#EF87BE"],
  computerScience: ["#DC1C13", "#F1959B", "#EA4C46"],
  mathematics: ["orange", "yellow", "gold"],
  general: ["#00A6D7", "#86FAF2", "#30E7ED"],
};

export const getColors = function (distribution: string): string[] | undefined {
  if (distribution === "Total Credits") {
    return DistributionColorsArray.total;
  } else if (distribution === "Natural Sciences") {
    return DistributionColorsArray.naturalSciences;
  } else if (distribution === "Computer Science") {
    return DistributionColorsArray.computerScience;
  } else if (distribution === "Humanities") {
    return DistributionColorsArray.humanities;
  } else if (distribution === "Mathematics") {
    return DistributionColorsArray.mathematics;
  } else if (distribution === "General Electives") {
    return DistributionColorsArray.general;
  }

  return undefined;
};

export const getCourses = (courseIds: string[]): Course[] => {
  const retrieved: Course[] = [];
  courseIds.forEach((id) => {
    // retrieve courses
    // if (id === testCourseFall._id) {
    //   retrieved.push(testCourseFall);
    // } else if (id === testCourseSpring._id) {
    //   retrieved.push(testCourseSpring);
    // }
  });

  return retrieved;
};

type generateNewPlanProps = {
  // className?: string;
  // newPlan: number;
  // setNewPlan: Function;
};

export const GenerateNewPlan: React.FC<generateNewPlanProps> = async (user: User, retrievedPlans: Plan[], props) => {
// export const GenerateNewPlan: React.FC<generateNewPlanProps> = async (user: User, retrievedPlans: Plan[], props): Promise<any> => {
    // Redux setup
    const dispatch = useDispatch();

  const planBody = {
    name: "Unnamed Plan",
    user_id: user._id,
    majors: [testMajorCSNew],
  };
  const data = await axios
    .post(api + "/plans", planBody);
  const newRetrievedPlan = data.data.data;
  testMajorCSNew.generalDistributions.forEach(
    (distr: any, index: number) => {
      axios
        .post(api + "/distributions", {
          name: distr.name,
          required: distr.required,
          user_id: user._id,
          plan_id: newRetrievedPlan._id,
        })
        .then((newDistr: { data: { data: Distribution; }; }) => {
          newRetrievedPlan.distribution_ids = [
            ...newRetrievedPlan.distribution_ids,
            newDistr.data.data._id,
          ];
        }).then(() => {
          if (index ===
            testMajorCSNew.generalDistributions.length - 1) {
            dispatch(updateSelectedPlan(newRetrievedPlan));
            dispatch(updatePlanList(retrievedPlans));
            props.setNewPlan(props.newPlan + 1);
          }
        });
    }
    // .then(() => {
    //   if (
    //     index ===
    //     testMajorCSNew.generalDistributions.length - 1
    //   ) {
    //     dispatch(updateSelectedPlan(newRetrievedPlan));
    //     dispatch(updatePlanList(retrievedPlans));
    //     props.setNewPlan(props.newPlan + 1);
    //   }
    // });
    //     }
  );
}
