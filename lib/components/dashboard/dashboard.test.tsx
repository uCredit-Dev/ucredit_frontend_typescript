import {
  render,
  fireEvent,
  screen,
  waitFor,
  act,
  cleanup,
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
import popupReducer, {
  updateToAddMajors as mockUpdateToAddMajors,
} from '../../slices/popupSlice';
import { ToastContainer } from 'react-toastify';
import { allMajors as mockAllMajors } from '../../resources/majors';
import React from 'react';

let history = createMemoryHistory({ initialEntries: ['/login'] });
let mockStore = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    search: searchReducer,
    currentPlan: currentPlanReducer,
    popup: popupReducer,
    // experiment: experimentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

jest.mock('react-select', () => ({ options, value, onChange }) => {
  function handleChange(event) {
    const option = options.find((op) => op.label === event.currentTarget.value);
    mockStore.dispatch(mockUpdateToAddMajors([mockAllMajors[option.value]]));
  }
  return (
    <select
      data-testid="select"
      value={value}
      onChange={handleChange}
      multiple={true}
    >
      {options.map(({ val, label }, index: number) => (
        <option key={index} value={val}>
          {label}
        </option>
      ))}
    </select>
  );
});

beforeEach(() => {
  history = createMemoryHistory({ initialEntries: ['/login'] });
  act(() => {
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

afterAll(cleanup);

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

test('Able to select old BS', async () => {
  await waitFor(() => {
    expect(screen.getByText('Adding a new plan!')).toBeInTheDocument();
  });
  const planAddSelect = screen.getAllByTestId('select')[1];

  fireEvent.change(planAddSelect, {
    target: { value: 'B.S. Computer Science (OLD - Pre-2021)' },
  });
  expect(
    screen.getAllByText('B.S. Computer Science (OLD - Pre-2021)')[0],
  ).toBeInTheDocument();
});

test('Able to select new BS', async () => {
  await waitFor(() => {
    expect(screen.getByText('Adding a new plan!')).toBeInTheDocument();
  });
  const planAddSelect = screen.getAllByTestId('select')[1];
  fireEvent.change(planAddSelect, {
    target: { value: 'B.S. Computer Science (NEW - 2021 & after)' },
  });

  expect(
    screen.getAllByText('B.S. Computer Science (OLD - Pre-2021)')[0],
  ).toBeInTheDocument();
});
