import React from 'react';
import { shallow } from 'enzyme';
import LoginRedirect from '../../../components/auth/LoginRedirect';
import Notify from '../../__mocks__/Notify';

jest.mock('react-router-dom');


describe('LoginRedirect', () => {
  it('renders a redirect component and toast an error message', () => {
    const wrapper = shallow(<LoginRedirect />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('Redirect').length).toBe(1);
    expect(wrapper.find('Redirect').props().to).toBe('/login');
    expect(Notify.error).toHaveBeenCalled();
  });
});
