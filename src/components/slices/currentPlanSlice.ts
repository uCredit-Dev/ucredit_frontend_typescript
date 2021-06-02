import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../appStore/store";
import { Distribution, Plan, UserCourse } from "../commonTypes";

type CurrentPlanSlice = {
  plan: Plan;
  distributions: Distribution[];
  currentPlanCourses: UserCourse[];
};

const initialState: CurrentPlanSlice = {
  plan: {
    _id: "noPlan",
    name: "",
    majors: [],
    distribution_ids: [],
    user_id: "",
    years: [],
    numYears: 0,
  },
  distributions: [],
  currentPlanCourses: [],
};

export const currentPlanSlice = createSlice({
  name: "currentPlan",
  initialState,
  reducers: {
    updateSelectedPlan: (state: any, action: PayloadAction<Plan>) => {
      state.plan = { ...action.payload };
    },
    updateDistributions: (
      state: any,
      action: PayloadAction<Distribution[]>
    ) => {
      state.distributions = [...action.payload];
    },
    updateCurrentPlanCourses: (
      state: any,
      action: PayloadAction<UserCourse[]>
    ) => {
      state.currentPlanCourses = action.payload;
    },
    resetCurrentPlan: (state: any) => {
      state.plan = initialState.plan;
      state.distributions = initialState.distributions;
      state.currentPlanCourses = initialState.currentPlanCourses;
    },
  },
});

export const {
  updateSelectedPlan,
  updateDistributions,
  updateCurrentPlanCourses,
  resetCurrentPlan,
} = currentPlanSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Please make a selector for each state :)
export const selectPlan = (state: RootState) => state.currentPlan.plan;
export const selectDistributions = (state: RootState) =>
  state.currentPlan.distributions;
export const selectCurrentPlanCourses = (state: RootState) =>
  state.currentPlan.currentPlanCourses;

export default currentPlanSlice.reducer;
