import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../appStore/store';
import { SemesterType } from '../commonTypes';

type timeBundle = {
  searchYear: number;
  searchSemester: SemesterType;
};

type searchStates = {
  searching: boolean;
  searchTerm: string;
  searchTime: timeBundle;
};

const initialState: searchStates = {
  searching: false,
  searchTerm: '',
  searchTime: {
    searchYear: 1,
    searchSemester: 'Fall',
  },
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    updateSearchTime: (state: any, action: PayloadAction<timeBundle>) => {
      state.searchTime.searchYear = action.payload.searchYear;
      state.searchTime.searchSemester = action.payload.searchSemester;
    },
    updateSearchTerm: (state: any, action: PayloadAction<String>) => {
      state.searchTerm = action.payload;
    },
    updateSearchStatus: (state: any, action: PayloadAction<boolean>) => {
      state.searching = action.payload;
    },
  },
});

export const {
  updateSearchTime,
  updateSearchTerm,
  updateSearchStatus,
} = searchSlice.actions;

// Asynch search with thunk.
export const searchAsync = (param: any): AppThunk => (dispatch) => {
  // async action here
};

// The function below is called a selector and allows us to select a value from
// the state. Please make a selector for each state :)
export const selectYear = (state: RootState) =>
  state.search.searchTime.searchYear;
export const selectSemester = (state: RootState) =>
  state.search.searchTime.searchSemester;
export const selectSearchterm = (state: RootState) => state.search.searchTerm;
export const selectSearchStatus = (state: RootState) => state.search.searching;

export default searchSlice.reducer;
