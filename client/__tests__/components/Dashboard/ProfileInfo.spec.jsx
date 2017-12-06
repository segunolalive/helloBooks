import React from 'react';
import { shallow } from 'enzyme';
import ProfileInfo from '../../../components/Dashboard/ProfileInfo';
import { mockStoreData } from '../../__mocks__/mockData';

jest.mock('react-router-dom');
jest.mock('react-materialize');

const props = {
  name: mockStoreData.authReducer.firstName,
  onClick: jest.fn(() => Promise.resolve()),
};


describe('ProfileInfo component', () => {
  const wrapper = shallow(<ProfileInfo { ...props } />);
  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.find('Col').length).toBeGreaterThan(0);
  });

  it('renders a Link component', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.find('Link').length).toBeGreaterThan(0);
  });

  it('renders img tag', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.find('img').length).toBe(1);
  });
});
