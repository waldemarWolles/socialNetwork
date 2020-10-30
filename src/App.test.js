import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './reduxx/redux-store';

test('renders learn react link', () => {
  const { container } = render(<BrowserRouter> <Provider store={store}><App /> </Provider></BrowserRouter>);
  container.querySelector('.app');
  expect(container).toBeInTheDocument();
});
