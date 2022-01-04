import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../appStore/store';

export type experiment = {
  name: string,
  active: boolean
}

type ExperimentSlice = {
  red_button: experiment,
  green_button: experiment,
  blue_button: experiment,
}

const initialState: ExperimentSlice = {
  red_button:   { name: "Red Button", active: false },
  green_button: { name: "Green Button", active: false},
  blue_button:  { name: "Blue Button", active: false},
}

export const experimentSlice = createSlice({
  name: "experiments",
  initialState,
  reducers: {
    setRedButton: (state: any, action: PayloadAction<boolean>) => {
      state.red_button.active = action.payload;
    },
    setGreenButton: (state: any, action: PayloadAction<boolean>) => {
      state.green_button.active = action.payload;
    },
    setBlueButton: (state: any, action: PayloadAction<boolean>) => {
      state.blue_button.active = action.payload;
    },
  }
});

export const {
  setRedButton,
  setGreenButton,
  setBlueButton,
} = experimentSlice.actions;

// Selector Functions
export const selectExperiments = (state: RootState) => state.experiment;
export const selectRedButton = (state: RootState) => state.experiment.red_button;
export const selectGreenButton = (state: RootState) => state.experiment.green_button;
export const selectBlueButton = (state: RootState) => state.experiment.blue_button;

export default experimentSlice.reducer;