import React from 'react'
import {render, fireEvent, screen, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom'
import LandingPage from './'
import { Route, BrowserRouter } from "react-router-dom";

beforeAll(() => render(<BrowserRouter><LandingPage /></BrowserRouter>))

test('get started goes to login', async () => {
  let buttons = screen.getAllByText('Contact Us');
  for (var i = 0; i < buttons.length; i++) {
    fireEvent.click(buttons[i])
  }
  
  await waitFor(() => screen.getByText('uCredit Application Form'))

  expect(screen.getByText('uCredit Application Form')).toBeInTheDocument()
})

/* test('handles server error', async () => {
  server.use(
    rest.get('/greeting', (req, res, ctx) => {
      return res(ctx.status(500))
    }),
  )

  render(<LandingPage/>)

  fireEvent.click(screen.getByText('Load Greeting'))

  await waitFor(() => screen.getByRole('alert'))

  expect(screen.getByRole('alert')).toHaveTextContent('Oops, failed to fetch!')
  expect(screen.getByRole('button')).not.toBeDisabled()
}) */