import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedPassword, { Password } from '../../../components/auth/Password';
import { mockStoreData } from '../../__mocks__/mockData';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({ ...mockStoreData });

const props = {
  requestResetPassword: jest.fn(() => Promise.resolve(1)),
  isLoggedIn: false,
  resetPassword: jest.fn(() => Promise.resolve(1)),
  match: { url: '/reset-password' },
  location: { search: 'eyJhbGci.I6MQ0fQ.mqnk8I' },
};

const setUp = () => (shallow(<Password { ...props } />));

describe('Password Component', () => {
  const wrapper = setUp();
  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
  });

  it('should render a ResetPasswordForm and not ForgotPasswordForm Component if url matches "/reset-password"',
    () => {
      expect(wrapper.find('ResetPasswordForm').length).toBe(1);
      expect(wrapper.find('ForgotPasswordForm').length).toBe(0);
    });

  it('should redirect to dashboard if user is logged in', () => {
    const wrongUrlProps = { ...props, isLoggedIn: true };
    const wrongUrlWrapper = shallow(<Password { ...wrongUrlProps } />);
    expect(wrongUrlWrapper.find('ResetPasswordForm').length).toBe(0);
    expect(wrongUrlWrapper.find('ForgotPasswordForm').length).toBe(0);
    expect(wrongUrlWrapper.find('Redirect').length).toBe(1);
    expect(wrongUrlWrapper.find('Redirect').props().to).toBe('/dashboard');
  });

  it('should redirect to homepage if url is wrong', () => {
    const wrongUrlProps = {
      ...props,
      match: { ...props.match, url: '/rsomething-wrong' }
    };
    const wrongUrlWrapper = shallow(<Password { ...wrongUrlProps } />);
    expect(wrongUrlWrapper.find('ResetPasswordForm').length).toBe(0);
    expect(wrongUrlWrapper.find('ForgotPasswordForm').length).toBe(0);
    expect(wrongUrlWrapper.find('Redirect').length).toBe(1);
    expect(wrongUrlWrapper.find('Redirect').props().to).toBe('/');
  });

  it('should call handleResetPassword when ForgotPasswordForm is submitted',
    () => {
      const forgotProps = {
        ...props,
        match: { ...props.match, url: '/reset-password' }
      };
      const renderReset = shallow(<Password { ...forgotProps } />);
      const handleResetPasswordSpy = jest.spyOn(renderReset.instance(),
        'handleResetPassword');
      const event = {
        preventDefault: jest.fn(),
        target: {
          password: { value: 'funny-secret' },
          confirmPassword: { value: 'funny-secret' },
        }
      };
      renderReset.instance().handleResetPassword(event);
      expect(handleResetPasswordSpy).toHaveBeenCalledTimes(1);
      expect(renderReset.state().loading).toBe(true);
    });

  it('should call handleChange when form field values change',
    () => {
      const handleChangeSpy = jest.spyOn(wrapper.instance(), 'handleChange');
      const event = {
        preventDefault: jest.fn(),
        target: { name: 'email', value: 'email' }
      };
      wrapper.instance().handleChange(event);
      expect(handleChangeSpy).toHaveBeenCalledTimes(1);
    });

  it('should give an error message when ForgotPasswordForm is submitted with m=non-matching passwords',
    () => {
      const forgotProps = {
        ...props,
        match: { ...props.match, url: '/reset-password' }
      };
      const renderReset = shallow(<Password { ...forgotProps } />);
      const event = {
        preventDefault: jest.fn(),
        target: {
          password: { value: 'funny-secret' },
          confirmPassword: { value: 'boring-secret' },
        }
      };
      renderReset.instance().handleResetPassword(event);
      expect(renderReset.state().loading).toBe(false);
      expect(renderReset.state().errors.password).toBe('passwords don\'t match');
    });

  it('should render a ForgotPasswordForm and not ResetPasswordForm Component if url matches "/forgot-password"',
    () => {
      const forgotProps = {
        ...props,
        match: { ...props.match, url: '/forgot-password' }
      };
      const renderForgot = shallow(<Password { ...forgotProps } />);
      expect(renderForgot.find('ResetPasswordForm').length).toBe(0);
      expect(renderForgot.find('ForgotPasswordForm').length).toBe(1);
    });

  it('should call handleForgotPassword when ForgotPasswordForm is submitted',
    () => {
      const forgotProps = {
        ...props,
        match: { ...props.match, url: '/forgot-password' }
      };
      const renderForgot = shallow(<Password { ...forgotProps } />);
      const handleForgotPasswordSpy = jest.spyOn(
        renderForgot.instance(), 'handleForgotPassword'
      );
      const event = {
        preventDefault: jest.fn(),
        target: { name: 'email', value: 'some@some.com' }
      };
      renderForgot.setState({ email: 'some@some.com' });
      renderForgot.instance().handleForgotPassword(event);
      expect(handleForgotPasswordSpy).toHaveBeenCalledTimes(1);
    });

  it('should set error state if  handleForgotPassword is called with invalid data',
    () => {
      const forgotProps = {
        ...props,
        match: { ...props.match, url: '/forgot-password' }
      };
      const renderForgot = shallow(<Password { ...forgotProps } />);
      const handleForgotPasswordSpy = jest.spyOn(
        renderForgot.instance(), 'handleForgotPassword'
      );
      const event = {
        preventDefault: jest.fn(),
        target: { name: 'email', value: 'some-email' }
      };
      renderForgot.instance().handleForgotPassword(event);
      expect(handleForgotPasswordSpy).toHaveBeenCalledTimes(1);
      expect(renderForgot.state().errors.email).toEqual('Email is required');
    });

  it('should render the connected component', () => {
    const connectedComponent = shallow(
      <ConnectedPassword { ...props } store={store} />
    );
    expect(connectedComponent.length).toBe(1);
  });
});
