import React from 'react';
import { shallow } from 'enzyme';
import AddCategoryForm from '../../../components/Admin/AddCategoryForm';

const props = {
  className: 'foo',
  onSubmit: jest.fn(),
};

const setUp = () => (shallow(<AddCategoryForm { ...props } />));


describe('AddCategoryForm Component', () => {
  const wrapper = setUp();
  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
  });

  it('should render a form', () => {
    expect(wrapper.find('form').length).toBe(1);
  });

  it('should render an Input Component of type text', () => {
    expect(wrapper.find('Input').length).toBe(1);
    expect(wrapper.find('Input').props().type).toBe('text');
  });

  it('should render a Button Componet', () => {
    expect(wrapper.find('Button').length).toBe(1);
  });

  it('calls onSubmit when form is submitted', () => {
    const form = wrapper.find('form').at(0);
    form.simulate('submit');
    expect(props.onSubmit).toHaveBeenCalled();
  });
});
