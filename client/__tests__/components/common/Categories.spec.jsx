import React from 'react';
import { shallow } from 'enzyme';
import Categories from '../../../components/common/Categories';
import { mockStoreData } from '../../__mocks__/mockData';


const props = {
  className: 'search',
  text: 'string',
  onChange: jest.fn(),
  categories: mockStoreData.bookReducer.categories,
};

describe('Categories Component', () => {
  const wrapper = shallow(<Categories { ...props } />);
  it('renders without crashing', () => {
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper.find('div').length).toBeGreaterThan(0);
  });

  it('renders an Input component with  type prop of select', () => {
    expect(wrapper.find('Input').length).toBe(1);
    expect(wrapper.find('Input').first().props().type)
      .toEqual('select');
  });

  it('calls onChange prop function when a category is selected', () => {
    const category = wrapper.find('Input').at(0);
    category.simulate('change');
    expect(props.onChange).toHaveBeenCalled();
  });

  it('renders just two select option nodes if no cattegories', () => {
    const disabledProps = { ...props, categories: [] };
    const disabledWrapper = shallow(<Categories { ...disabledProps } />);
    expect(disabledWrapper.find('option').length).toBe(2);
    expect(disabledWrapper.find('option').at(0).props().disabled).toBe(true);
  });
});
