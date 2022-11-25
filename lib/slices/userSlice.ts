import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../appStore/store';
import {
  Plan,
  SISRetrievedCourse,
  User,
  ReviewMode,
  UserId,
} from '../components/../resources/commonTypes';

type UserSlice = {
  currentUser: User;
  token: string;
  planList: Plan[];
  courseCache: SISRetrievedCourse[];
  cacheNumbers: String[];
  cacheTitles: String[];
  unfoundNumbers: String[];
  retrievedAll: boolean;
  importId: string | null;
  reviewerPlanId: string;
  loginCheck: boolean;
  loginRedirect: boolean;
  reviewMode: ReviewMode;
  cartInvokedBySemester: boolean;
  commenters: UserId[];
};

const initialState: UserSlice = {
  currentUser: {
    _id: 'noUser',
    name: '',
    email: '',
    affiliation: 'STUDENT',
    grade: 'AE UG Freshman',
    school: '',
    whitelisted_plan_ids: [],
    plan_ids: ['no plan'],
  },
  token: '',
  planList: [],
  courseCache: [],
  retrievedAll: false,
  cacheNumbers: [],
  cacheTitles: [], // we need both cachenumbers and titles since some courses may have the same numbers but different titles
  unfoundNumbers: [],
  importId: null,
  reviewerPlanId: '',
  loginCheck: false,
  loginRedirect: false,
  reviewMode: ReviewMode.None,
  cartInvokedBySemester: false,
  commenters: [],
};

// Updates all user info from database. This function should be called after an axios get on the user routes.
function userUpdate(state: any, action: PayloadAction<User>) {
  state.currentUser = action.payload;
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
    updateReviewerPlanID: (state: any, action: PayloadAction<String>) => {
      state.reviewerPlanId = action.payload;
    },
    updateLoginCheck: (state: any, action: PayloadAction<Boolean>) => {
      state.loginCheck = action.payload;
    },
    updateLoginRedirect: (state: any, action: PayloadAction<Boolean>) => {
      state.loginRedirect = action.payload;
    },
    updateReviewMode: (state: any, action: PayloadAction<ReviewMode>) => {
      state.reviewMode = action.payload;
    },
    updateCartInvokedBySemester: (
      state: any,
      action: PayloadAction<Boolean>,
    ) => {
      state.cartInvokedBySemester = action.payload;
    },
    updateCommenters: (state: any, action: PayloadAction<UserId[]>) => {
      state.commenters = action.payload.map(({ _id, name }) => ({ _id, name }));
    },
    updateToken: (state: any, action: PayloadAction<String>) => {
      state.token = action.payload;
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
  updateReviewerPlanID,
  updateLoginCheck,
  updateLoginRedirect,
  updateReviewMode,
  updateCartInvokedBySemester,
  updateCommenters,
  updateToken,
  resetUser,
} = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Please make a selector for each state :)
export const selectUser = (state: RootState) => state.user.currentUser;
export const selectToken = (state: RootState) => state.user.token;
export const selectPlanList = (state: RootState) => state.user.planList;
export const selectCourseCache = (state: RootState) => state.user.courseCache;
export const selectRetrievedAll = (state: RootState) => state.user.retrievedAll;
export const selectUnfoundNumbers = (state: RootState) =>
  state.user.unfoundNumbers;
export const selectImportID = (state: RootState) => state.user.importId;
export const selectReviewerPlanId = (state: RootState) =>
  state.user.reviewerPlanId;
export const selectLoginCheck = (state: RootState) => state.user.loginCheck;
export const selectLoginRedirect = (state: RootState) =>
  state.user.loginRedirect;
export const selectReviewMode = (state: RootState) => state.user.reviewMode;
export const selectCartInvokedBySemester = (state: RootState) =>
  state.user.cartInvokedBySemester;
export const selectCommenters = (state: RootState) => state.user.commenters;

export default userSlice.reducer;
