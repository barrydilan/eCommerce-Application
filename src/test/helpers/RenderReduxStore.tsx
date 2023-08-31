import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import { RootState, setupStore } from '../../app/store';

/**
 * Renders a React component with a Redux store.
 *
 * @param {React.ReactElement} component - The component to render.
 * @param {RootState} initialState - The initial state of the Redux store.
 *
 * @returns {RootState} - The root state of the test app.
 */
function renderReduxStore(component: React.ReactElement, initialState?: RootState): RootState {
  const store = setupStore(initialState);

  render(<Provider store={store}>{component}</Provider>);

  return store;
}

export default renderReduxStore;
