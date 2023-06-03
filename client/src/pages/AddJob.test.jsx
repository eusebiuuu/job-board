const { default: AddJob } = require("./AddJob.jsx");
const { act } = require("react-dom/test-utils");
const { fireEvent, screen } = require("@testing-library/react");
import '@testing-library/jest-dom'
import { renderWithProviders } from '../utils/testing.redux.jsx';

describe('AddJob', () => {
  it('test location functionality', () => {
    renderWithProviders(<AddJob />);
    let location = screen.getByTestId('location');
    expect(location).toBeInTheDocument();
    expect(location.value).toBe('office');

    act(() => {
      fireEvent.change(location, { target: { value: 'remote' } });
    });
    location = screen.getByTestId('location');
    expect(location.value).toBe('remote');

    act(() => {
      fireEvent.change(location, { target: { value: 'hybrid' } });
    });
    location = screen.getByTestId('location');
    expect(location.value).toBe('hybrid');

    act(() => {
      fireEvent.change(location, { target: { value: 'abcde' } });
    });
    location = screen.getByTestId('location');
    expect(location.value).toBe('office');
  });
})