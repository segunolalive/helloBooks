import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { Header } from '../../../components/Header';

jest.mock('react-router-dom');

describe('Header', () => {
  const props = {
    user: { isAdmin: true }
  };
  const wrapper = shallow(<Header { ...props } />);
  it('should render 1 Header tag', () => {
    expect(wrapper.find('header')).toHaveLength(1);
  });
});
