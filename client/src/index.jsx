"use client";

import React from 'react';
import { createRoot } from 'react-dom/client';
import 'normalize.css';
import './index.css';
import App from './App';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import UserProvider from './context/user';
import { ErrorBoundary } from 'react-error-boundary';

function fallbackRender({ error }) {
  console.log(error);
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary fallbackRender={fallbackRender}>
    <Provider store={store}>
      <UserProvider>
        <App />
      </UserProvider>
    </Provider>
  </ErrorBoundary>
);