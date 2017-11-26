import React from 'react';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import Header, { HeaderComponent } from '../../../components/Header';

jest.mock('react-router-dom');

const props = {
  user: { isAdmin: true },
  navLinks: ['home', 'about'],
  activeLink: 'home'
};

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({
  authReducer: {
    authLoading: false,
    user: { id: 2 },
    isLoggedIn: true },
});


describe('Header', () => {
  const wrapper = shallow(<HeaderComponent { ...props } />);
  it('should render 1 Header tag', () => {
    expect(wrapper.find('header')).toHaveLength(1);
  });

  it('should render connected component', () => {
    const connectedComponent = shallow(<Header { ...props } store={store} />);
    expect(connectedComponent.length).toBe(1);
  });
});
