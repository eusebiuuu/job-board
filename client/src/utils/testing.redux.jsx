import React from 'react'
import { render } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import jobsSlice from '../redux/jobs/jobsSlice'
import { BrowserRouter } from 'react-router-dom'
import UserProvider from '../context/user'

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = configureStore({
      reducer: {
        jobs: jobsSlice,
      },
      preloadedState
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <BrowserRouter>
      <Provider store={store}>
        <UserProvider>
          {children}
        </UserProvider>
      </Provider>
    </BrowserRouter>
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}