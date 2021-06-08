import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../appStore/store";
import {
  SemesterType,
  Course,
  FilterType,
  TagType,
  DepartmentType,
  AreaType,
  SISRetrievedCourse,
} from "../resources/commonTypes";

// Contains the year and semester that we are currently adding courses to.
type TimeBundle = {
  searchYear: number;
  searchSemester: SemesterType;
};

// Contains all the filters.
type FilterObj = {
  credits: number | "Any";
  distribution: AreaType | "Any";
  tags: TagType | "Any"; // TODO: fill this out with array of all tags
  term: SemesterType | "Any";
  department: DepartmentType | "Any"; // TODO: fill this out with array of departments
  wi: "Any" | boolean;
};

// Contains all the search states.
type searchStates = {
  searching: boolean;
  searchTerm: string;
  searchTime: TimeBundle;
  filters: FilterObj;
  retrievedCourses: SISRetrievedCourse[];
  inspectedVersion: Course | "None";
  inspectedCourse: SISRetrievedCourse | "None";
  placeholder: boolean;
  searchStack: SISRetrievedCourse[];
};

const initialState: searchStates = {
  searching: false,
  searchTerm: "",
  searchTime: {
    searchYear: 0,
    searchSemester: "Fall",
  },
  retrievedCourses: [], // test courses for now
  filters: {
    credits: "Any",
    distribution: "Any",
    tags: "Any",
    term: "Any",
    wi: "Any",
    department: "Any",
  },
  inspectedCourse: "None",
  inspectedVersion: "None",
  placeholder: false,
  searchStack: [],
};

export const searchSlice = createSlice({
  name: "search",
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
      action: PayloadAction<SISRetrievedCourse | "None">
    ) => {
      const course = action.payload;
      if (course !== "None") {
        const initCourseVer: Course = {
          title: course.title,
          number: course.number,
          ...course.versions[0],
        };
        state.inspectedVersion = initCourseVer;
      } else {
        state.inspectedVersion = "None";
      }
      state.inspectedCourse = action.payload;
    },
    updateInspectedVersion: (
      state: any,
      action: PayloadAction<Course | "None">
    ) => {
      state.inspectedVersion = action.payload;
    },
    clearSearch: (state: any) => {
      state.filters = {
        credits: "Any",
        distribution: "Any",
        tags: "Any",
        term: "Any",
        wi: "Any",
        department: "Any",
      };
      state.searchTerm = "";
      state.searchTime = { searchSemester: "", searchYear: "" };
      state.searching = false;
      state.inspectedCourse = "None";
      state.retrievedCourses = [];
      state.searchStack = [];
    },
    updateRetrievedCourses: (
      state: any,
      action: PayloadAction<SISRetrievedCourse[]>
    ) => {
      state.retrievedCourses = [...action.payload];
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
    updateSearchStack: (
      state: any,
      action: PayloadAction<SISRetrievedCourse>
    ) => {
      state.searchStack.push(action.payload);
    },
    popSearchStack: (state: any) => {
      const popped = state.searchStack.pop();
      state.inspectedCourse = popped;
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

export default searchSlice.reducer;
