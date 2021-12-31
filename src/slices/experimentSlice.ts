import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../appStore/store';

type ExperimentSlice = {
  name: string,
  active: boolean
}

const initialState: ExperimentSlice = {
  name: "", 
  active: false
}

export const experimentSlice = createSlice({
  name: "experiments",
  initialState,
  reducers: {
    updateExperimentName: (state: any, action: PayloadAction<string>) => {
      state.name = action.payload;
    }, // the following reducers all do similar things, will cut down which ones to use when further implemented
    enableExperiment: (state: any) => {
      state.active = true;
    },
    disableExperiment: (state: any) => {
      state.active = false;
    },
    toggleExperiment: (state: any) => {
      state.active = !state.active;
    },
    setExperimentActivity: (state: any, action: PayloadAction<boolean>) => {
      state.active = action.payload;
    }
  }
});

export const {
  updateExperimentName,
  enableExperiment,
  disableExperiment,
  toggleExperiment,
  setExperimentActivity,
} = experimentSlice.actions;

// Selector Functions
export const selectExperimentName = (state: RootState) => state.experiment.name;
export const selectExperimentActivity = (state: RootState) => state.experiment.active;

export default experimentSlice.reducer;