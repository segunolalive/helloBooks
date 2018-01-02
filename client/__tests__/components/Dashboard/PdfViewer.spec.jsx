import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedPdfViewer, { PdfViewer }
  from '../../../components/Dashboard/PdfViewer';
import { mockStoreData } from '../../__mocks__/mockData';

jest.mock('react-pdf-js');
window.BOOK_FALLBACK = 'some-url';

const props = {
  bookUrl: 'some-book-url',
  isLoggedIn: true,
};

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({ ...mockStoreData });

const setUp = () => shallow(<PdfViewer { ...props } />);

describe('PdfViewer Component', () => {
  it('renders without crashing', () => {
    const wrapper = setUp();
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
  });

  it('should render the connected component', () => {
    const connectedComponent = shallow(
      <ConnectedPdfViewer { ...props } store={store} />
    );
    expect(connectedComponent.length).toBe(1);
  });

  it('should call onDocumentComplete when file is loaded', () => {
    const wrapper = setUp();
    const onDocumentCompleteSpy = jest.spyOn(
      wrapper.instance(), 'onDocumentComplete'
    );
    wrapper.instance().onDocumentComplete(44);
    expect(onDocumentCompleteSpy).toHaveBeenCalledTimes(1);
    expect(wrapper.state().pages).toBe(44);
  });

  it('should call onPageComplete when file is loaded', () => {
    const wrapper = setUp();
    const onPageCompleteSpy = jest.spyOn(
      wrapper.instance(), 'onPageComplete'
    );
    wrapper.instance().onPageComplete(1);
    expect(onPageCompleteSpy).toHaveBeenCalledTimes(1);
    expect(wrapper.state().page).toBe(1);
  });

  it('should call onDocumentError if file load encounters an error', () => {
    const wrapper = setUp();
    const onPageCompleteSpy = jest.spyOn(
      wrapper.instance(), 'onDocumentError'
    );
    wrapper.instance().onDocumentError(new Error('failed to load pdf'));
    expect(onPageCompleteSpy).toHaveBeenCalledTimes(1);
    expect(wrapper.state().fileError).toBe(true);
  });

  it('should call setPage when page is manually inserted', () => {
    const wrapper = setUp();
    const setPageSpy = jest.spyOn(
      wrapper.instance(), 'setPage'
    );
    const event = {
      nextentDefault: jest.fn(),
      target: {
        value: '55'
      }
    };
    wrapper.instance().setPage(event);
    expect(setPageSpy).toHaveBeenCalledTimes(1);
    expect(wrapper.state().page).toBe(55);
  });

  it('should decrement page by one when handlePrevious is called', () => {
    const wrapper = setUp();
    wrapper.setState({ page: 2 });
    wrapper.instance().handlePrevious();
    expect(wrapper.state().page).toBe(1);
  });

  it('should increment page by one when handlePrevious is called', () => {
    const wrapper = setUp();
    wrapper.setState({ page: 4 });
    wrapper.instance().handleNext();
    expect(wrapper.state().page).toBe(5);
  });
});
