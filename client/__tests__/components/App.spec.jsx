import React from 'react';
import { shallow } from 'enzyme';
import App from '../../components/App';

jest.mock('react-router-dom');

describe('App', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toBeDefined();
  });

  it('renders a BrowserRouterComponent', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('BrowserRouter').length).toBe(1);
  });
});
