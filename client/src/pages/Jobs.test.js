import Jobs from './Jobs';
import { renderWithProviders } from '../utils/testing.redux';

it('test if Jobs component renders properly', () => {
  expect(renderWithProviders(<Jobs />)).toMatchSnapshot();
});