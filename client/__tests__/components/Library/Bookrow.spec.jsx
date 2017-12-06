import React from 'react';
import { shallow } from 'enzyme';
import BookRow from '../../../components/Library/BookRow';
import { mockStoreData } from '../../__mocks__/mockData';

const CLOUDINARY_IMG_URL_STUB = 'cloudinary-stub';

const props = {
  ...mockStoreData.bookReducer.books[0],
  onButtonClick: jest.fn()
};


describe('BookRow Component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<BookRow { ...props } />);
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('tr');
  });

  it('renders a tr element', () => {
    const wrapper = shallow(<BookRow { ...props } />);
    expect(wrapper.getElement().type).toBe('tr');
    expect(wrapper.find('tr').length).toBe(1);
  });

  it('renders an image tag in the first table cell', () => {
    const wrapper = shallow(<BookRow { ...props } />);
    expect(wrapper.find('td').at(0).props().children.type).toBe('img');
  });

  it('renders a Button Component', () => {
    const wrapper = shallow(<BookRow { ...props } />);
    expect(wrapper.find('Button').length).toBe(1);
    expect(wrapper.find('Button').props().disabled).toBe(false);
    expect(wrapper.find('Button').props().children).toBe('Borrow');
  });

  it('calls the onButtonClick function prop when button is clicked', () => {
    const wrapper = shallow(<BookRow { ...props } />);
    const button = wrapper.find('Button').at(0);
    button.simulate('click');
    expect(props.onButtonClick).toHaveBeenCalled();
  });
});
