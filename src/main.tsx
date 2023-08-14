import './index.css';

import React from 'react';

import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { WrappedApp } from './app/App';
import { setupStore } from './app/store';

const store = setupStore();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <React.StrictMode>
      <WrappedApp />
    </React.StrictMode>
  </Provider>,
);
