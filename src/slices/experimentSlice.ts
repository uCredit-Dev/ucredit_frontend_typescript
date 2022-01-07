import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../appStore/store';

export type experiment = {
  name: string,
  active: boolean,
  percentParticipating: number,
}

type ExperimentSlice = {
  red_button: experiment,
  green_button: experiment,
  blue_button: experiment,
  white_list: experiment,
}

const initialState: ExperimentSlice = {
  red_button:   { name: "Red Button", active: false, percentParticipating: 0},
  green_button: { name: "Green Button", active: false, percentParticipating: 0},
  blue_button:  { name: "Blue Button", active: false, percentParticipating: 0},
  white_list:  { name: "White List", active: false, percentParticipating: 0},
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
    setWhiteList: (state: any, action: PayloadAction<boolean>) => {
      state.white_list.active = action.payload;
    },
    setRedButtonPercent: (state: any, action: PayloadAction<number>) => {
      state.red_button.percentParticipating = action.payload;
    },
    setGreenButtonPercent: (state: any, action: PayloadAction<number>) => {
      state.green_button.percentParticipating = action.payload;
    },
    setBlueButtonPercent: (state: any, action: PayloadAction<number>) => {
      state.blue_button.percentParticipating = action.payload;
    },
  }
});

export const {
  setRedButton,
  setGreenButton,
  setBlueButton,
  setWhiteList,
  setRedButtonPercent,
  setGreenButtonPercent,
  setBlueButtonPercent,
} = experimentSlice.actions;

// Selector Functions
export const selectExperiments = (state: RootState) => state.experiment;
export const selectRedButton = (state: RootState) => state.experiment.red_button;
export const selectGreenButton = (state: RootState) => state.experiment.green_button;
export const selectBlueButton = (state: RootState) => state.experiment.blue_button;
export const selectWhiteList = (state: RootState) => state.experiment.white_list;

export default experimentSlice.reducer;