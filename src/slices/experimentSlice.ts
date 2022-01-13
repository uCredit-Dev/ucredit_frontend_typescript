import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../appStore/store';

export type experiment = {
  name: string,
  active: boolean,
  percentParticipating: number,
  blacklist: string[]
}

type ExperimentSlice = {
  experimentList: experiment[],
  whitelist: experiment
}

const initialState: ExperimentSlice = {
  experimentList: [
    { name: "Red Button", active: false, percentParticipating: 0, blacklist: []},
    { name: "Green Button", active: false, percentParticipating: 0, blacklist: []},
    { name: "Blue Button", active: false, percentParticipating: 0, blacklist: []},
  ],
  whitelist: { name: "White List", active: false, percentParticipating: 0, blacklist: []},
}

export const experimentSlice = createSlice({
  name: "experiments",
  initialState,
  reducers: {
    setExperimentStatus: (state: any, action: PayloadAction<[number, boolean]>) => {
      let tmp = [...state.experimentList]; 
      tmp[action.payload[0]].active = action.payload[1];
      state.experimentList = tmp;
    },
    toggleExperimentStatus: (state: any, action: PayloadAction<number>) => {
      let tmp = [...state.experimentList];
      tmp[action.payload].active = !tmp[action.payload].active;
      state.experimentList = tmp;
    },
    setWhitelistStatus: (state: any, action: PayloadAction<boolean>) => {
      state.whitelist.active = action.payload;
    },
    setExperimentPercentage: (state: any, action: PayloadAction<[number, number]>) => {
      let tmp = [...state.experimentList];
      tmp[action.payload[0]].percentParticipating = action.payload[1];
      state.experimentList = tmp;
    },
  }
});

export const {
  setExperimentStatus,
  toggleExperimentStatus,
  setWhitelistStatus,
  setExperimentPercentage,
} = experimentSlice.actions;

// Selector Functions
export const selectExperimentList = (state: RootState) => state.experiment.experimentList;
export const selectWhiteList = (state: RootState) => state.experiment.whitelist;
export default experimentSlice.reducer;