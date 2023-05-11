import React from 'react'
import { render } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import jobsSlice from '../redux/jobs/jobsSlice'
import jobSlice from '../redux/job/jobSlice'
import { BrowserRouter } from 'react-router-dom'

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = configureStore({
      reducer: {
        jobs: jobsSlice,
        job: jobSlice,
      },
      preloadedState
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <BrowserRouter>
      <Provider store={store}>
        {children}
      </Provider>
    </BrowserRouter>
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}