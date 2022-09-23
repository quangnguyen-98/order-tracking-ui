import * as ReactDOM from 'react-dom';
import BreadCrumb from './index';
describe('Dashboard', () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }))
    });
  });

  it("Render Dashboarh component without crash", () => {
    const container = document.createElement('div');
    ReactDOM.render(<BreadCrumb path={'path A'} />, container);
    // ReactDOM.unmountComponentAtNode(container);

  });
});




