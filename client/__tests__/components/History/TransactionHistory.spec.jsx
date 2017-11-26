import React from 'react';
import { shallow } from 'enzyme';
import TransactionHistory from '../../../components/History/TransactionHistory';
import { mockStoreData } from '../../__mocks__/mockData';

const props = {
  transactions: mockStoreData.transactionReducer.transactions,
  fetchingTransactions: mockStoreData.transactionReducer.fetchingTransactions,
};

describe('TransactionHistory component', () => {
  const wrapper = shallow(<TransactionHistory { ...props } />);
  it('renders without crashing', () => {
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper.find('div').length).toBeGreaterThan(0);
  });

  it('renders each transaction history in Col component', () => {
    expect(wrapper.find('Col').length).toBeGreaterThan(0);
    expect(wrapper.find('Col').first().props().s)
      .toEqual(12);
    expect(wrapper.find('Col').first().props().children.type)
      .toBe('p');
  });

  it('renders a Link component with text, View Transaction History', () => {
    expect(wrapper.find('Link').length).toBe(1);
    expect(wrapper.find('Link').first().props().children)
      .toEqual('View Borrowing History');
  });

  it('renders a Link component to Borrowing History', () => {
    expect(wrapper.find('Link').first().props().to)
      .toEqual('/history');
  });
});
