import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../appStore/store';

export type experiment = {
  _id: string;
  name: string;
  active: boolean;
  percentParticipating: number;
  blacklist: string[];
};

type ExperimentSlice = {
  experimentList: experiment[];
  experimentIDs: string[];
  whitelist: experiment;
};

const initialState: ExperimentSlice = {
  experimentList: [],
  experimentIDs: [],
  whitelist: {
    _id: 'No ID',
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
        const idx = state.experimentIDs.indexOf(action.payload);
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
      let newExperimentIDs: string[] = [];
      for (const exp of action.payload) {
        const currExperiment: experiment = {
          _id: exp._id,
          name: exp.experimentName,
          active: false,
          percentParticipating: exp.percent_participating,
          blacklist: exp.blacklist,
        };
        newExperimentList = [...newExperimentList, currExperiment];
        newExperimentIDs = [...newExperimentIDs, exp._id];
      }
      state.experimentList = newExperimentList;
      state.experimentIDs = newExperimentIDs;
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
export const selectExperimentIDs = (state: RootState) =>
  state.experiment.experimentIDs;
export const selectWhiteList = (state: RootState) => state.experiment.whitelist;
export const selectBlueButton = (state: RootState) => {
  const blueButtonID = '61e0b1d5648bba005539dde2';
  const blueButtonIdx = state.experiment.experimentIDs.indexOf(blueButtonID);
  return state.experiment.experimentList.length > 0 && blueButtonIdx !== -1
    ? state.experiment.experimentList[
        state.experiment.experimentIDs.indexOf(blueButtonID)
      ]
    : null;
};
export default experimentSlice.reducer;
