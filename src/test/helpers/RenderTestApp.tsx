import { ReactElement } from 'react';

import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { RootState, setupStore } from '../../app/store';

/**
 * Renders a test app with the provided component, initial route, and initial state.
 *
 * @param {ReactElement} component - The component to be rendered in the test app.
 * @param {string} initialRoute - The initial route for the MemoryRouter.
 * @param {RootState} initialState - The initial state for the store.
 *
 * @return {RootState} The root state of the test app.
 */
function RenderTestApp(
  component: ReactElement,
  initialRoute: string = '/',
  initialState?: Partial<RootState>,
): RootState {
  const store = setupStore(initialState);

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[initialRoute]}>{component}</MemoryRouter>
    </Provider>,
  );

  return store.getState();
}

export default RenderTestApp;
