import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../appStore/store';
import {
  Major,
  UserCourse,
  Year,
} from '../components/../resources/commonTypes';

type PopupSlice = {
  deletePlan: boolean;
  addPlan: boolean;
  toAddName: string;
  toAddMajors: Major[];
  generateAdd: boolean;
  deleteYear: boolean;
  yearToDelete: Year | null;
  deleteCourse: boolean;
  courseToDelete: { course: UserCourse; year: number } | null;
  showCourseInfo: boolean;
  courseToShow: UserCourse | null;
  addingPrereq: boolean;
};

const initialState: PopupSlice = {
  yearToDelete: null,
  deletePlan: false,
  addPlan: false,
  generateAdd: false,
  deleteYear: false,
  toAddName: 'Unnamed Plan',
  toAddMajors: [],
  deleteCourse: false,
  courseToDelete: null,
  showCourseInfo: false,
  courseToShow: null,
  addingPrereq: false,
};

export const popupSlice = createSlice({
  name: 'currentPlan',
  initialState,
  reducers: {
    updateGeneratePlanAddStatus: (
      state: any,
      action: PayloadAction<boolean>,
    ) => {
      state.generateAdd = action.payload;
    },
    updateDeleteYearStatus: (state: any, action: PayloadAction<boolean>) => {
      state.deleteYear = action.payload;
    },
    updateYearToDelete: (state: any, action: PayloadAction<Year | null>) => {
      state.yearToDelete = action.payload;
    },
    clearToAdd: (state) => {
      state.toAddName = initialState.toAddName;
      state.toAddMajors = initialState.toAddMajors;
    },
    updateAddingPlanStatus: (state: any, action: PayloadAction<boolean>) => {
      state.addPlan = action.payload;
    },
    updateToAddName: (state: any, action: PayloadAction<string>) => {
      state.toAddName = action.payload;
    },
    updateToAddMajors: (state, action: PayloadAction<Major[]>) => {
      state.toAddMajors = action.payload;
    },
    updateDeletePlanStatus: (state: any, action: PayloadAction<boolean>) => {
      state.deletePlan = action.payload;
    },
    updateDeleteCourseStatus: (state: any, action: PayloadAction<boolean>) => {
      state.deleteCourse = action.payload;
    },
    updateCourseToDelete: (
      state: any,
      action: PayloadAction<{ course: UserCourse; year: Year } | null>,
    ) => {
      state.courseToDelete = action.payload;
    },
    updateShowCourseInfo: (state: any, action: PayloadAction<boolean>) => {
      state.showCourseInfo = action.payload;
    },
    updateCourseToShow: (
      state: any,
      action: PayloadAction<UserCourse | null>,
    ) => {
      state.courseToShow = action.payload;
    },
    updateAddingPrereq: (state: any, action: PayloadAction<boolean>) => {
      state.addingPrereq = action.payload;
    },
  },
});

export const {
  updateAddingPlanStatus,
  updateToAddName,
  updateToAddMajors,
  updateGeneratePlanAddStatus,
  updateYearToDelete,
  updateDeleteYearStatus,
  clearToAdd,
  updateDeletePlanStatus,
  updateCourseToDelete,
  updateDeleteCourseStatus,
  updateShowCourseInfo,
  updateCourseToShow,
  updateAddingPrereq,
} = popupSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Please make a selector for each state :)
export const selectGeneratePlanAddStatus = (state: RootState) =>
  state.popup.generateAdd;
export const selectDeleteYearStatus = (state: RootState) =>
  state.popup.deleteYear;
export const selectYearToDelete = (state: RootState) =>
  state.popup.yearToDelete;
export const selectDeletePlanStatus = (state: RootState) =>
  state.popup.deletePlan;
export const selectAddingPlanStatus = (state: RootState) => state.popup.addPlan;
export const selectToAddName = (state: RootState) => state.popup.toAddName;
export const selectToAddMajors = (state: RootState) => state.popup.toAddMajors;
export const selectCourseToDelete = (state: RootState) =>
  state.popup.courseToDelete;
export const selectDeleteCourseStatus = (state: RootState) =>
  state.popup.deleteCourse;
export const selectShowCourseInfo = (state: RootState) =>
  state.popup.showCourseInfo;
export const selectCourseToShow = (state: RootState) =>
  state.popup.courseToShow;
export const selectAddingPrereq = (state: RootState) =>
  state.popup.addingPrereq;

export default popupSlice.reducer;
