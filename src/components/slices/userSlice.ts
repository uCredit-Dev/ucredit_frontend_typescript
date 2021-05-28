import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../appStore/store";
import { Major, Plan, User } from "../commonTypes";

type UserSlice = {
  currentUser: User;
  planList: Plan[];
  deleting: boolean;
  adding: boolean;
  toAddName: string;
  toAddMajor: Major | null;
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
  adding: false,
  toAddName: "Unnamed Plan",
  toAddMajor: null,
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
    updateDeleteStatus: (state: any, action: PayloadAction<boolean>) => {
      state.deleting = action.payload;
    },
    updateUser: userUpdate,
    updatePlanList: (state: any, action: PayloadAction<Plan[]>) => {
      state.planList = [...action.payload];
    },
    updateGuestPlanIds: (state: any, action: PayloadAction<string[]>) => {
      state.currentUser.plan_ids = action.payload;
    },
    updateAddingStatus: (state: any, action: PayloadAction<boolean>) => {
      state.adding = action.payload;
    },
    updateToAddName: (state: any, action: PayloadAction<string>) => {
      state.toAddName = action.payload;
    },
    updateToAddMajor: (state: any, action: PayloadAction<Major>) => {
      state.toAddMajor = action.payload;
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
  updateDeleteStatus,
  updateUser,
  updatePlanList,
  updateGuestPlanIds,
  updateAddingStatus,
  updateToAddName,
  updateToAddMajor,
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
export const selectDeleteStatus = (state: RootState) => state.user.deleting;
export const selectAddingStatus = (state: RootState) => state.user.adding;
export const selectToAddName = (state: RootState) => state.user.toAddName;
export const selectToAddMajor = (state: RootState) => state.user.toAddMajor;

export default userSlice.reducer;
