import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../appStore/store';

export type experiment = {
  name: string,
  active: boolean
}

type ExperimentSlice = {
  experimentList: experiment[],
}

const initialState: ExperimentSlice = {
  experimentList: [
    { name: "Red Button", active: false },
    { name: "Green Button", active: false},
    { name: "Blue Button", active: false},
  ],
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
    }
  }
});

export const {
  setExperimentStatus,
  toggleExperimentStatus
} = experimentSlice.actions;

// Selector Functions
export const selectExperimentList = (state: RootState) => state.experiment.experimentList;
export default experimentSlice.reducer;