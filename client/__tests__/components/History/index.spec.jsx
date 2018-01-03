import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedHistory, { History } from '../../../components/History';
import { mockStoreData } from '../../__mocks__/mockData';

jest.mock('react-router-dom');

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore(mockStoreData);

const props = {
  fetchHistory: jest.fn(),
  fetchTransactionHistory: jest.fn(),
  id: mockStoreData.authReducer.user.id,
  isLoggedIn: mockStoreData.authReducer.isLoggedIn,
  books: mockStoreData.bookReducer.books,
  transactions: mockStoreData.transactionReducer.transactions,
  location: {}
};

const location = { pathname: '/history/transactions' };


describe('History Component', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<History { ...props }/>);
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper.find('div').length).toBeGreaterThan(0);
  });

  it('should redirect to login page if user is not logged in', () => {
    const loggedout = { ...props, isLoggedIn: false };
    const wrapper = shallow(<History { ...loggedout } />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('LoginRedirect').length).toBe(1);
  });

  it('should call the componentDidMount method', () => {
    const wrapper = shallow(<History { ...props } />);
    const componentDidMountSpy = jest.spyOn(
      wrapper.instance(), 'componentDidMount'
    );
    wrapper.instance().componentDidMount();
    expect(componentDidMountSpy).toHaveBeenCalledTimes(1);
  });

  it('should call the fetchTransactionHistory method when mounted', () => {
    const fetchTransactionHistory = jest.fn();
    const methodProps = { ...props, fetchTransactionHistory };
    const wrapper = shallow(<History {...methodProps } />);
    wrapper.instance().componentDidMount();
    expect(fetchTransactionHistory).toHaveBeenCalled();
    expect(fetchTransactionHistory.mock.calls[0]).toEqual([null, 2]);
  });

  it('should call the fetchTransactionHistory method when mounted', () => {
    const fetchHistory = jest.fn();
    const methodProps = { ...props, fetchHistory };
    const wrapper = shallow(<History {...methodProps } />);
    wrapper.instance().componentDidMount();
    expect(fetchHistory).toHaveBeenCalled();
    expect(fetchHistory.mock.calls[0]).toEqual([2]);
  });

  it('renders one AllBorrowed Component', () => {
    const wrapper = shallow(<History { ...props }/>);
    expect(wrapper.find('AllBorrowed').length).toBe(1);
  });

  it('renders one TransactionHistory Component when url changes to /history/transactions',
    () => {
      const viewTransactions = { ...props, location };
      const wrapper = shallow(<History { ...viewTransactions }/>);
      expect(wrapper.find('TransactionHistory').length).toBe(1);
    });

  it('should render the connected component', () => {
    const connectedComponent = shallow(
      <ConnectedHistory { ...props } store={store} />
    );
    expect(connectedComponent.length).toBe(1);
  });
});
