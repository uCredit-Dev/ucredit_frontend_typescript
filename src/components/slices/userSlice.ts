import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../appStore/store";
import { Course, Plan, SemesterType, User, YearType } from "../commonTypes";

// addNewCourse payload type. Not being used.
// type NewCourse = {
//   toAdd: Course;
//   Semester: SemesterType;
//   Year: YearType;
//   Plan: Plan;
// };

const initialState: User = {
  _id: "",
  firstName: "",
  lastName: "",
  email: "",
  affiliation: "",
  grade: "",
  school: "",
  plans: [],
};

// Updates all user info from database. This function should be called after an axios get on the user routes.
function userUpdate(state: any, action: PayloadAction<User>) {
  state._id = action.payload._id;
  state.firstName = action.payload.firstName;
  state.lastName = action.payload.lastName;
  state.email = action.payload.email;
  state.grade = action.payload.grade;
  state.school = action.payload.school;
  state.affiliation = action.payload.affiliation;
  state.plans = action.payload.plans;
}

// Not being used as we can update database when user adds course, and call the reusable update user function for any updates to display
// function addNewCourse(state: any, action: PayloadAction<NewCourse>) {}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: userUpdate,
    // addCourse: addNewCourse,
  },
});

export const { updateUser } = userSlice.actions;

// Asynch login with thunk.
export const loginAsync = (user: Promise<User>): AppThunk => (dispatch) => {
  user.then((retrieved: User) => {
    dispatch(updateUser(retrieved));
  });
};

// The function below is called a selector and allows us to select a value from
// the state. Please make a selector for each state :)
export const selectUser = (state: RootState) => state.user;
export const selectFirstname = (state: RootState) => state.user.firstName;

export default userSlice.reducer;
