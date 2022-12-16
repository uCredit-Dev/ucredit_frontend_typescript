import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../appStore/store';
import {
  CommentType,
  DroppableType,
  Major,
  Plan,
  ThreadType,
  UserCourse,
} from '../components/../resources/commonTypes';
import { requirements } from '../components/dashboard/degree-info/distributionFunctions';
import { getMajorFromCommonName } from '../resources/majors';

type CurrentPlanSlice = {
  plan: Plan;
  distributions: [string, requirements[]][];
  currentPlanCourses: UserCourse[];
  totalCredits: number;
  droppables: DroppableType[];
  importing: boolean;
  threads: any;
  filteredThreads: any;
  reviewedPlan: Plan | null;
  selectedThread: string | null;
  selectedMajor: Major | null;
  selectedDistribution: [string, requirements[]];
};

export const initialPlan = {
  _id: 'noPlan',
  name: '',
  majors: [],
  distribution_ids: [],
  user_id: '',
  years: [],
  numYears: 0,
  reviewers: [],
};

const initialState: CurrentPlanSlice = {
  plan: initialPlan,
  distributions: [],
  currentPlanCourses: [],
  totalCredits: 0,
  droppables: [],
  importing: false,
  threads: {},
  filteredThreads: {},
  reviewedPlan: null,
  selectedThread: null,
  selectedMajor: null,
  selectedDistribution: ['', []],
};

export const currentPlanSlice = createSlice({
  name: 'currentPlan',
  initialState,
  reducers: {
    updateSelectedPlan: (state: any, action: PayloadAction<Plan>) => {
      if (!action.payload || action.payload._id === 'noPlan') return;
      state.plan = { ...action.payload };
      const majorObj: Major | null =
        action.payload.majors.length > 0
          ? getMajorFromCommonName(action.payload.majors[0])
          : null;
      if (majorObj) state.selectedMajor = majorObj;
    },
    updateDistributions: (
      state: any,
      action: PayloadAction<[string, requirements[]][]>,
    ) => {
      state.distributions = [...action.payload];
      if (state.selectedDistribution)
        for (let distr of action.payload) {
          if (distr[0] === state.selectedDistribution[0]) {
            state.selectedDistribution = [...distr];
            break;
          }
        }
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
    updateThreads: (state: any, action: PayloadAction<ThreadType[]>) => {
      state.threads = {};
      for (const t of Array.from(action.payload)) {
        state.threads[t.location_type + ' ' + t.location_id] = t;
        state.filteredThreads[t.location_type + ' ' + t.location_id] = t;
      }
    },
    updateFilteredThreads: (state: any, action: any) => {
      state.filteredThreads = {};
      for (const [key, value] of action.payload) {
        state.filteredThreads[key] = value;
      }
    },
    updateReviewedPlan: (state: any, action: PayloadAction<Plan>) => {
      state.reviewedPlan = { ...action.payload };
    },
    updateCurrentComment: (
      state: any,
      action: PayloadAction<[CommentType, string]>,
    ) => {
      let thread: ThreadType = state.threads[action.payload[1]];
      let filteredThread: ThreadType = state.filteredThreads[action.payload[1]];
      thread.comments.push(action.payload[0]);
      filteredThread.comments.push(action.payload[0]);
    },
    updateSelectedThread: (state: any, action: PayloadAction<String>) => {
      state.selectedThread = action.payload;
    },
    updateSelectedMajor: (state: any, action: PayloadAction<Major>) => {
      state.selectedMajor = action.payload;
    },
    updateSelectedDistribution: (
      state: any,
      action: PayloadAction<[string, requirements[]]>,
    ) => {
      state.selectedDistribution = action.payload;
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
  updateThreads,
  updateFilteredThreads,
  updateReviewedPlan,
  updateCurrentComment,
  updateSelectedThread,
  updateSelectedMajor,
  updateSelectedDistribution,
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
export const selectThreads = (state: RootState) => state.currentPlan.threads;
export const selectFilteredThreads = (state: RootState) =>
  state.currentPlan.filteredThreads;
export const selectReviewedPlan = (state: RootState) =>
  state.currentPlan.reviewedPlan;
export const selectSelectedThread = (state: RootState) =>
  state.currentPlan.selectedThread;
export const selectSelectedMajor = (state: RootState) =>
  state.currentPlan.selectedMajor;
export const selectSelectedDistribution = (state: RootState) =>
  state.currentPlan.selectedDistribution;

export default currentPlanSlice.reducer;
