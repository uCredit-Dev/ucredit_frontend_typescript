import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../appStore/store";
import {
  SemesterType,
  Course,
  YearType,
  FilterType,
  TagType,
  DepartmentType,
} from "../commonTypes";
// import { testCourse1, testCourse2 } from '../testObjs'; // For testing
import { all_majors, course_tags } from "../assets";

type timeBundle = {
  searchYear: YearType;
  searchSemester: SemesterType;
};

type areaType = "N" | "S" | "H" | "W" | "E" | "Q" | "None";

type filterObj = {
  credits: number | "None";
  distribution: areaType;
  tags: TagType | "None"; // TODO: fill this out with array of all tags
  term: SemesterType | "None";
  department: DepartmentType | "None"; // TODO: fill this out with array of departments
  wi: "None" | boolean;
};

type searchStates = {
  searching: boolean;
  searchTerm: string;
  searchTime: timeBundle;
  filters: filterObj;
  retrievedCourses: Course[];
  inspectedCourse: Course | "None";
  placeholder: boolean;
};

const initialState: searchStates = {
  searching: false,
  searchTerm: "",
  searchTime: {
    searchYear: "Freshman",
    searchSemester: "fall",
  },
  retrievedCourses: [], // test courses for now
  filters: {
    credits: "None",
    distribution: "None",
    tags: "None",
    term: "None",
    wi: "None",
    department: "None",
  },
  inspectedCourse: "None",
  placeholder: false,
};
export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    updateSearchTime: (state: any, action: PayloadAction<timeBundle>) => {
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
      action: PayloadAction<Course | "None">
    ) => {
      // Course we're looking at in search popout
      state.inspectedCourse = action.payload;
    },
    clearSearch: (state: any) => {
      state.filters = { credits: "None", distribution: "None", tags: "None" };
      state.searchTerm = "";
      state.searchTime = { searchSemester: "", searchYear: "" };
      state.searching = false;
      state.inspectedCourse = "None";
      state.retrievedCourses = [];
      state.searchMode = "Title";
      console.log("clearing");
    },
    updateRetrievedCourses: (state: any, action: PayloadAction<Course[]>) => {
      state.retrievedCourses = action.payload;
    },
    updatePlaceholder: (state: any, action: PayloadAction<boolean>) => {
      state.placeholder = action.payload;
    },
    updateSearchFilters: (
      state: any,
      action: PayloadAction<{ filter: FilterType; value: any }>
    ) => {
      if (action.payload.filter === "credits") {
        state.filters.credits = action.payload.value;
      } else if (action.payload.filter === "distribution") {
        state.filters.distribution = action.payload.value;
      } else if (action.payload.filter === "department") {
        state.filters.department = action.payload.value;
      } else if (action.payload.filter === "tags") {
        state.filters.tags = action.payload.value;
      } else if (action.payload.filter === "term") {
        state.filters.term = action.payload.value;
      } else if (action.payload.filter === "wi") {
        state.filters.wi = action.payload.value;
      }
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
  clearSearch,
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
export const selectSearchFilters = (state: RootState) => state.search.filters;
export const selectRetrievedCourses = (state: RootState) =>
  state.search.retrievedCourses;
export const selectInspectedCourse = (state: RootState) =>
  state.search.inspectedCourse;
export const selectPlaceholder = (state: RootState) => state.search.placeholder;

export default searchSlice.reducer;
