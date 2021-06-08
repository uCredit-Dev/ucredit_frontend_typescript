import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../components/../resources/redux_sample/counterSlice";
import userReducer from "../slices/userSlice";
import searchReducer from "../slices/searchSlice";
import currentPlanReducer from "../slices/currentPlanSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    search: searchReducer,
    currentPlan: currentPlanReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
