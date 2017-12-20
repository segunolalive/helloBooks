import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedDashboard, { Dashboard } from '../../../components/Dashboard';
import { mockStoreData } from '../../__mocks__/mockData';


jest.mock('react-router-dom');

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore(mockStoreData);

let props = {
  fetchBorrowedBooks: jest.fn(),
  returnBook: jest.fn(),
  readBook: jest.fn(),
  suggestions: [],
  getSuggestedBooks: jest.fn(),
  ...mockStoreData.authReducer,
  ...mockStoreData.bookReducer.borrowedBooks,
  fetchingBorrowedBooks: false
};
const setUp = () => (shallow(<Dashboard { ...props } />));


describe('Dashboard Component', () => {
  it('should render without crashing', () => {
    const wrapper = setUp();
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper.find('div').length).toBeGreaterThan(0);
  });

  it('should render a ProfileInfo component', () => {
    const wrapper = setUp();
    expect(wrapper.find('ProfileInfo').length).toBe(1);
  });

  it('should render a SuggestedBooks component', () => {
    const wrapper = setUp();
    expect(wrapper.find('SuggestedBooks').length).toBe(1);
  });

  it('should render a Borrowed component', () => {
    const wrapper = setUp();
    expect(wrapper.find('Borrowed').length).toBe(1);
  });

  it('should call the componentDidMount method', () => {
    const wrapper = shallow(<Dashboard {...props} />);
    const componentDidMountSpy = jest.spyOn(
      wrapper.instance(), 'componentDidMount'
    );
    wrapper.instance().componentDidMount();
    expect(componentDidMountSpy).toHaveBeenCalledTimes(1);
  });

  it('should call the handleReturnBook method', () => {
    const wrapper = shallow(<Dashboard {...props} />);
    const handleReturnBookSpy = jest.spyOn(wrapper.instance(), 'handleReturnBook');
    wrapper.instance().handleReturnBook(1);
    expect(handleReturnBookSpy).toHaveBeenCalledTimes(1);
  });

  it('should call the readBook method', () => {
    const wrapper = shallow(<Dashboard {...props} />);
    const readBookSpy = jest.spyOn(wrapper.instance(), 'readBook');
    wrapper.instance().readBook(1);
    expect(readBookSpy).toHaveBeenCalledTimes(1);
  });

  it('should redirect to login page if user is not logged in', () => {
    props = { ...props, isLoggedIn: false };
    const wrapper = shallow(<Dashboard { ...props } />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('LoginRedirect').length).toBeGreaterThan(0);
    expect(wrapper.find('div').length).toBe(0);
  });

  it('should render the connected component', () => {
    const connectedComponent = shallow(
      <ConnectedDashboard { ...props } store={store} />
    );
    expect(connectedComponent.length).toBe(1);
  });
});
