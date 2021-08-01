import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../appStore/store";
import {
  Distribution,
  DroppableType,
  Major,
  Plan,
  UserCourse,
  Year,
} from "../components/../resources/commonTypes";

type CurrentPlanSlice = {
  plan: Plan;
  distributions: Distribution[];
  currentPlanCourses: UserCourse[];
  totalCredits: number;
  droppables: DroppableType[];
  deleting: boolean;
  addingPlan: boolean;
  toAddName: string;
  toAddMajor: Major | null;
  generateAdd: boolean;
  deleteYear: boolean;
  yearToDelete: Year | null;
  deleteCourse: boolean;
  courseToDelete: { course: UserCourse; year: number } | null;
  importing: boolean;
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
  totalCredits: 0,
  droppables: [],
  yearToDelete: null,
  deleting: false,
  addingPlan: false,
  generateAdd: false,
  deleteYear: false,
  toAddName: "Unnamed Plan",
  toAddMajor: null,
  deleteCourse: false,
  courseToDelete: null,
  importing: false,
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
      //console.log(action.payload);
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
    updateGeneratePlanAddStatus: (
      state: any,
      action: PayloadAction<boolean>
    ) => {
      state.generateAdd = action.payload;
    },
    updateDeleteYearStatus: (state: any, action: PayloadAction<boolean>) => {
      state.deleteYear = action.payload;
    },
    updateYearToDelete: (state: any, action: PayloadAction<Year | null>) => {
      state.yearToDelete = action.payload;
    },
    clearToAdd: (state: any) => {
      state.toAddName = initialState.toAddName;
      state.toAddMajor = initialState.toAddMajor;
    },
    updateAddingPlanStatus: (state: any, action: PayloadAction<boolean>) => {
      state.addingPlan = action.payload;
    },
    updateToAddName: (state: any, action: PayloadAction<string>) => {
      state.toAddName = action.payload;
    },
    updateToAddMajor: (state: any, action: PayloadAction<Major>) => {
      state.toAddMajor = action.payload;
    },
    updateDeletePlanStatus: (state: any, action: PayloadAction<boolean>) => {
      state.deleting = action.payload;
    },
    updateDeleteCourseStatus: (state: any, action: PayloadAction<boolean>) => {
      state.deleteCourse = action.payload;
    },
    updateCourseToDelete: (
      state: any,
      action: PayloadAction<{ course: UserCourse; year: number } | null>
    ) => {
      state.courseToDelete = action.payload;
    },
    updateImportingStatus: (state: any, action: PayloadAction<boolean>) => {
      state.importing = action.payload;
    }
  },
});

export const {
  updateSelectedPlan,
  updateDistributions,
  updateCurrentPlanCourses,
  updateTotalCredits,
  updateDroppables,
  resetCurrentPlan,
  updateAddingPlanStatus,
  updateToAddName,
  updateToAddMajor,
  updateGeneratePlanAddStatus,
  updateYearToDelete,
  updateDeleteYearStatus,
  clearToAdd,
  updateDeletePlanStatus,
  updateCourseToDelete,
  updateDeleteCourseStatus,
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
export const selectGeneratePlanAddStatus = (state: RootState) =>
  state.currentPlan.generateAdd;
export const selectDeleteYearStatus = (state: RootState) =>
  state.currentPlan.deleteYear;
export const selectYearToDelete = (state: RootState) =>
  state.currentPlan.yearToDelete;
export const selectDeletePlanStatus = (state: RootState) =>
  state.currentPlan.deleting;
export const selectAddingPlanStatus = (state: RootState) =>
  state.currentPlan.addingPlan;
export const selectToAddName = (state: RootState) =>
  state.currentPlan.toAddName;
export const selectToAddMajor = (state: RootState) =>
  state.currentPlan.toAddMajor;
export const selectCourseToDelete = (state: RootState) =>
  state.currentPlan.courseToDelete;
export const selectDeleteCourseStatus = (state: RootState) =>
  state.currentPlan.deleteCourse;
export const selectImportingStatus = (state: RootState) =>
  state.currentPlan.importing;

export default currentPlanSlice.reducer;
