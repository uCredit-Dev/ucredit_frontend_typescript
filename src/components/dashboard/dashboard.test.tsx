import {
  render,
  fireEvent,
  screen,
  waitFor,
  cleanup,
  act,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Dashboard from './';
import { Provider, useDispatch } from 'react-redux';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { api, guestUser } from '../../resources/assets';
import { updateUser } from '../../slices/userSlice';
import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import { store } from '../../appStore/store';
import counterReducer from '../../resources/redux_sample/counterSlice';
import userReducer from '../../slices/userSlice';
import searchReducer from '../../slices/searchSlice';
import currentPlanReducer from '../../slices/currentPlanSlice';
import popupReducer from '../../slices/popupSlice';

let history = createMemoryHistory({ initialEntries: ['/login'] });
beforeEach(() => {
  history = createMemoryHistory({ initialEntries: ['/login'] });
  act(() => {
    let mockStore = configureStore({
      reducer: {
        counter: counterReducer,
        user: userReducer,
        search: searchReducer,
        currentPlan: currentPlanReducer,
        popup: popupReducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
    });
    mockStore.dispatch(updateUser(guestUser));
    render(
      <Provider store={mockStore}>
        <Router location={history.location} navigator={history}>
          <Dashboard id={null} />
        </Router>
      </Provider>,
    );
  });
});

test('SSO login and guest login exist', async () => {
  expect(screen.getByText('Logged in as Guest User!')).toBeInTheDocument();
});
