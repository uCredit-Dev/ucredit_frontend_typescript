import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../appStore/store";
import { Plan, User } from "../commonTypes";

// addNewCourse payload type. Not being used.
// type NewCourse = {
//   toAdd: Course;
//   Semester: SemesterType;
//   Year: YearType;
//   Plan: Plan;
// };

type UserSlice = {
  currentUser: User;
  currentPlan: Plan;
};

const initialState: UserSlice = {
  currentUser: {
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    affiliation: "",
    grade: "",
    school: "",
    plan_ids: [],
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
    updateUser: userUpdate,
    updateSelectedPlan: (state: any, action: PayloadAction<Plan>) => {
      state.currentPlan = action.payload;
    },
    // addCourse: addNewCourse,
  },
});

export const { updateUser, updateSelectedPlan } = userSlice.actions;

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

export default userSlice.reducer;
