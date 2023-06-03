import { fireEvent, render } from '@testing-library/react';
import Chips from './Chips';

it('test if Chips component renders properly', () => {
  expect(render(<Chips name={'City'} placeholder={'City'} />)).toMatchSnapshot();
});

it('test if value updates', async () => {
  render(<Chips placeholder={'City'} name={'City'} />);
  const input = document.querySelector('#inputCity');
  expect(input.value).toBe('');
  fireEvent.change(input, { target: { value: 'Iasi' } });
  expect(input.value).toBe('Iasi');
});