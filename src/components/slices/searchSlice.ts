import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../appStore/store';
import { SemesterType, Course, YearType } from '../commonTypes';
import { testCourse1, testCourse2 } from '../testObjs';

type timeBundle = {
  searchYear: YearType;
  searchSemester: SemesterType;
};

type filterObj = {
  credits: number | 'None';
  distribution: 'N' | 'S' | 'H' | 'W' | 'E' | 'Q' | 'None';
  tags: string | 'None'; // TODO: fill this out with array of all tags
};

type searchStates = {
  searching: boolean;
  searchMode: 'title' | 'number';
  searchTerm: string;
  searchTime: timeBundle;
  filters: filterObj;
  retrievedCourses: Course[];
  inspectedCourse: Course | 'None';
};

const initialState: searchStates = {
  searching: false,
  searchMode: 'title',
  searchTerm: '',
  searchTime: {
    searchYear: 'Freshman',
    searchSemester: 'Fall',
  },
  retrievedCourses: [testCourse1, testCourse2], // test courses for now
  filters: {
    credits: 'None',
    distribution: 'None',
    tags: 'None',
  },
  inspectedCourse: 'None',
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
    updateSearchMode: (
      state: any,
      action: PayloadAction<'title' | 'number'>
    ) => {
      state.searchMode = action.payload;
    },
    updateSearchCredit: (
      state: any,
      action: PayloadAction<'None' | number>
    ) => {
      state.filters.credits = action.payload;
    },
    updateSearchDistribution: (
      state: any,
      action: PayloadAction<'N' | 'S' | 'H' | 'W' | 'E' | 'Q' | 'None'>
    ) => {
      state.filters.distribution = action.payload;
    },
    updateInspectedCourse: (state: any, action: PayloadAction<Course>) => {
      state.inspectedCourse = action.payload;
    },
  },
});

export const {
  updateSearchTime,
  updateSearchTerm,
  updateSearchStatus,
  updateSearchMode,
  updateSearchCredit,
  updateSearchDistribution,
  updateInspectedCourse,
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
export const selectSearchMode = (state: RootState) => state.search.searchMode;
export const selectSearchFilters = (state: RootState) => state.search.filters;
export const selectRetrievedCourses = (state: RootState) =>
  state.search.retrievedCourses;
export const selectInspectedCourse = (state: RootState) =>
  state.search.inspectedCourse;

export default searchSlice.reducer;
