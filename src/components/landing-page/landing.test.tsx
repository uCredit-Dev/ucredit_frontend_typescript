import React from 'react';
import {
  render,
  fireEvent,
  screen,
  waitFor,
  cleanup,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import LandingPage from './';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

// beforeEach(() => render(<BrowserRouter><LandingPage /></BrowserRouter>))
let history = createMemoryHistory();
beforeEach(() => {
  history = createMemoryHistory();
  render(
    <Router location={history.location} navigator={history}>
      <LandingPage />
    </Router>,
  );
});

afterEach(cleanup);

test('contact us opens application page', async () => {
  let buttons = screen.getAllByText('Contact Us');
  fireEvent.click(buttons[0]);

  await waitFor(() => screen.getByText('uCredit Application Form'));

  expect(screen.getByText('uCredit Application Form')).toBeInTheDocument();
  expect(screen.getByText('Name:')).toBeInTheDocument();
  expect(screen.getByText('Email:')).toBeInTheDocument();
  expect(screen.getByText('Year:')).toBeInTheDocument();
  expect(screen.getByText('Position:')).toBeInTheDocument();
  expect(screen.getByText('Self Pitch:')).toBeInTheDocument();
  expect(screen.getByText('Reason to join:')).toBeInTheDocument();
  expect(screen.getByText('Resume Link:')).toBeInTheDocument();
});

test('Able to close application page', async () => {
  let buttons = screen.getAllByText('Contact Us');
  fireEvent.click(buttons[0]);

  await waitFor(() => screen.getByText('uCredit Application Form'));

  fireEvent.click(screen.getByTestId('close-application'));

  expect(screen.queryByText('uCredit Application Form')).toBeNull();
});

test('Empty application is not submitted', async () => {
  let buttons = screen.getAllByText('Contact Us');
  fireEvent.click(buttons[0]);

  await waitFor(() => screen.getByText('uCredit Application Form'));

  fireEvent.click(screen.getByText('Submit'));

  expect(
    screen.queryByText('*Please fill in all inputs.*'),
  ).toBeInTheDocument();
});

test('Get started redirects', async () => {
  let buttons = screen.getAllByText('Get Started');
  fireEvent.click(buttons[0]);

  expect(history.location.pathname).toBe('/login');
});
