import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../appStore/store";
import {
  Major,
  Plan,
  SISRetrievedCourse,
  User,
  Year,
} from "../components/../resources/commonTypes";

type UserSlice = {
  currentUser: User;
  planList: Plan[];
  deleting: boolean;
  addingPlan: boolean;
  toAddName: string;
  toAddMajor: Major | null;
  generateAdd: boolean;
  deleteYear: boolean;
  allCourses: SISRetrievedCourse[];
  yearToDelete: Year | null;
};

const initialState: UserSlice = {
  currentUser: {
    _id: "noUser",
    name: "",
    email: "",
    affiliation: "",
    grade: "",
    school: "",
    plan_ids: ["no plan"],
  },
  planList: [],
  deleting: false,
  addingPlan: false,
  generateAdd: false,
  deleteYear: false,
  toAddName: "Unnamed Plan",
  toAddMajor: null,
  allCourses: [],
  yearToDelete: null,
};

// Updates all user info from database. This function should be called after an axios get on the user routes.
function userUpdate(state: any, action: PayloadAction<User>) {
  state.currentUser._id = action.payload._id;
  state.currentUser.name = action.payload.name;
  state.currentUser.email = action.payload.email;
  state.currentUser.grade = action.payload.grade;
  state.currentUser.school = action.payload.school;
  state.currentUser.affiliation = action.payload.affiliation;
  state.currentUser.plan_ids = action.payload.plan_ids;
}

// Not being used as we can update database when user adds course, and call the reusable update user function for any updates to display
// function addNewCourse(state: any, action: PayloadAction<NewCourse>) {}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateDeletePlanStatus: (state: any, action: PayloadAction<boolean>) => {
      state.deleting = action.payload;
    },
    updateUser: userUpdate,
    updatePlanList: (state: any, action: PayloadAction<Plan[]>) => {
      state.planList = [...action.payload];
    },
    updateGuestPlanIds: (state: any, action: PayloadAction<string[]>) => {
      state.currentUser.plan_ids = action.payload;
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
    updateAllCourses: (
      state: any,
      action: PayloadAction<SISRetrievedCourse[]>
    ) => {
      state.allCourses = action.payload;
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
    resetUser: (state: any) => {
      state.currentUser = initialState.currentUser;
      state.planList = initialState.planList;
    },
  },
});

export const {
  updateDeletePlanStatus,
  updateUser,
  updatePlanList,
  updateGuestPlanIds,
  updateAddingPlanStatus,
  updateToAddName,
  updateToAddMajor,
  updateAllCourses,
  updateGeneratePlanAddStatus,
  updateYearToDelete,
  updateDeleteYearStatus,
  resetUser,
  clearToAdd,
} = userSlice.actions;

// Asynch login with thunk.
export const loginAsync =
  (user: Promise<User>): AppThunk =>
  (dispatch) => {
    user.then((retrieved: User) => {
      dispatch(updateUser(retrieved));
    });
  };

// The function below is called a selector and allows us to select a value from
// the state. Please make a selector for each state :)
export const selectUser = (state: RootState) => state.user.currentUser;
export const selectPlanList = (state: RootState) => state.user.planList;
export const selectDeletePlanStatus = (state: RootState) => state.user.deleting;
export const selectAddingPlanStatus = (state: RootState) =>
  state.user.addingPlan;
export const selectToAddName = (state: RootState) => state.user.toAddName;
export const selectToAddMajor = (state: RootState) => state.user.toAddMajor;
export const selectAllCourses = (state: RootState) => state.user.allCourses;
export const selectGeneratePlanAddStatus = (state: RootState) =>
  state.user.generateAdd;
export const selectDeleteYearStatus = (state: RootState) =>
  state.user.deleteYear;
export const selectYearToDelete = (state: RootState) => state.user.yearToDelete;

export default userSlice.reducer;
