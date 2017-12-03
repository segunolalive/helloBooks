import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import ConnectedLogout, { Logout } from '../../../components/auth/Logout';
import { mockStoreData } from '../../__mocks__/mockData';
import '../../../reducers/rootReducer';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({ ...mockStoreData });

const props = {
  history: { push: jest.fn() },
  logout: jest.fn()
};

describe('Logut Component', () => {
  const wrapper = shallow(<Logout { ...props } />);
  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
  });

  it('should call the componentDidMount method', () => {
    const componentDidMountSpy = jest.spyOn(
      wrapper.instance(), 'componentDidMount'
    );
    wrapper.instance().componentDidMount();
    expect(componentDidMountSpy).toHaveBeenCalledTimes(1);
  });

  it('should render the connected component', () => {
    const connectedComponent = shallow(
      <ConnectedLogout { ...props } store={store} />
    );
    expect(connectedComponent.length).toBe(1);
  });
});
