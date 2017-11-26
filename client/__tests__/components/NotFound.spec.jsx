import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../components/Header';
import NotFound from '../../components/NotFound';

describe('NotFound', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper.find('div').length).toBeGreaterThan(0);
  });

  it('renders an h2 tag with text, Not Found', () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper.find('h2').at(0).props().children).toBe('Not Found');
  });

  it('renders a Header Component', () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper.find(Header).length).toBe(1);
  });
});
