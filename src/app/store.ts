import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../redux_sample/counterSlice';
import userReducer from '../components/slices/userSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
