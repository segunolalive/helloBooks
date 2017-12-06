import React from 'react';
import { shallow } from 'enzyme';
import LoginRedirect from '../../../components/auth/LoginRedirect';
import notify from '../../__mocks__/notify';

jest.mock('react-router-dom');


describe('LoginRedirect', () => {
  it('renders a redirect component and toast an error message', () => {
    const wrapper = shallow(<LoginRedirect />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('Redirect').length).toBe(1);
    expect(wrapper.find('Redirect').props().to).toBe('/login');
    expect(notify.error).toHaveBeenCalled();
  });
});
