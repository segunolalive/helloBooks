import React from 'react';
import { shallow } from 'enzyme';
import ResetPasswordForm from '../../../components/auth/ResetPasswordForm';

const props = {
  onSubmit: jest.fn(),
  loading: false,
  errors: {},
};

const setUp = () => (shallow(<ResetPasswordForm { ...props } />));

describe('ResetPasswordForm', () => {
  const wrapper = setUp();
  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
  });

  it('should render a form', () => {
    expect(wrapper.find('form').length).toBe(1);
  });

  it('should render two password input fields', () => {
    const passwordFields = wrapper.find('input[type="password"]');
    expect(passwordFields.length).toBe(2);
    expect(passwordFields.at(0).props().name).toBe('password');
    expect(passwordFields.at(0).props().placeholder).toBe('password');
    expect(passwordFields.at(1).props().name).toBe('confirmPassword');
    expect(passwordFields.at(1).props().placeholder).toBe('confirm password');
  });

  it('should render a loader  if loading props is true', () => {
    expect(wrapper.find('Loader').length).toBe(0);
    const loadingProp = { ...props, loading: true };
    const loadingWrapper = shallow(<ResetPasswordForm { ...loadingProp } />);
    expect(loadingWrapper.find('Loading').length).toBe(1);
  });

  it('should render button text based on the loading prop', () => {
    expect(wrapper.find('input[type="submit"]').props().value)
      .toBe('Change Password');
    const loadingProp = { ...props, loading: true };
    const loadingWrapper = shallow(<ResetPasswordForm { ...loadingProp } />);
    expect(loadingWrapper.find('input[type="submit"]').props().value)
      .toBe('Resetting Password');
  });

  it('should render a submit button', () => {
    expect(wrapper.find('input[type="submit"]').length).toBe(1);
  });

  it('calls onSubmit when form is submitted', () => {
    const form = wrapper.find('form').at(0);
    form.simulate('submit');
    expect(props.onSubmit).toHaveBeenCalled();
  });
});
