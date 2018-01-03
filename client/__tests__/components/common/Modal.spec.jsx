import React from 'react';
import { shallow } from 'enzyme';

import Modal from '../../../components/common/Modal';

const props = {
  title: 'title',
  question: 'question',
  subText: 'subText',
  confirmColor: 'confirmColor',
  cancelColor: 'cancelColor',
  confirmText: 'confirmText',
  cancelText: 'cancelText',
  modalAction: jest.fn()
};

describe('Modal', () => {
  const wrapper = shallow(<Modal { ...props } />);
  it('renders without crashing', () => {
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper.find('div').length).toBeGreaterThan(1);
  });

  it('calls modalAction prop function when a confirm button is clicked', () => {
    const confirmButton = wrapper.find('button').at(0);
    confirmButton.simulate('click');
    expect(wrapper.instance().props.modalAction).toHaveBeenCalled();
  });
});
