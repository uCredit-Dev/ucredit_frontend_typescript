import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../appStore/store';
import {
  Plan,
  SISRetrievedCourse,
  User,
} from '../components/../resources/commonTypes';

type UserSlice = {
  currentUser: User;
  planList: Plan[];
  courseCache: SISRetrievedCourse[];
  cacheNumbers: String[];
  cacheTitles: String[];
  unfoundNumbers: String[];
  retrievedAll: boolean;
  importId: string;
  loginCheck: boolean;
};

const initialState: UserSlice = {
  currentUser: {
    _id: 'noUser',
    name: '',
    email: '',
    affiliation: 'STUDENT',
    grade: 'AE UG Freshman',
    school: '',
    plan_ids: ['no plan'],
  },
  planList: [],
  courseCache: [],
  retrievedAll: false,
  cacheNumbers: [],
  cacheTitles: [], // we need both cachenumbers and titles since some courses may have the same numbers but different titles
  unfoundNumbers: [],
  importId: null,
  loginCheck: false,
};

// Updates all user info from database. This function should be called after an axios get on the user routes.
function userUpdate(state: any, action: PayloadAction<User>) {
  state.currentUser._id = action.payload._id;
  state.currentUser.name = action.payload.name;
  state.currentUser.email = action.payload.email;
  state.currentUser.grade = action.payload.grade;
  state.currentUser.school = action.payload.school;
  state.currentUser.affiliation = action.payload.affiliation;
  state.currentUser.plan_ids = action.payload.plan_ids;
}

// Not being used as we can update database when user adds course, and call the reusable update user function for any updates to display
// function addNewCourse(state: any, action: PayloadAction<NewCourse>) {}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: userUpdate,
    updatePlanList: (state: any, action: PayloadAction<Plan[]>) => {
      state.planList = [...action.payload];
    },
    updateGuestPlanIds: (state: any, action: PayloadAction<string[]>) => {
      state.currentUser.plan_ids = action.payload;
    },
    updateCourseCache: (
      state: any,
      action: PayloadAction<SISRetrievedCourse[]>,
    ) => {
      if (!state.selectedAll) {
        for (let course of action.payload) {
          if (
            !state.cacheNumbers.includes(course.number) ||
            !state.cacheTitles.includes(course.title)
          ) {
            state.cacheNumbers = [...state.cacheNumbers, course.number];
            state.cacheTitles = [...state.cacheTitles, course.title];
            state.courseCache = [...state.courseCache, course];
          }
        }
      }
    },
    updateUnfoundNumbers: (state: any, action: PayloadAction<String>) => {
      if (!state.unfoundNumbers.includes(action.payload)) {
        state.unfoundNumbers = [...state.unfoundNumbers, action.payload];
      }
    },
    updateAllCoursesCached: (
      state: any,
      action: PayloadAction<SISRetrievedCourse[]>,
    ) => {
      if (!state.selectedAll) {
        state.courseCache = [...action.payload];
      }
    },
    updateRetrievedAll: (state: any, action: PayloadAction<Boolean>) => {
      state.retrievedAll = action.payload;
    },
    updateImportID: (state: any, action: PayloadAction<String>) => {
      state.importId = action.payload;
    },
    updateLoginCheck: (state: any, action: PayloadAction<Boolean>) => {
      state.loginCheck = action.payload;
    },
    resetUser: (state: any) => {
      state.currentUser = initialState.currentUser;
      state.planList = initialState.planList;
    },
  },
});

export const {
  updateUser,
  updatePlanList,
  updateGuestPlanIds,
  updateCourseCache,
  updateAllCoursesCached,
  updateRetrievedAll,
  updateUnfoundNumbers,
  updateImportID,
  updateLoginCheck,
  resetUser,
} = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Please make a selector for each state :)
export const selectUser = (state: RootState) => state.user.currentUser;
export const selectPlanList = (state: RootState) => state.user.planList;
export const selectCourseCache = (state: RootState) => state.user.courseCache;
export const selectRetrievedAll = (state: RootState) => state.user.retrievedAll;
export const selectUnfoundNumbers = (state: RootState) =>
  state.user.unfoundNumbers;
export const selectImportID = (state: RootState) => state.user.importId;
export const selectLoginCheck = (state: RootState) => state.user.loginCheck;

export default userSlice.reducer;
