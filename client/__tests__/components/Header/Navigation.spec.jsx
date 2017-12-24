import React from 'react';
import { shallow } from 'enzyme';
import Navigation from '../../../components/Header/Navigation';

jest.mock('react-router-dom');

const props = {
  navLinks: ['home', 'about'],
  activeLink: 'home',
};

describe('Navigation', () => {
  const wrapper = shallow(
    <Navigation { ...props } />
  );
  it('renders an unordered list', () => {
    expect(wrapper.find('ul')).toHaveLength(1);
  });
  it('renders list items', () => {
    expect(wrapper.find('li').length).toBeGreaterThanOrEqual(1);
  });
  it('renders <NavLinks /> items', () => {
    expect(wrapper.find('NavLink').length).toBeGreaterThanOrEqual(1);
  });
});
