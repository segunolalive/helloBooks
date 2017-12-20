import React from 'react';
import { shallow } from 'enzyme';
import BorrowedTable from '../../../components/History/BorrowedTable';
import { mockStoreData } from '../../__mocks__/mockData';

window.BOOK_IMAGE_FALLBACK = 'fallback';

const props = { books: mockStoreData.transactionReducer.allBorrowed };

describe('BorrowedTable Component', () => {
  const wrapper = shallow(<BorrowedTable { ...props } />);
  it('renders without crashing', () => {
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper.find('div').length).toBe(2);
  });

  it('renders a table', () => {
    expect(wrapper.find('table').length).toBe(1);
  });

  it('renders table with the first header containing the text, Cover', () => {
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper.find('th').first().text()).toEqual('Cover');
  });
});
