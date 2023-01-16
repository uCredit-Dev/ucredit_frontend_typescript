import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../appStore/store';
import {
  CommentType,
  DroppableType,
  Plan,
  ThreadType,
  UserCourse,
  UserDistribution,
  UserFineReq
} from './../resources/commonTypes';
type CurrentPlanSlice = {
  plan: Plan;
  distributions: UserDistribution[];
  currentPlanCourses: UserCourse[];
  totalCredits: number;
  droppables: DroppableType[];
  importing: boolean;
  threads: any;
  filteredThreads: any;
  reviewedPlan: Plan | null;
  selectedThread: string | null;
  selectedMajor: string | null;
  selectedDistribution: UserDistribution | null;
  selectedFineReq: UserFineReq | null;
};

export const initialPlan = {
  _id: 'noPlan',
  name: '',
  major_ids: [],
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
  selectedDistribution: null,
  selectedFineReq: null
};

export const currentPlanSlice = createSlice({
  name: 'currentPlan',
  initialState,
  reducers: {
    updateSelectedPlan: (state: any, action: PayloadAction<Plan>) => {
      if (!action.payload || action.payload._id === 'noPlan') return;
      state.plan = { ...action.payload };
      const major_id: string | null =
        action.payload.major_ids.length > 0
          ? action.payload.major_ids[0]
          : null;
      if (major_id) state.selectedMajor = major_id;
    },
    updateDistributions: (
      state: any,
      action: PayloadAction<UserDistribution[]>,
    ) => {
      state.distributions = [...action.payload];
      if (state.selectedDistribution)
        for (let distr of action.payload) {
          if (distr[0] === state.selectedDistribution[0]) {
            state.selectedDistribution = distr;
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
    updateSelectedMajor: (state: any, action: PayloadAction<String>) => {
      state.selectedMajor = action.payload;
    },
    updateSelectedDistribution: (
      state: any,
      action: PayloadAction<UserDistribution>,
    ) => {
      state.selectedDistribution = action.payload;
    },
    updateSelectedFineReq: (
      state: any,
      action: PayloadAction<UserFineReq>,
    ) => {
      state.selectedFineReq = action.payload;
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
  updateSelectedFineReq
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
export const selectSelectedFineReq = (state: RootState) =>
  state.currentPlan.selectedFineReq;

export default currentPlanSlice.reducer;
