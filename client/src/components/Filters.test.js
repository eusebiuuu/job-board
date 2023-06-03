const { default: Filters } = require("./Filters");
const { fireEvent, screen } = require("@testing-library/react");
const { default: userEvent } = require("@testing-library/user-event");
const { act } = require("react-dom/test-utils");
const { renderWithProviders } = require("../utils/testing.redux");

describe('test Filters component', () => {
  it('test if city addition works properly', () => {
    renderWithProviders(<Filters />);
    const button = document.querySelector('#addCity');
    const input = document.querySelector('#inputCity');
    expect(button).toBeTruthy();
    expect(input).toBeTruthy();

    act(() => {
      fireEvent.change(input, { target: { value: 'Iasi' } });
      fireEvent.click(button);
    });
    expect(input.value).toBe('');
    let city1 = screen.getByTestId('cities0');
    expect(city1).toBeTruthy();
    expect(city1.textContent).toBe('iasi');

    act(() => {
      fireEvent.change(input, { target: { value: '' } });
      userEvent.type(input, 'BaCaU{enter}');
    });
    expect(input.value).toBe('');
    city1 = screen.getByTestId('cities0');
    expect(city1).toBeTruthy();
    expect(city1.textContent).toBe('iasi');
    let city2 = screen.getByTestId('cities1');
    expect(city2).toBeTruthy();
    expect(city2.textContent).toBe('bacau');

    act(() => {
      fireEvent.change(input, { target: { value: '' } });
      userEvent.type(input, 'IaSi{enter}');
    });
    city1 = screen.getByTestId('cities0');
    expect(city1).toBeTruthy();
    expect(city1.textContent).toBe('iasi');
    city2 = screen.getByTestId('cities1');
    expect(city2).toBeTruthy();
    expect(city2.textContent).toBe('bacau');
    let city3 = document.querySelector(`[data-testid="cities2"]`);
    expect(city3).toBeNull();

    act(() => {
      fireEvent.change(input, { target: { value: '' } });
      userEvent.type(input, '{enter}');
    });
    city1 = screen.getByTestId('cities0');
    expect(city1).toBeTruthy();
    expect(city1.textContent).toBe('iasi');
    city2 = screen.getByTestId('cities1');
    expect(city2).toBeTruthy();
    expect(city2.textContent).toBe('bacau');
    city3 = document.querySelector(`[data-testid="cities2"]`);
    expect(city3).toBeNull();

    const chips = screen.getByTestId('chips');
    expect(chips).toBeTruthy();
  });

  it('test if job types functionality works properly', () => {
    renderWithProviders(<Filters />);
    let field1 = document.querySelector('[data-testid="jobTypes0"]');
    let field2 = document.querySelector('[data-testid="jobTypes1"]');
    let field3 = document.querySelector('[data-testid="jobTypes2"]');
    
    act(() => {
      fireEvent.click(field1);
    });
    field1 = document.querySelector('[data-testid="jobTypes0"]');
    field2 = document.querySelector('[data-testid="jobTypes1"]');
    field3 = document.querySelector('[data-testid="jobTypes2"]');
    expect(field1.classList.contains('active')).toBe(true);
    expect(field2.classList.contains('active')).toBe(false);
    expect(field3.classList.contains('active')).toBe(false);

    act(() => {
      fireEvent.click(field2);
    });
    field1 = document.querySelector('[data-testid="jobTypes0"]');
    field2 = document.querySelector('[data-testid="jobTypes1"]');
    field3 = document.querySelector('[data-testid="jobTypes2"]');
    expect(field1.classList.contains('active')).toBe(true);
    expect(field2.classList.contains('active')).toBe(true);
    expect(field3.classList.contains('active')).toBe(false);

    act(() => {
      fireEvent.click(field1);
    });
    field1 = document.querySelector('[data-testid="jobTypes0"]');
    field2 = document.querySelector('[data-testid="jobTypes1"]');
    field3 = document.querySelector('[data-testid="jobTypes2"]');
    expect(field1.classList.contains('active')).toBe(false);
    expect(field2.classList.contains('active')).toBe(true);
    expect(field3.classList.contains('active')).toBe(false);

    act(() => {
      fireEvent.click(field3);
    });
    field1 = document.querySelector('[data-testid="jobTypes0"]');
    field2 = document.querySelector('[data-testid="jobTypes1"]');
    field3 = document.querySelector('[data-testid="jobTypes2"]');
    expect(field1.classList.contains('active')).toBe(false);
    expect(field2.classList.contains('active')).toBe(true);
    expect(field3.classList.contains('active')).toBe(true);
  });
});