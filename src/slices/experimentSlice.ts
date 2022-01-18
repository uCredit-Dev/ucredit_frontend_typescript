import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../appStore/store';

export type experiment = {
  name: string;
  active: boolean;
  percentParticipating: number;
  blacklist: string[];
};

type ExperimentSlice = {
  experimentList: experiment[];
  experimentNames: string[];
  whitelist: experiment;
};

const initialState: ExperimentSlice = {
  experimentList: [],
  experimentNames: [],
  whitelist: {
    name: 'White List',
    active: false,
    percentParticipating: 0,
    blacklist: [],
  },
};

export const experimentSlice = createSlice({
  name: 'experiments',
  initialState,
  reducers: {
    setExperimentStatus: (
      state: any,
      action: PayloadAction<[number, boolean]>,
    ) => {
      let tmp = [...state.experimentList];
      tmp[action.payload[0]].active = action.payload[1];
      state.experimentList = tmp;
    },
    toggleExperimentStatus: (state: any, action: PayloadAction<string>) => {
      if (state.experimentList.length > 0) {
        let tmp = [...state.experimentList];
        const idx = state.experimentNames.indexOf(action.payload);
        tmp[idx].active = !tmp[idx].active;
        state.experimentList = tmp;
      }
    },
    setWhitelistStatus: (state: any, action: PayloadAction<boolean>) => {
      state.whitelist.active = action.payload;
    },
    setExperimentPercentage: (
      state: any,
      action: PayloadAction<[number, number]>,
    ) => {
      let tmp = [...state.experimentList];
      tmp[action.payload[0]].percentParticipating = action.payload[1];
      state.experimentList = tmp;
    },
    setExperiments: (state: any, action: PayloadAction<any[]>) => {
      let newExperimentList: experiment[] = [];
      let newExperimentNames: string[] = [];
      for (const exp of action.payload) {
        const currExperiment: experiment = {
          name: exp.experimentName,
          active: false,
          percentParticipating: exp.percent_participating,
          blacklist: exp.blacklist,
        };
        newExperimentList = [...newExperimentList, currExperiment];
        newExperimentNames = [...newExperimentNames, exp.experimentName];
      }
      state.experimentList = newExperimentList;
      state.experimentNames = newExperimentNames;
    },
  },
});

export const {
  setExperimentStatus,
  toggleExperimentStatus,
  setWhitelistStatus,
  setExperimentPercentage,
  setExperiments,
} = experimentSlice.actions;

// Selector Functions
export const selectExperimentList = (state: RootState) =>
  state.experiment.experimentList;
export const selectExperimentNames = (state: RootState) =>
  state.experiment.experimentNames;
export const selectWhiteList = (state: RootState) => state.experiment.whitelist;
export default experimentSlice.reducer;
