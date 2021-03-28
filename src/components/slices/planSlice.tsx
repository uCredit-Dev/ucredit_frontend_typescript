import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../appStore/store";
import { Course, Plan, SemesterType, User, YearType } from "../commonTypes";
import { testPlan1 } from "../testObjs";

const initialState = {
  currentPlan: testPlan1,
};

// Not being used as we can update database when user adds course, and call the reusable update user function for any updates to display
// function addNewCourse(state: any, action: PayloadAction<NewCourse>) {}

export const planSlice = createSlice({
  name: "plan",
  initialState,
  reducers: {
    // updatePlan: (state: any, action: PayloadAction<UpdatePackage>) => {
    //   state.currentPlan.
    // },
  },
});

export const {
  /*updatePlan*/
} = planSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Please make a selector for each state :)
export const selectCurrentPlan = (state: RootState) => state.plan.currentPlan;

export default planSlice.reducer;
