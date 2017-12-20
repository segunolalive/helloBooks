import React from 'react';
import { shallow } from 'enzyme';
import SuggestedBooks from '../../../components/Dashboard/SuggestedBooks';
import { mockStoreData } from '../../__mocks__/mockData';

jest.mock('react-router-dom');
jest.mock('react-materialize');

const props = {
  suggestedBooks: mockStoreData.bookReducer.borrowedBooks,
};

window.BOOK_IMAGE_FALLBACK = 'fallback';


describe('SuggestedBooks component', () => {
  const wrapper = shallow(<SuggestedBooks { ...props } />);
  const propless = shallow(<SuggestedBooks />);
  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.find('Col').length).toBeGreaterThan(0);
  });

  it('renders 2 Col component', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.find('Col').length).toBe(2);
  });

  it('renders figure tag', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.find('figure').length).toBe(1);
  });
  it('renders message if suggestedBooks prop is not passed', () => {
    expect(propless).toBeDefined();
    expect(propless.find('h5').length).toBe(1);
    expect(propless.find('h5').text()).toBe('Nothing here');
  });
});
