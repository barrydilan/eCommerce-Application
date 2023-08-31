import './index.css';
import '@smastrom/react-rating/style.css';

import React from 'react';

import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { WrappedApp } from './app/App';
import { setupStore } from './app/store';

const store = setupStore();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <WrappedApp />
    </Provider>
  </React.StrictMode>,
);
