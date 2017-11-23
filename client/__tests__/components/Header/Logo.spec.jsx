import React from 'react';
import { shallow } from 'enzyme';
import Logo from '../../../components/Header/Logo';


describe('Logo', () => {
  const wrapper = shallow(<Logo />);
  it('should render 1 <Logo /> component', () => {
    expect(wrapper).toHaveLength(1);
  });
  it('should render 1 <Link /> component', () => {
    expect(wrapper.find('Link')).toHaveLength(1);
  });
  it('should render 1 icon tag', () => {
    expect(wrapper.find('i')).toHaveLength(1);
  });
});
