import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../appStore/store";
import { Distribution, Plan, User, UserCourse } from "../commonTypes";

type UserSlice = {
  currentUser: User;
  currentPlan: Plan;
  planList: Plan[];
  distributions: Distribution[];
  currentPlanCourses: UserCourse[];
  deleting: boolean;
};

const initialState: UserSlice = {
  currentUser: {
    _id: "noUser",
    firstName: "",
    lastName: "",
    email: "",
    affiliation: "",
    grade: "",
    school: "",
    plan_ids: ["no plan"],
  },
  currentPlan: {
    _id: "noPlan",
    name: "",
    majors: [],
    freshman: [],
    sophomore: [],
    junior: [],
    senior: [],
    distribution_ids: [],
    user_id: "",
  },
  planList: [],
  distributions: [],
  currentPlanCourses: [],
  deleting: false,
};

// Updates all user info from database. This function should be called after an axios get on the user routes.
function userUpdate(state: any, action: PayloadAction<User>) {
  state.currentUser._id = action.payload._id;
  state.currentUser.firstName = action.payload.firstName;
  state.currentUser.lastName = action.payload.lastName;
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
    updateDeleteStatus: (state: any, action: PayloadAction<boolean>) => {
      state.deleting = action.payload;
    },
    updateUser: userUpdate,
    updateSelectedPlan: (state: any, action: PayloadAction<Plan>) => {
      state.currentPlan = { ...action.payload };
    },
    updatePlanList: (state: any, action: PayloadAction<Plan[]>) => {
      state.planList = [...action.payload];
    },
    updateDistributions: (
      state: any,
      action: PayloadAction<Distribution[]>
    ) => {
      state.distributions = [...action.payload];
    },
    updateGuestPlanIds: (state: any, action: PayloadAction<string[]>) => {
      state.currentUser.plan_ids = action.payload;
    },
    updateCurrentPlanCourses: (
      state: any,
      action: PayloadAction<UserCourse[]>
    ) => {
      state.currentPlanCourses = action.payload;
    },
  },
});

export const {
  updateDeleteStatus,
  updateUser,
  updateSelectedPlan,
  updatePlanList,
  updateDistributions,
  updateGuestPlanIds,
  updateCurrentPlanCourses,
} = userSlice.actions;

// Asynch login with thunk.
export const loginAsync = (user: Promise<User>): AppThunk => (dispatch) => {
  user.then((retrieved: User) => {
    dispatch(updateUser(retrieved));
  });
};

// The function below is called a selector and allows us to select a value from
// the state. Please make a selector for each state :)
export const selectUser = (state: RootState) => state.user.currentUser;
export const selectPlan = (state: RootState) => state.user.currentPlan;
export const selectPlanList = (state: RootState) => state.user.planList;
export const selectDistributions = (state: RootState) =>
  state.user.distributions;
export const selectCurrentPlanCourses = (state: RootState) =>
  state.user.currentPlanCourses;
export const selectDeleteStatus = (state: RootState) => state.user.deleting;

export default userSlice.reducer;
