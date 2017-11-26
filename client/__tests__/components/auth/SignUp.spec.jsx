import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedSignUp, { SignUp }
  from '../../../components/auth/SignUp';
import { mockStoreData } from '../../__mocks__/mockData';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({ ...mockStoreData });

const props = {
  ...mockStoreData.authReducer,
  signUp: jest.fn(),
  isLoggedIn: false,
  isLoading: false,
};

window.GOOGLE_CLIENT_ID = '12342AXTYkjknnn798797';

const setUp = () => shallow(<SignUp { ...props } />);

describe('SignUp Component', () => {
  it('renders without crashing', () => {
    const wrapper = setUp();
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
  });

  it('should render the connected component', () => {
    const connectedComponent = shallow(
      <ConnectedSignUp { ...props } store={store} />
    );
    expect(connectedComponent.length).toBe(1);
  });

  it('renders one form', () => {
    const wrapper = setUp();
    expect(wrapper.find('form').length).toBe(1);
  });

  it('renders seven input fields ', () => {
    const wrapper = setUp();
    expect(wrapper.find('input').length).toBe(7);
    expect(wrapper.find('input').at(0).props().type).toBe('text');
    expect(wrapper.find('input').at(1).props().type).toBe('text');
    expect(wrapper.find('input').at(2).props().type).toBe('email');
    expect(wrapper.find('input').at(3).props().type).toBe('text');
    expect(wrapper.find('input').at(4).props().type).toBe('password');
    expect(wrapper.find('input').at(5).props().type).toBe('password');
    expect(wrapper.find('input').at(6).props().type).toBe('submit');
  });

  it('should redirect to Dashboard if user is logged in already', () => {
    const loggedinInPprops = { ...props, isLoggedIn: true };
    const wrapper = shallow(<SignUp { ...loggedinInPprops } />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('Redirect').length).toBe(1);
    expect(wrapper.find('Redirect').props().to).toBe('/dashboard');
    expect(wrapper.find('div').length).toBe(0);
  });

  it('renders a loading component when isLoading is true', () => {
    const loadingPprops = { ...props, isLoading: true };
    const wrapper = shallow(<SignUp { ...loadingPprops } />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('Loading').length).toBe(1);
    expect(wrapper.find('Loading').props().text).toBe('Creating your account');
  });

  it('should call handleSignUp when form is submited', () => {
    const wrapper = setUp();
    const handleSignUpSpy = jest.spyOn(
      wrapper.instance(), 'handleSignUp'
    );
    const event = {
      preventDefault: jest.fn(),
    };
    wrapper.instance().handleSignUp(event);
    expect(handleSignUpSpy).toHaveBeenCalledTimes(1);
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

  it('should call handleGoogleSignUp when form field values chnages', () => {
    const wrapper = setUp();
    const handleGoogleSignUpSpy = jest.spyOn(
      wrapper.instance(), 'handleGoogleSignUp'
    );
    const googleProfile = {
      target: { name: 'email', value: 'something@light.com' }
    };
    wrapper.instance().handleGoogleSignUp(googleProfile);
    expect(handleGoogleSignUpSpy).toHaveBeenCalledTimes(1);
    expect(props.signUp).toHaveBeenCalled();
  });
});
