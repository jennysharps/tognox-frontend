import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import React from 'react';
import App from './App';

const mockStore = configureStore();

describe('App', () => {
  it('should render without crashing', () => {
    const initialStore = {};
    shallow(<App store={mockStore(initialStore)} />);
  });
});
