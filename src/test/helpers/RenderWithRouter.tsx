import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

/**
 * Renders the given component with a router.
 *
 * @param {React.ReactElement} component - The component to be rendered.
 * @param {string} initialRoute - The initial route of the router. Default value is '/'.
 *
 * @returns {void}
 */
function RenderWithRouter(component: React.ReactElement, initialRoute: string = '/'): void {
  render(<MemoryRouter initialEntries={[initialRoute]}>{component}</MemoryRouter>);
}

export default RenderWithRouter;
