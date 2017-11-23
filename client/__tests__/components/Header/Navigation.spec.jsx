import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Navigation from '../../../components/Header/Navigation';

const props = {
  navLinks: ['home', 'about'],
  activeLink: 'home',
};

describe('Navigation', () => {
  const wrapper = shallow(
    <Navigation navLinks={props.navLinks} activeLink={props.activeLink} />
  );
  it('renders an unordered list', () => {
    expect(wrapper.find('ul')).toHaveLength(1);
  });
  it('renders list items', () => {
    expect(wrapper.find('li').length).toBeGreaterThanOrEqual(1);
  });
});
