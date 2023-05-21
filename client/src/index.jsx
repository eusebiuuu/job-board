import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import ThemeProvider from './context/theme';
import UserProvider from './context/user';

const root = createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <UserProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </UserProvider>
    </Provider>
  // </React.StrictMode>
);