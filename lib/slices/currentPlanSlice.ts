import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../appStore/store';
import {
  DroppableType,
  Plan,
  UserCourse,
} from '../components/../resources/commonTypes';
import { requirements } from '../components/dashboard/degree-info/distributionFunctions';

type CurrentPlanSlice = {
  plan: Plan;
  distributions: [string, requirements[]][];
  currentPlanCourses: UserCourse[];
  totalCredits: number;
  droppables: DroppableType[];
  importing: boolean;
};

const initialState: CurrentPlanSlice = {
  plan: {
    _id: 'noPlan',
    name: '',
    majors: [],
    distribution_ids: [],
    user_id: '',
    years: [],
    numYears: 0,
    reviewers: [],
  },
  distributions: [],
  currentPlanCourses: [],
  totalCredits: 0,
  droppables: [],
  importing: false,
};

export const currentPlanSlice = createSlice({
  name: 'currentPlan',
  initialState,
  reducers: {
    updateSelectedPlan: (state: any, action: PayloadAction<Plan>) => {
      state.plan = { ...action.payload };
    },
    updateDistributions: (
      state: any,
      action: PayloadAction<[string, requirements[]][]>,
    ) => {
      state.distributions = [...action.payload];
    },
    updateCurrentPlanCourses: (
      state: any,
      action: PayloadAction<UserCourse[]>,
    ) => {
      state.currentPlanCourses = action.payload;
    },
    updateTotalCredits: (state: any, action: PayloadAction<number>) => {
      state.totalCredits = action.payload;
    },
    resetCurrentPlan: (state: any) => {
      state.plan = initialState.plan;
      state.distributions = initialState.distributions;
      state.currentPlanCourses = initialState.currentPlanCourses;
    },
    updateDroppables: (state: any, action: PayloadAction<DroppableType>) => {
      let found = false;
      state.droppables.forEach((droppable: DroppableType, index: number) => {
        if (
          droppable.year === action.payload.year &&
          droppable.semester === action.payload.semester
        ) {
          state.droppables[index] = action.payload;
          found = true;
        }
      });
      if (!found) {
        state.droppables.push(action.payload);
      }
    },
    updateImportingStatus: (state: any, action: PayloadAction<boolean>) => {
      state.importing = action.payload;
    },
  },
});

export const {
  updateSelectedPlan,
  updateDistributions,
  updateCurrentPlanCourses,
  updateTotalCredits,
  updateDroppables,
  resetCurrentPlan,
  updateImportingStatus,
} = currentPlanSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Please make a selector for each state :)
export const selectPlan = (state: RootState) => state.currentPlan.plan;
export const selectDistributions = (state: RootState) =>
  state.currentPlan.distributions;
export const selectCurrentPlanCourses = (state: RootState) =>
  state.currentPlan.currentPlanCourses;
export const selectTotalCredits = (state: RootState) =>
  state.currentPlan.totalCredits;
export const selectDroppables = (state: RootState) =>
  state.currentPlan.droppables;
export const selectImportingStatus = (state: RootState) =>
  state.currentPlan.importing;

export default currentPlanSlice.reducer;
