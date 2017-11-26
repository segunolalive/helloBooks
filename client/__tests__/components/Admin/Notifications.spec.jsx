import React from 'react';
import { shallow } from 'enzyme';
import Notifications from '../../../components/Admin/Notifications';
import { mockStoreData } from '../../__mocks__/mockData';


const props = {
  notifications: mockStoreData.notificationReducer.notifications
};

const setUp = () => (shallow(<Notifications { ...props } />));

describe('Notification Reducer', () => {
  const wrapper = setUp();
  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
  });

  it('renders a Row component', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.find('Row').length).toBe(1);
  });

  it('renders a Col component per notification', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.find('Col').length).toBe(2);
  });
});
