const { default: userEvent } = require("@testing-library/user-event");
const { renderWithProviders } = require("../utils/testing.redux");
const { default: AddJob } = require("./AddJob.jsx");
const { act } = require("react-dom/test-utils");
const { fireEvent, screen } = require("@testing-library/react");
import '@testing-library/jest-dom'

describe('AddJob', () => {
  it('test job types functionality', () => {
    const { store } = renderWithProviders(<AddJob />);
    const choice1 = document.querySelector('#type0');
    const choice2 = document.querySelector('#type1');
    const choice3 = document.querySelector('#type2');
    expect(store.getState().job.jobTypes).toEqual(['full-time']);
    act(() => {
      userEvent.click(choice1);
      expect(store.getState().job.jobTypes).toEqual(['full-time', 'part-time']);
      userEvent.click(choice2);
      expect(store.getState().job.jobTypes).toEqual(['part-time']);
      userEvent.click(choice3);
      expect(store.getState().job.jobTypes).toEqual(['part-time', 'internship']);
    });
  });
  it('test location functionality', () => {
    const { store } = renderWithProviders(<AddJob />);
    const select = screen.getByTestId('location');
    expect(select).toBeInTheDocument();
    expect(store.getState().job.location).toEqual('office');
    act(() => {
      fireEvent.change(select, { target: { value: 'remote' } });
      expect(store.getState().job.location).toEqual('remote');
      fireEvent.change(select, { target: { value: 'hybrid' } });
      expect(store.getState().job.location).toEqual('hybrid');
    });
  });
  it('test benefits functionality', () => {
    const { store } = renderWithProviders(<AddJob />);
    const button = document.querySelector('#addBenefit');
    const input = document.querySelector('#inputBenefit');
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(store.getState().job.benefits).toEqual([]);
    act(() => {
      fireEvent.change(input, { target: { value: 'Medical' } });
      // userEvent.type(input, '{enter}');
      fireEvent.click(button);
      expect(store.getState().job.benefits).toEqual(['medical']);
      fireEvent.change(input, { target: { value: '' } });
      userEvent.type(input, '{enter}');
      expect(store.getState().job.benefits).toEqual(['medical']);
      fireEvent.change(input, { target: { value: 'ticKEts' } });
      userEvent.type(input, '{enter}');
      expect(store.getState().job.benefits).toEqual(['medical', 'tickets']);
    });
  })
})