import React from 'react';
import { shallow } from 'enzyme';
import Borrowed from '../../../components/Dashboard/Borrowed';
import { mockStoreData } from '../../__mocks__/mockData';

window.BOOK_IMAGE_FALLBACK = 'fallback';

const props = {
  borrowedBooks: mockStoreData.bookReducer.borrowedBooks,
  readBook: jest.fn(() => Promise.resolve()),
  returnBook: jest.fn(() => Promise.resolve()),
  fetchingBorrowedBooks: false,
};


describe('Borrowed Books Component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Borrowed { ...props } />);
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('section');
    expect(wrapper.find('section').length).toBe(1);
    expect(wrapper.find('div').length).toBeGreaterThan(0);
  });

  it('calls readBook when read book button is clicked', () => {
    const wrapper = shallow(<Borrowed { ...props } />);
    const readBookBtn = wrapper.find('Button').at(0);
    readBookBtn.simulate('click');
    expect(props.readBook).toHaveBeenCalled();
  });

  it('calls returnBook when return book button is clicked', () => {
    const wrapper = shallow(<Borrowed { ...props } />);
    const returnBookBtn = wrapper.find('Button').at(1);
    returnBookBtn.simulate('click');
    expect(props.returnBook).toHaveBeenCalled();
  });
});
