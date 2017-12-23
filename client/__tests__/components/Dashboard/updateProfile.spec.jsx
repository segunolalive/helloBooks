import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedUpdateProfile, { UpdateProfile }
  from '../../../components/Dashboard/UpdateProfile';
import { mockStoreData } from '../../__mocks__/mockData';

let props = {
  ...mockStoreData.authReducer,
  updateProfile: jest.fn(() => Promise.resolve(1)),
};

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({ ...mockStoreData });


describe('UpdateProfile Component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<UpdateProfile { ...props } />);
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
  });

  it('should redirect to login page if user is not logged in', () => {
    props = { ...props, isLoggedIn: false };
    const wrapper = shallow(<UpdateProfile { ...props } />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('LoginRedirect').length).toBe(1);
    expect(wrapper.find('div').length).toBe(0);
  });

  it('should call handleChange when input fields change value', () => {
    const wrapper = shallow(<UpdateProfile { ...props } />);
    const handleChangeSpy = jest.spyOn(
      wrapper.instance(), 'handleChange'
    );
    const event = {
      preventDefault: jest.fn(),
      target: {
        value: 'Tolu',
        name: 'firstName'
      }
    };
    wrapper.instance().handleChange(event);
    expect(handleChangeSpy).toHaveBeenCalledTimes(1);
  });

  it('should call handleSubmit when form is submited', () => {
    const wrapper = shallow(<UpdateProfile { ...props } />);
    const handleSubmitSpy = jest.spyOn(
      wrapper.instance(), 'handleSubmit'
    );
    const event = {
      preventDefault: jest.fn(),
    };
    wrapper.instance().handleSubmit(event);
    expect(handleSubmitSpy).toHaveBeenCalledTimes(1);
  });

  it('should render the connected component', () => {
    const connectedComponent = shallow(
      <ConnectedUpdateProfile { ...props } store={store} />
    );
    expect(connectedComponent.length).toBe(1);
  });
});
