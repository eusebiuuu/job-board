const { default: Filters } = require("./Filters");
const { render, fireEvent, screen } = require("@testing-library/react");
// const { configureStore } = require("@reduxjs/toolkit");
const { default: userEvent } = require("@testing-library/user-event");
const { act } = require("react-dom/test-utils");
import { renderWithProviders } from '../utils/testing.redux';

describe('test Filters component', () => {

  it('test if city addition works properly', () => {
    const { store } = renderWithProviders(<Filters />);
    const button = document.querySelector('#addCity');
    const input = document.querySelector('#inputCity');
    expect(button).toBeDefined();
    expect(input).toBeDefined();

    act(() => {
      fireEvent.change(input, { target: { value: 'Olt' } });
      fireEvent.click(button);
    });
    expect(store.getState().jobs.cities).toEqual(['olt']);

    act(() => {
      fireEvent.change(input, { target: { value: '' } });
      userEvent.type(input, 'bacau{enter}');
    });
    expect(store.getState().jobs.cities).toEqual(['olt', 'bacau']);

    act(() => {
      fireEvent.change(input, { target: { value: '' } });
      userEvent.type(input, 'OlT{enter}');
    });
    // console.log(store.getState().jobs.cities);
    expect(store.getState().jobs.cities).toEqual(['olt', 'bacau']);
  });

  it('test if job types functionality works properly', () => {
    const { store } = renderWithProviders(<Filters />);
    const field1 = screen.getByTestId('id0');
    const field2 = screen.getByTestId('id1');
    const field3 = screen.getByTestId('id2');
    act(() => {
      userEvent.click(field1);
      expect(store.getState().jobs.jobTypes).toEqual(['part-time']);
      userEvent.click(field2);
      expect(store.getState().jobs.jobTypes).toEqual(['part-time', 'full-time']);
      userEvent.click(field1);
      expect(store.getState().jobs.jobTypes).toEqual(['full-time']);
      userEvent.click(field3);
      expect(store.getState().jobs.jobTypes).toEqual(['full-time', 'internship']);
    })
  })
})