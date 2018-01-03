import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedAdmin, { Admin } from '../../../components/Admin/';
import { mockStoreData } from '../../__mocks__/mockData';


const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({ ...mockStoreData });

const props = {
  user: mockStoreData.authReducer.user,
  book: mockStoreData.bookReducer.books[0],
  categories: mockStoreData.bookReducer.categories,
  notifications: mockStoreData.notificationReducer.notifications,
  pagination: mockStoreData.notificationReducer.pagination,
  addBook: jest.fn(() => Promise.resolve(1)),
  editBook: jest.fn(() => Promise.resolve(1)),
  getBookCategories: jest.fn(),
  fetchNotifications: jest.fn(),
  addBookCategory: jest.fn(),
  history: { push: jest.fn() },
  location: { pathname: '/admin/edit' },
  uploadFile: jest.fn(() => Promise.resolve(1)),
};

const setUp = () => (shallow(<Admin { ...props } />));

describe('Admin Component', () => {
  it('renders without crashing', () => {
    const wrapper = setUp();
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
  });

  it('should redirect to login page if not admin user', () => {
    const notAdmin = { ...props, user: { ...props.user, isAdmin: false } };
    const wrapper = shallow(<Admin { ...notAdmin } />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('Redirect').length).toBe(1);
    expect(wrapper.find('Redirect').props().to).toBe('/login');
  });

  it('should render one BookForm component', () => {
    const wrapper = setUp();
    expect(wrapper.find('BookForm').length).toBe(1);
  });

  it('should renders a prefilled BookForm component on edit-mode', () => {
    const wrapper = setUp();
    expect(wrapper.find('BookForm').props().book.title).toBe(props.book.title);
    expect(wrapper.find('BookForm').props().book.total).toBe(props.book.total);
  });

  it('should renders a empty BookForm component on add-mode', () => {
    const methodProps = {
      ...props,
      location: { ...location, pathname: '/admin' }
    };
    const wrapper = shallow(<Admin { ...methodProps } />);
    expect(wrapper.find('BookForm').props().book.title).toBe('');
    expect(wrapper.find('BookForm').props().book.description).toBe('');
    expect(wrapper.find('BookForm').props().book.total).toBe(0);
  });

  it('should render one AddCategoryForm component', () => {
    const wrapper = setUp();
    expect(wrapper.find('AddCategoryForm').length).toBe(1);
  });

  it('should render one InfiniteScroll component', () => {
    const wrapper = setUp();
    expect(wrapper.find('InfiniteScroll').length).toBe(1);
  });

  it('should render one Notifications component', () => {
    const wrapper = setUp();
    expect(wrapper.find('Notifications').length).toBe(1);
  });

  it('should call the componentDidMount method', () => {
    const wrapper = setUp();
    const componentDidMountSpy = jest.spyOn(
      wrapper.instance(), 'componentDidMount'
    );
    wrapper.instance().componentDidMount();
    expect(componentDidMountSpy).toHaveBeenCalledTimes(1);
  });

  it('should call the fetchNotifications prop function when mounted', () => {
    const fetchNotifications = jest.fn();
    const methodProps = { ...props, fetchNotifications };
    const wrapper = shallow(<Admin {...methodProps } />);
    wrapper.instance().componentDidMount();
    expect(props.fetchNotifications).toHaveBeenCalled();
  });

  it('should call the componentWillReceiveProps method', () => {
    const wrapper = setUp();
    const componentWillReceivePropsSpy = jest.spyOn(
      wrapper.instance(), 'componentWillReceiveProps'
    );
    wrapper.instance().componentWillReceiveProps(props);
    expect(componentWillReceivePropsSpy).toHaveBeenCalledTimes(1);
  });

  it('should call handleFieldChange when input field values change', () => {
    const wrapper = setUp();
    const handleFieldChangeSpy = jest.spyOn(
      wrapper.instance(), 'handleFieldChange'
    );
    const event = {
      preventDefault: jest.fn(),
      target: {
        value: 'Tolu',
        name: 'value'
      }
    };
    wrapper.instance().handleFieldChange(event);
    expect(handleFieldChangeSpy).toHaveBeenCalledTimes(1);
  });

  it('should call handleImageChange when new image is loaded to form', () => {
    const wrapper = setUp();
    const handleImageChangeSpy = jest.spyOn(
      wrapper.instance(), 'handleImageChange'
    );
    const event = {
      preventDefault: jest.fn(),
      target: {
        files: ['Tolu', 'some other weird stuff'],
        name: 'value'
      }
    };
    expect(wrapper.state().cover).toBe(undefined);
    expect(wrapper.state().book.cover).toBe(props.book.cover);

    wrapper.instance().handleImageChange(event);
    expect(handleImageChangeSpy).toHaveBeenCalledTimes(1);
    expect(wrapper.state().cover).toBe('Tolu');
    expect(wrapper.state().book.cover).not.toBe(undefined);
    expect(wrapper.state().errors).toEqual({});
  });

  it('should call handleFileChange when new book is loaded to form', () => {
    const wrapper = setUp();
    const handleFileChangeSpy = jest.spyOn(
      wrapper.instance(), 'handleFileChange'
    );
    const event = {
      preventDefault: jest.fn(),
      target: {
        files: ['Tolu', 'some other weird stuff'],
        name: 'value'
      }
    };
    expect(wrapper.state().bookFile).toBe(undefined);
    expect(wrapper.state().book.bookFile).toBe('');

    wrapper.instance().handleFileChange(event);
    expect(handleFileChangeSpy).toHaveBeenCalledTimes(1);
    expect(wrapper.state().bookFile).toBe('Tolu');
    expect(wrapper.state().book.bookFile).not.toBe(undefined);
    expect(wrapper.state().errors).toEqual({});
  });

  it('should call handleFormSubmission on form submission for editing book',
    () => {
      const wrapper = setUp();
      const handleFormSubmissionSpy = jest.spyOn(
        wrapper.instance(), 'handleFormSubmission'
      );
      const event = {
        preventDefault: jest.fn(),
      };
      expect(wrapper.state().book.bookFile).toBe('');

      wrapper.instance().handleFormSubmission(event);
      expect(handleFormSubmissionSpy).toHaveBeenCalledTimes(1);
      expect(wrapper.state().book.bookFile).toBe('');
      expect(wrapper.state().book.total).toBe(props.book.total);
      expect(wrapper.state().book.categoryId).toBe(0);
    });

  it('should set error state if handleFormSubmission is called with invalid data',
    () => {
      const addBookProps = { ...props, location: { pathname: '/admin' } };
      const wrapper = shallow(<Admin {...addBookProps} />);
      const handleFormSubmissionSpy = jest.spyOn(
        wrapper.instance(), 'handleFormSubmission'
      );
      const event = {
        preventDefault: jest.fn(),
      };
      wrapper.instance().handleFormSubmission(event);
      expect(handleFormSubmissionSpy).toHaveBeenCalledTimes(1);
      expect(wrapper.state().errors.title).toBe('Book must have a title');
      expect(wrapper.state().errors.authors)
        .toBe('Book must have at least one author');
      expect(wrapper.state().book.categoryId).toBe(0);
    });

  it('should call handleFormSubmission on form submission for adding book',
    () => {
      const addBookProps = {
        ...props,
        book: { ...props.book, title: 'diffing algorithms' },
        location: { pathname: '/admin' }
      };
      const wrapper = shallow(<Admin {...addBookProps} />);
      wrapper.setState({
        book: { ...wrapper.state().books, ...addBookProps.book }
      });

      const handleFormSubmissionSpy = jest.spyOn(
        wrapper.instance(), 'handleFormSubmission'
      );
      const event = {
        preventDefault: jest.fn(),
      };
      wrapper.instance().handleFormSubmission(event);
      expect(handleFormSubmissionSpy).toHaveBeenCalledTimes(1);
      expect(wrapper.state().book.total).toBe(10);
      expect(wrapper.state().book.title).toBe('diffing algorithms');
      expect(wrapper.state().book.cover)
        .toBe('https://image/upload/cloudinary-stub/to2ila7jbe.jpg');
    });

  it('should call handleSelectCategory when a category is selected', () => {
    const wrapper = setUp();
    const handleSelectCategorySpy = jest.spyOn(
      wrapper.instance(), 'handleSelectCategory'
    );
    const event = {
      preventDefault: jest.fn(),
      target: {
        value: 1,
      }
    };
    wrapper.instance().handleSelectCategory(event);
    expect(handleSelectCategorySpy).toHaveBeenCalledTimes(1);
    expect(wrapper.state().book.categoryId).toBe(1);
  });

  it('calls handleAddCategory when adding new category', () => {
    const wrapper = setUp();
    const handleAddCategorySpy = jest.spyOn(
      wrapper.instance(), 'handleAddCategory'
    );
    const event = {
      preventDefault: jest.fn(),
      target: {
        category: { value: '1' },
      }
    };
    wrapper.instance().handleAddCategory(event);
    expect(handleAddCategorySpy).toHaveBeenCalledTimes(1);
  });

  it('should call handleFetchNotifications', () => {
    const wrapper = setUp();
    const handleFetchNotificationsSpy = jest.spyOn(
      wrapper.instance(), 'handleFetchNotifications'
    );
    wrapper.instance().handleFetchNotifications();
    expect(handleFetchNotificationsSpy).toHaveBeenCalledTimes(1);
  });

  it('should render the connected component', () => {
    const connectedComponent = shallow(
      <ConnectedAdmin { ...props } store={store} />
    );
    expect(connectedComponent.length).toBe(1);
  });
});
