import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../appStore/store';
import {
  SemesterType,
  Course,
  FilterType,
  TagType,
  DepartmentType,
  SISRetrievedCourse,
} from '../components/../resources/commonTypes';

const date: Date = new Date();
const year: number = date.getFullYear();

// Contains the year and semester that we are currently adding courses to.
type TimeBundle = {
  searchYear: string;
  searchSemester: SemesterType;
};

// Contains all the filters.
type FilterObj = {
  credits: string | null;
  distribution: string | null;
  tags: TagType | null;
  term: SemesterType;
  year: number;
  department: DepartmentType | null;
  wi: boolean | null;
  levels: string | null;
};

// Contains all the search states.
type searchStates = {
  searching: boolean;
  searchTerm: string;
  searchTime: TimeBundle;
  filters: FilterObj;
  retrievedCourses: SISRetrievedCourse[];
  retrievedVerions: number[]; // typo here
  inspectedVersion: Course | 'None';
  inspectedCourse: SISRetrievedCourse | 'None';
  placeholder: boolean;
  searchStack: { sis: SISRetrievedCourse; ver: Course }[];
  cartAdd: boolean;
};

type searchStackUpdate = {
  new: SISRetrievedCourse;
  oldSIS: SISRetrievedCourse;
  oldV: Course;
};

const initialState: searchStates = {
  searching: false,
  searchTerm: '',
  searchTime: {
    searchYear: '',
    searchSemester: 'Fall',
  },
  retrievedCourses: [], // test courses for now
  retrievedVerions: [],
  filters: {
    credits: null,
    distribution: null,
    tags: null,
    term: 'Fall',
    year: year,
    wi: null,
    department: null,
    levels: null,
  },
  inspectedCourse: 'None',
  inspectedVersion: 'None',
  placeholder: false,
  searchStack: [],
  cartAdd: false,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    updateSearchTime: (state: any, action: PayloadAction<TimeBundle>) => {
      // Updates year and semester in search time bundle.
      state.searchTime.searchYear = action.payload.searchYear;
      state.searchTime.searchSemester = action.payload.searchSemester;
    },
    updateSearchTerm: (state: any, action: PayloadAction<String>) => {
      state.searchTerm = action.payload;
    },
    updateSearchStatus: (state: any, action: PayloadAction<boolean>) => {
      state.searching = action.payload;
    },
    updateInspectedCourse: (
      state: any,
      action: PayloadAction<SISRetrievedCourse | 'None'>,
    ) => {
      const course = action.payload;
      if (course !== 'None') {
        const initCourseVer: Course = {
          title: course.title,
          number: course.number,
          ...course.versions[0],
        };
        state.inspectedVersion = initCourseVer;
      } else {
        state.inspectedVersion = 'None';
      }
      state.inspectedCourse = action.payload;
    },
    updateInspectedVersion: (
      state: any,
      action: PayloadAction<Course | 'None'>,
    ) => {
      state.inspectedVersion = action.payload;
    },
    clearSearch: (state: any) => {
      state.filters = initialState.filters;
      state.searchTerm = '';
      state.searchTime = { searchSemester: '', searchYear: '' };
      state.searching = false;
      state.inspectedCourse = 'None';
      state.retrievedCourses = [];
      state.searchStack = [];
    },
    updateRetrievedCourses: (
      state: any,
      action: PayloadAction<SISRetrievedCourse[]>,
    ) => {
      state.retrievedCourses = [...action.payload];
    },
    updatePlaceholder: (state: any, action: PayloadAction<boolean>) => {
      state.placeholder = action.payload;
    },
    updateSearchFilters: (
      state: any,
      action: PayloadAction<{ filter: FilterType; value: any }>,
    ) => {
      if (action.payload.filter === 'credits') {
        state.filters.credits = action.payload.value;
      } else if (action.payload.filter === 'distribution') {
        state.filters.distribution = action.payload.value;
      } else if (action.payload.filter === 'department') {
        state.filters.department = action.payload.value;
      } else if (action.payload.filter === 'tags') {
        state.filters.tags = action.payload.value;
      } else if (action.payload.filter === 'term') {
        state.filters.term = action.payload.value;
      } else if (action.payload.filter === 'year') {
        state.filters.year = action.payload.value;
      } else if (action.payload.filter === 'wi') {
        state.filters.wi = action.payload.value;
      } else if (action.payload.filter === 'levels') {
        state.filters.levels = action.payload.value;
      }
    },
    updateSearchStack: (
      state: any,
      action: PayloadAction<searchStackUpdate>,
    ) => {
      const newCourse = action.payload.new;
      state.searchStack.push({
        sis: action.payload.oldSIS,
        ver: action.payload.oldV,
      });
      state.inspectedCourse = newCourse;
      state.inspectedVersion = {
        title: newCourse.title,
        number: newCourse.number,
        ...newCourse.versions[0],
      };
    },
    popSearchStack: (state: any) => {
      const oldBundle = state.searchStack.pop();
      state.inspectedCourse = oldBundle.sis;
      state.inspectedVersion = oldBundle.ver;
    },
    updateCartAdd: (state: any, action: PayloadAction<boolean>) => {
      state.cartAdd = action.payload;
    },
  },
});

export const {
  updateSearchTime,
  updateSearchTerm,
  updateSearchStatus,
  updateSearchFilters,
  updateInspectedCourse,
  updateRetrievedCourses,
  updatePlaceholder,
  updateSearchStack,
  updateInspectedVersion,
  clearSearch,
  popSearchStack,
  updateCartAdd,
} = searchSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Please make a selector for each state :)
export const selectYear = (state: RootState) =>
  state.search.searchTime.searchYear;
export const selectSemester = (state: RootState) =>
  state.search.searchTime.searchSemester;
export const selectSearchterm = (state: RootState) => state.search.searchTerm;
export const selectSearchStatus = (state: RootState) => state.search.searching;
export const selectSearchFilters = (state: RootState) => state.search.filters;
export const selectRetrievedCourses = (state: RootState) =>
  state.search.retrievedCourses;
export const selectInspectedCourse = (state: RootState) =>
  state.search.inspectedCourse;
export const selectPlaceholder = (state: RootState) => state.search.placeholder;
export const selectSearchStack = (state: RootState) => state.search.searchStack;
export const selectVersion = (state: RootState) =>
  state.search.inspectedVersion;
export const selectCartAdd = (state: RootState) => state.search.cartAdd;

export default searchSlice.reducer;
