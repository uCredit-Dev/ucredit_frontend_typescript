import {
  render,
  fireEvent,
  screen,
  waitFor,
  cleanup,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import DashboardEntry from './DashboardEntry';
import { Provider } from 'react-redux';
import { store } from '../../appStore/store';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  // capture "GET /greeting" requests
  rest.get('/retrieveUser', (req, res, ctx) => {
    // respond using a mocked JSON body
    const { userid } = req.body;
    return res(
      // Send a valid HTTP status code
      ctx.status(404),
      // And a response body, if necessary
      ctx.json({
        errorMessage: `User '${userid}' not found`,
      }),
    );
  }),
);

let history = createMemoryHistory({ initialEntries: ['/login'] });
beforeEach(() => {
  history = createMemoryHistory({ initialEntries: ['/login'] });
  render(
    <Provider store={store}>
      <Router location={history.location} navigator={history}>
        <DashboardEntry />
      </Router>
    </Provider>,
  );
});

afterEach(cleanup);

test('SSO login and guest login exist', async () => {
  expect(screen.getByText('JHU SSO Login')).toBeInTheDocument();
  expect(screen.getByText('Continue as guest')).toBeInTheDocument();
});

test('SSO login has correct redirect', async () => {
  expect(screen.getByText('JHU SSO Login')).toHaveAttribute(
    'href',
    'https://ucredit-api.herokuapp.com/api/login',
  );
  expect(screen.getByText('Continue as guest')).toBeInTheDocument();
});

test('Guest login continues', async () => {
  server.use();
  await waitFor(() => expect(history.location.pathname).toBe('/login'));
  fireEvent.click(screen.getByText('Continue as guest'));

  await waitFor(() => expect(history.location.pathname).toBe('/dashboard'));
});
