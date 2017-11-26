import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedLibrary, { Library } from '../../../components/Library';
import { mockStoreData } from '../../__mocks__/mockData';


jest.mock('react-router-dom');

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore(mockStoreData);

const props = {
  id: mockStoreData.authReducer.user.id,
  books: mockStoreData.bookReducer.books,
  categories: mockStoreData.bookReducer.categories,
  pagination: mockStoreData.bookReducer.pagination,
  borrowBook: jest.fn(),
  fetchBooks: jest.fn(),
  getBookCategories: jest.fn(),
  filterBooksByCategory: jest.fn(),
};

const setUp = () => (shallow(<Library { ...props } />));


describe('Library Component', () => {
  it('should render without crashing', () => {
    const wrapper = setUp();
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper.find('div').length).toBeGreaterThan(0);
  });

  it('should render one InfiniteScroll component', () => {
    const wrapper = setUp();
    expect(wrapper.find('InfiniteScroll').length).toBe(1);
  });

  it('should render one BooksTable component', () => {
    const wrapper = setUp();
    expect(wrapper.find('BooksTable').length).toBe(1);
  });

  it('should render one Search component', () => {
    const wrapper = setUp();
    expect(wrapper.find('Search').length).toBe(1);
  });

  it('should render one Categories component', () => {
    const wrapper = setUp();
    expect(wrapper.find('Categories').length).toBe(1);
  });

  it('should call the componentDidMount method', () => {
    const wrapper = setUp();
    const componentDidMountSpy = jest.spyOn(
      wrapper.instance(), 'componentDidMount'
    );
    wrapper.instance().componentDidMount();
    expect(componentDidMountSpy).toHaveBeenCalledTimes(1);
  });

  it('should call the fetchBooks method when mounted', () => {
    const fetchBooks = jest.fn();
    const methodProps = { ...props, fetchBooks };
    const wrapper = shallow(<Library {...methodProps } />);
    wrapper.instance().componentDidMount();
    expect(fetchBooks).toHaveBeenCalled();
  });

  it('should call the getBookCategories method when mounted', () => {
    const getBookCategories = jest.fn();
    const methodProps = { ...props, getBookCategories };
    const wrapper = shallow(<Library {...methodProps } />);
    wrapper.instance().componentDidMount();
    expect(getBookCategories).toHaveBeenCalled();
  });

  it('should call the componentWillReceiveProps method', () => {
    const wrapper = setUp();
    const componentWillReceivePropsSpy = jest.spyOn(
      wrapper.instance(), 'componentWillReceiveProps'
    );
    wrapper.instance().componentWillReceiveProps(props);
    expect(componentWillReceivePropsSpy).toHaveBeenCalledTimes(1);
  });

  it('should call handleSearchChange when search input value changes', () => {
    const wrapper = setUp();
    const handleSearchChangeSpy = jest.spyOn(
      wrapper.instance(), 'handleSearchChange'
    );
    const event = {
      preventDefault: jest.fn(),
      target: {
        value: 'Tolu',
      }
    };
    wrapper.instance().handleSearchChange(event);
    expect(handleSearchChangeSpy).toHaveBeenCalledTimes(1);
  });

  it('calls handleSearch when search is submitted', () => {
    const wrapper = setUp();
    wrapper.setState({ search: 'foo' });
    const handleSearchSpy = jest.spyOn(
      wrapper.instance(), 'handleSearch'
    );
    const event = {
      preventDefault: jest.fn(),
    };
    wrapper.instance().handleSearch(event);
    expect(handleSearchSpy).toHaveBeenCalledTimes(1);
  });

  it('should call handleSelectCategory when a category is selected', () => {
    const wrapper = setUp();
    const handleSelectCategorySpy = jest.spyOn(
      wrapper.instance(), 'handleSelectCategory'
    );
    const event = {
      preventDefault: jest.fn(),
      target: {
        value: 'Tolu',
      }
    };
    wrapper.instance().handleSelectCategory(event);
    expect(handleSelectCategorySpy).toHaveBeenCalledTimes(1);
  });

  it('calls handleBorrowBook when borrow book button is clicked', () => {
    const wrapper = setUp();
    const handleBorrowBookSpy = jest.spyOn(
      wrapper.instance(), 'handleBorrowBook'
    );
    const event = {
      preventDefault: jest.fn(),
    };
    wrapper.instance().handleBorrowBook(event);
    expect(handleBorrowBookSpy).toHaveBeenCalledTimes(1);
  });

  it('calls handleFetchBooks when borrow book button is clicked', () => {
    const wrapper = setUp();
    const handleFetchBooksSpy = jest.spyOn(
      wrapper.instance(), 'handleFetchBooks'
    );
    wrapper.instance().handleFetchBooks();
    expect(handleFetchBooksSpy).toHaveBeenCalledTimes(1);
  });

  it('should render the connected component', () => {
    const connectedComponent = shallow(
      <ConnectedLibrary { ...props } store={store} />
    );
    expect(connectedComponent.length).toBe(1);
  });
});
