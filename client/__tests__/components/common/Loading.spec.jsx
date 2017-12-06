import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import Loading from '../../../components/common/Loading';


describe('Loading', () => {
  const wrapper = shallow(<Loading />);
  it('renders properly with defaults', () => {
    const LoadingComponent = renderer.create(<Loading />).toJSON();
    expect(LoadingComponent).toMatchSnapshot();
  });

  it('renders text prop passed to it', () => {
    const LoadingComponent = renderer
      .create(<Loading text="fetching"/>).toJSON();
    expect(LoadingComponent).toMatchSnapshot();
  });
  it('should render 1 ProgressBar component', () => {
    expect(wrapper.find('ProgressBar')).toHaveLength(1);
  });
  it('should render 1 Row component', () => {
    expect(wrapper.find('Row')).toHaveLength(1);
  });
  it('should render text prop within a strong tag', () => {
    const withProps = shallow(<Loading text="hello" />);
    expect(withProps.find('strong').text()).toEqual('hello');
  });
});
