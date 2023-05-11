import { render } from '@testing-library/react';
import Jobs from './Jobs';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

it('test if Jobs component renders properly', () => {
  expect(render(<Provider store={store}>
    <Jobs />
  </Provider>)).toMatchSnapshot();
})