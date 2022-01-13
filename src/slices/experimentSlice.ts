import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../appStore/store';

export type experiment = {
  name: string,
  active: boolean,
  percentParticipating: number,
}

type ExperimentSlice = {
  experimentList: experiment[],
  whiteList: experiment
}

const initialState: ExperimentSlice = {
  experimentList: [
    { name: "Red Button", active: false, percentParticipating: 0},
    { name: "Green Button", active: false, percentParticipating: 0},
    { name: "Blue Button", active: false, percentParticipating: 0},
  ],
  whiteList: { name: "White List", active: false, percentParticipating: 0},
}

export const experimentSlice = createSlice({
  name: "experiments",
  initialState,
  reducers: {
    setExperimentStatus: (state: any, action: PayloadAction<[number, boolean]>) => {
      let tmp = [...state.experimentList]; 
      tmp[action.payload[0]].active = action.payload[1];
      state.experimentList = tmp;
      // console.log(action.payload)
    },
    toggleExperimentStatus: (state: any, action: PayloadAction<number>) => {
      let tmp = [...state.experimentList]
      tmp[action.payload].active = !tmp[action.payload].active;
      state.experimentList = tmp;
    },
    setWhiteListStatus: (state: any, action: PayloadAction<boolean>) => {
      state.whiteList.active = action.payload;
    },
    setExperimentPercentage: (state: any, action: PayloadAction<[number, number]>) => {
      let tmp = [...state.experimentList]; 
      tmp[action.payload[0]].percentParticipating = action.payload[1];
      state.experimentList = tmp;
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
  setExperimentStatus,
  toggleExperimentStatus,
  setWhiteListStatus,
  setExperimentPercentage,
} = experimentSlice.actions;

// Selector Functions
export const selectExperimentList = (state: RootState) => state.experiment.experimentList;
export const selectWhiteList = (state: RootState) => state.experiment.whiteList;
export default experimentSlice.reducer;