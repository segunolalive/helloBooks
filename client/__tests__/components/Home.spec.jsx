import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedHome, { Home } from '../../components/Home';
import Header from '../../components/Header';
import { mockStoreData } from '../__mocks__/mockData';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({ ...mockStoreData });


jest.mock('react-router-dom');

const props = { isLoggedIn: false };

describe('Home', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Home { ...props } />);
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper.find('div').length).toBeGreaterThan(0);
  });

  it('renders a Header Component', () => {
    const wrapper = shallow(<Home { ...props } />);
    expect(wrapper.find(Header).length).toBe(1);
  });

  it('redirects to Dashboard if user is logged in', () => {
    const loggedInProps = { isLoggedIn: true };
    const loggedInWrapper = shallow(<Home { ...loggedInProps } />);
    expect(loggedInWrapper.find('Redirect').length).toBe(1);
  });

  it('renders an h2 with the text Welcome To Hello Books', () => {
    const wrapper = shallow(<Home { ...props } />);
    expect(wrapper.find('h2').at(0).props().children)
      .toBe('Welcome To Hello Books');
  });

  it('should render the connected component', () => {
    const connectedComponent = shallow(
      <ConnectedHome { ...props } store={store} />
    );
    expect(connectedComponent.length).toBe(1);
  });
});
