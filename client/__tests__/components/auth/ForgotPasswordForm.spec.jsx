import React from 'react';
import { shallow } from 'enzyme';
import ForgotPasswordForm from '../../../components/auth/ForgotPasswordForm';

const props = {
  onSubmit: jest.fn(),
  loading: false,
  buttonText: 'submit',
};

const setUp = () => (shallow(<ForgotPasswordForm { ...props } />));


describe('ForgotPasswordForm Component', () => {
  const wrapper = setUp();
  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
  });

  it('should render a form', () => {
    expect(wrapper.find('form').length).toBe(1);
  });

  it('should render an input of type email', () => {
    expect(wrapper.find('input[type="email"]').length).toBe(1);
  });

  it('should render a loader  if loading props is true', () => {
    expect(wrapper.find('Loader').length).toBe(0);
    const loadingProp = { ...props, loading: true };
    const loadingWrapper = shallow(<ForgotPasswordForm { ...loadingProp } />);
    expect(loadingWrapper.find('Loading').length).toBe(1);
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
