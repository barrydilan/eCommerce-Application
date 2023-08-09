import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import { setupStore } from './app/store';

import App from './app/App';
import './index.css';

const store = setupStore();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
);
