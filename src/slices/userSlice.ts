import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../appStore/store";
import {
  Plan,
  SISRetrievedCourse,
  User,
} from "../components/../resources/commonTypes";

type UserSlice = {
  currentUser: User;
  planList: Plan[];
  allCourses: SISRetrievedCourse[];
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
  allCourses: [],
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
    updateUser: userUpdate,
    updatePlanList: (state: any, action: PayloadAction<Plan[]>) => {
      state.planList = [...action.payload];
    },
    updateGuestPlanIds: (state: any, action: PayloadAction<string[]>) => {
      state.currentUser.plan_ids = action.payload;
    },
    updateAllCourses: (
      state: any,
      action: PayloadAction<SISRetrievedCourse[]>
    ) => {
      state.allCourses = action.payload;
    },
    resetUser: (state: any) => {
      state.currentUser = initialState.currentUser;
      state.planList = initialState.planList;
    },
  },
});

export const {
  updateUser,
  updatePlanList,
  updateGuestPlanIds,
  updateAllCourses,
  resetUser,
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
export const selectAllCourses = (state: RootState) => state.user.allCourses;

export default userSlice.reducer;
