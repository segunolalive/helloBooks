import React from 'react';
import { shallow } from 'enzyme';
import BookForm from '../../../components/Admin/BookForm';
import { mockStoreData } from '../../__mocks__/mockData';


const props = {
  categories: mockStoreData.bookReducer.categories,
  heading: 'Add Book',
  book: mockStoreData.bookReducer.books[0],
  imageUploading: false,
  imageUploaded: false,
  errors: {},
  bookFileUploading: false,
  bookFileUploaded: false,
  onBookFileChange: jest.fn(),
  onSelectCategory: jest.fn(),
  onChange: jest.fn(),
  onSubmit: jest.fn(() => Promise.resolve(1)),
  onBookConverChange: jest.fn(),
};

const setUp = () => (shallow(<BookForm { ...props } />));

describe('BookForm Component', () => {
  const wrapper = setUp();
  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
  });

  it('should render a form', () => {
    expect(wrapper.find('form').length).toBe(1);
  });

  it('calls onSelectCategory prop function when a category is selected',
    () => {
      const submitBtn = wrapper.find('Categories').at(0);
      submitBtn.simulate('change');
      expect(props.onSelectCategory).toHaveBeenCalled();
    });

  it('calls onSubmit prop function when submit button is clicked',
    () => {
      const submitBtn = wrapper.find('input[type="submit"]').at(0);
      submitBtn.simulate('click');
      expect(props.onSubmit).toHaveBeenCalled();
    });

  it('calls onBookFileChange prop function when book is loaded to form',
    () => {
      const bookFileInput = wrapper.find('input[name="bookFile"]').at(0);
      bookFileInput.simulate('change');
      expect(props.onBookFileChange).toHaveBeenCalled();
    });

  it('calls onBookConverChange prop function when book cover is loaded to form',
    () => {
      const bookCoverInput = wrapper.find('input[name="cover"]').at(0);
      bookCoverInput.simulate('change');
      expect(props.onBookConverChange).toHaveBeenCalled();
    });

  it('calls onChange prop function when form fields change value', () => {
    const textInput = wrapper.find('input[type="text"]').at(0);
    textInput.simulate('change');
    expect(props.onChange).toHaveBeenCalled();

    const authorsInput = wrapper.find('input[name="authors"]').at(0);
    authorsInput.simulate('change');
    expect(props.onChange).toHaveBeenCalled();

    const textAreaInput = wrapper.find('textarea').at(0);
    textAreaInput.simulate('change');
    expect(props.onChange).toHaveBeenCalled();

    const numberInput = wrapper.find('input[type="number"]').at(0);
    numberInput.simulate('change');
    expect(props.onChange).toHaveBeenCalled();
  });
});
