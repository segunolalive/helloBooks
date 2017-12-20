import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedLogin, { Login }
  from '../../../components/auth/Login';
import { mockStoreData } from '../../__mocks__/mockData';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({ ...mockStoreData });

const props = {
  ...mockStoreData.authReducer,
  login: jest.fn(),
  isLoggedIn: false,
  isLoading: false,
};

window.GOOGLE_CLIENT_ID = '12342AXTYkjknnn798797';

const setUp = () => shallow(<Login { ...props } />);

describe('Login Component', () => {
  it('renders without crashing', () => {
    const wrapper = setUp();
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
  });


  it('should render the connected component', () => {
    const connectedComponent = shallow(
      <ConnectedLogin { ...props } store={store} />
    );
    expect(connectedComponent.length).toBe(1);
  });

  it('renders one form', () => {
    const wrapper = setUp();
    expect(wrapper.find('form').length).toBe(1);
  });

  it('renders three input fields of type text, password and submit respectivey',
    () => {
      const wrapper = setUp();
      expect(wrapper.find('input').length).toBe(3);
      expect(wrapper.find('input').at(0).props().type).toBe('text');
      expect(wrapper.find('input').at(1).props().type).toBe('password');
      expect(wrapper.find('input').at(2).props().type).toBe('submit');
    });

  it('should redirect to Dashboard if user is logged in already', () => {
    const loggedinProps = { ...props, isLoggedIn: true };
    const wrapper = shallow(<Login { ...loggedinProps } />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('Redirect').length).toBe(1);
    expect(wrapper.find('Redirect').props().to).toBe('/dashboard');
    expect(wrapper.find('div').length).toBe(0);
  });

  it('renders a loading component when isLoading is true', () => {
    const loadingProps = { ...props, isLoading: true };
    const wrapper = shallow(<Login { ...loadingProps } />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('Loading').length).toBe(1);
    expect(wrapper.find('Loading').props().text).toBe('logging in');
  });

  it('should call handleLogin when form is submited', () => {
    const wrapper = setUp();
    const handleLoginSpy = jest.spyOn(
      wrapper.instance(), 'handleLogin'
    );
    const event = {
      preventDefault: jest.fn(),
    };
    wrapper.instance().handleLogin(event);
    expect(handleLoginSpy).toHaveBeenCalledTimes(1);
  });

  it('should call handleChange when form field values chnages', () => {
    const wrapper = setUp();
    const handleChangeSpy = jest.spyOn(
      wrapper.instance(), 'handleChange'
    );
    const event = {
      preventDefault: jest.fn(),
      target: { name: 'email', value: 'something@light.com' }
    };
    wrapper.instance().handleChange(event);
    expect(handleChangeSpy).toHaveBeenCalledTimes(1);
  });

  it('should call handleGoogleLogin google login is used', () => {
    const wrapper = setUp();
    const handleGoogleLoginSpy = jest.spyOn(
      wrapper.instance(), 'handleGoogleLogin'
    );
    const googleProfile = {
      target: { name: 'email', value: 'something@light.com' }
    };
    wrapper.instance().handleGoogleLogin(googleProfile);
    expect(handleGoogleLoginSpy).toHaveBeenCalledTimes(1);
    expect(props.login).toHaveBeenCalled();
  });
});
