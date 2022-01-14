import {
  render,
  fireEvent,
  screen,
  waitFor,
  act,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Dashboard from './';
import { Provider } from 'react-redux';
import { guestUser } from '../../resources/assets';
import userReducer, { updateUser } from '../../slices/userSlice';
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../../resources/redux_sample/counterSlice';
import searchReducer from '../../slices/searchSlice';
import currentPlanReducer from '../../slices/currentPlanSlice';
import popupReducer from '../../slices/popupSlice';
import { ToastContainer } from 'react-toastify';

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
          <div>
            <ToastContainer />
            <Dashboard id={null} />
          </div>
        </Router>
      </Provider>,
    );
  });
});

test('Correctly logs in as guest user and adding a new plan starts', async () => {
  expect(screen.getByText('Logged in as Guest User!')).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.getByText('Adding a new plan!')).toBeInTheDocument();
  });
});

test('Unable to login without choosing a major', async () => {
  await waitFor(() => {
    expect(screen.getByText('Adding a new plan!')).toBeInTheDocument();
  });
  fireEvent.click(screen.getByText('Add'));
  await waitFor(() => {
    expect(
      screen.getByText('Please choose a valid major!'),
    ).toBeInTheDocument();
  });
});
