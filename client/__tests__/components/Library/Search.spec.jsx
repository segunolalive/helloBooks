import React from 'react';
import { shallow } from 'enzyme';
import Search from '../../../components/Library/Search';


const props = {
  className: 'search',
  onClick: jest.fn(),
  onChange: jest.fn(),
  onSubmit: jest.fn(),
};


describe('Search Component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Search { ...props } />);
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper.find('div').length).toBeGreaterThan(0);
  });

  it('renders an input field of type search', () => {
    const wrapper = shallow(<Search { ...props } />);
    expect(wrapper.find('input').length).toBe(1);
    expect(wrapper.find('input').first().props().type).toBe('search');
  });

  it('calls onChange prop function when search input value changes', () => {
    const wrapper = shallow(<Search { ...props } />);
    const searchField = wrapper.find('input[type="search"]').at(0);
    searchField.simulate('change');
    expect(props.onChange).toHaveBeenCalled();
  });

  it('calls onSubmit prop function when search-btn div is clicked', () => {
    const wrapper = shallow(<Search { ...props } />);
    const searchBtnDiv = wrapper.find('.search-btn-wrapper').at(0);
    searchBtnDiv.simulate('click');
    expect(props.onClick).toHaveBeenCalled();
  });

  it('calls onSubmit prop function when form is submitted', () => {
    const wrapper = shallow(<Search { ...props } />);
    const searchForm = wrapper.find('form').at(0);
    searchForm.simulate('submit');
    expect(props.onSubmit).toHaveBeenCalled();
  });
});
