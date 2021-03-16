import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../appStore/store';
import { User } from '../commonTypes';

const initialState: User = {
  _id: '',
  firstName: '',
  lastName: '',
  majors: [],
  year: 0,
  freshmanCourses: [],
  sophomoreCourses: [],
  juniorCourses: [],
  seniorCourses: [],
};

function loginUpdate(state: any, action: PayloadAction<User>) {
  state._id = action.payload._id;
  state.firstName = action.payload.firstName;
  state.lastName = action.payload.lastName;
  state.majors = action.payload.majors;
  state.year = action.payload.year;
  state.freshmanCourses = action.payload.freshmanCourses;
  state.sophomoreCourses = action.payload.sophomoreCourses;
  state.juniorCourses = action.payload.juniorCourses;
  state.seniorCourses = action.payload.seniorCourses;
}

function loginName(state: any, action: PayloadAction<User>) {
  state._id = action.payload._id;
  state.firstName = action.payload.firstName;
  state.lastName = action.payload.lastName;
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: loginUpdate,
    loginNam: loginName,
  },
});

export const { login } = userSlice.actions;

// Asynch login with thunk.
export const loginAsync = (user: Promise<User>): AppThunk => (dispatch) => {
  user.then((retrieved: User) => {
    dispatch(login(retrieved));
  });
};

// The function below is called a selector and allows us to select a value from
// the state. Please make a selector for each state :)
export const selectUser = (state: RootState) => state.user;
export const selectFirstname = (state: RootState) => state.user.firstName;

export default userSlice.reducer;
