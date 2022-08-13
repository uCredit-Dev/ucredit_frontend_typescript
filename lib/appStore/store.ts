import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../components/../resources/redux_sample/counterSlice';
import userReducer from '../slices/userSlice';
import searchReducer from '../slices/searchSlice';
import currentPlanReducer from '../slices/currentPlanSlice';
import popupReducer from '../slices/popupSlice';
import experimentReducer from '../slices/experimentSlice';
import roadmapSearchSlice from '../slices/roadmapSearchSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    search: searchReducer,
    currentPlan: currentPlanReducer,
    popup: popupReducer,
    experiment: experimentReducer,
    roadmapSearch: roadmapSearchSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }), //.concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
