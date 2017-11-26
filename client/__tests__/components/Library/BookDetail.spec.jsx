import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedBookDetail, { BookDetail }
  from '../../../components/Library/BookDetail';
import { mockStoreData } from '../../__mocks__/mockData';


jest.mock('react-router-dom');
jest.mock('react-materialize');

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore(mockStoreData);

const props = {
  userId: 2,
  isAdmin: true,
  book: mockStoreData.bookReducer.books[0],
  borrowBook: jest.fn(),
  deleteBook: jest.fn(() => Promise.resolve()),
  viewBookDetails: jest.fn(),
  match: { params: { id: 1 } },
};


describe('BookDetail Component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<BookDetail { ...props } />);
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper.find('div').length).toBeGreaterThan(0);
  });

  it('should call the componentDidMount method', () => {
    const wrapper = shallow(<BookDetail { ...props } />);
    const componentDidMountSpy = jest.spyOn(
      wrapper.instance(), 'componentDidMount'
    );
    wrapper.instance().componentDidMount();
    expect(componentDidMountSpy).toHaveBeenCalledTimes(1);
  });

  it('should call the viewBookDetails method when mounted', () => {
    const viewBookDetails = jest.fn();
    const methodProps = { ...props, viewBookDetails };
    const wrapper = shallow(<BookDetail {...methodProps } />);
    wrapper.instance().componentDidMount();
    expect(viewBookDetails).toHaveBeenCalled();
    expect(viewBookDetails.mock.calls[0]).toEqual([1]);
  });

  it('should call handleBorrow when the borrow book button is clicked', () => {
    const wrapper = shallow(<BookDetail { ...props } />);
    const handleBorrowSpy = jest.spyOn(wrapper.instance(), 'handleBorrow');
    const event = { preventDefault: jest.fn() };
    wrapper.instance().handleBorrow(event);
    expect(handleBorrowSpy).toHaveBeenCalledTimes(1);
    expect(props.borrowBook).toHaveBeenCalledTimes(1);
  });

  it('calls handleEditClick method when edit button is clicked', () => {
    const wrapper = shallow(<BookDetail { ...props } />);
    const handleEditClickSpy = jest.spyOn(wrapper.instance(),
      'handleEditClick');
    wrapper.instance().handleEditClick();
    expect(handleEditClickSpy).toHaveBeenCalledTimes(1);
    expect(wrapper.state().editRedirect).toBe(true);
  });

  it('sets editRedirect in state when edit button is clicked', () => {
    const wrapper = shallow(<BookDetail { ...props } />);
    const editBtn = wrapper.find('.edit-btn').at(0);
    editBtn.simulate('click');
    expect(wrapper.state().editRedirect).toBe(true);
  });

  it('should call handleDelete when the delete button is clicked', () => {
    const wrapper = shallow(<BookDetail { ...props } />);
    const handleDeleteSpy = jest.spyOn(wrapper.instance(), 'handleDelete');
    const event = { preventDefault: jest.fn() };
    wrapper.instance().handleDelete(event);
    expect(handleDeleteSpy).toHaveBeenCalledTimes(1);
  });

  it('should render the connected component', () => {
    const connectedComponent = shallow(
      <ConnectedBookDetail { ...props } store={store} />
    );
    expect(connectedComponent.length).toBe(1);
  });
});
