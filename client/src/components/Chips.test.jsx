import { fireEvent, render } from '@testing-library/react';
import Chips from './Chips';
import { store } from '../redux/store';
import { Provider } from 'react-redux';

it('test if Chips component renders properly', () => {
  expect(render(<Provider store={store}>
    <Chips />
  </Provider>)).toMatchSnapshot();
});

it('test if value updates', async () => {
  render(<Provider store={store}><Chips /></Provider>);
  const input = document.querySelector('#input');
  expect(input.value).toBe('');
  fireEvent.change(input, { target: { value: 'Iasi' } });
  expect(input.value).toBe('Iasi');
})