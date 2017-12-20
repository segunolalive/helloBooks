import React from 'react';
import { shallow } from 'enzyme';
import BooksTable from '../../../components/Library/BooksTable';
import { mockStoreData } from '../../__mocks__/mockData';

window.BOOK_IMAGE_FALLBACK = 'fallback';

const props = {
  borrowBook: jest.fn(),
  bookList: mockStoreData.bookReducer.books,
  tableHeaders: ['Cover', 'Title', 'Author(s)', 'Copies Available', 'Action']
};


describe('BooksTable Component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<BooksTable { ...props } />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('Table').length).toBe(1);
  });

  it('renders table headers with tableHeader prop items', () => {
    const wrapper = shallow(<BooksTable { ...props } />);
    expect(wrapper.find('thead tr th').at(0).text()).toBe('Cover');
    expect(wrapper.find('thead tr th').at(1).text()).toBe('Title');
    expect(wrapper.find('thead tr th').at(4).text()).toBe('Action');
  });

  it('renders an empty table if no books are passed', () => {
    const noBooks = { ...props, books: [] };
    const wrapper = shallow(<BooksTable { ...noBooks } />);
    expect(wrapper.find('tbody tr').length).toBe(0);
  });
});
