import React from 'react';
import { shallow } from 'enzyme';
import AllBorrowed from '../../../components/History/AllBorrowed';
import { mockStoreData } from '../../__mocks__/mockData';

const props = {
  books: mockStoreData.transactionReducer.allBorrowed,
  fetchingHistory: mockStoreData.transactionReducer.fetchingHistory,
};

describe('AllBorrowed Component', () => {
  const wrapper = shallow(<AllBorrowed { ...props } />);
  it('renders without crashing', () => {
    expect(wrapper.find('div').length).toBe(3);
  });

  it('renders a BorrowedTable component', () => {
    expect(wrapper.find('BorrowedTable').length).toBe(1);
  });

  it('renders a Link component with text, View Transaction History', () => {
    expect(wrapper.find('Link').length).toBe(1);
    expect(wrapper.find('Link').first().props().children)
      .toEqual('View Transaction History');
  });

  it('renders a Link component to Transaction History', () => {
    expect(wrapper.find('Link').length).toBe(1);
    expect(wrapper.find('Link').first().props().to)
      .toEqual('/history/transactions');
  });

  it('renders an h4 tag with the text, Your Borrowed Books', () => {
    expect(wrapper.find('h4').first().text()).toEqual('Your Borrowed Books');
  });
});
