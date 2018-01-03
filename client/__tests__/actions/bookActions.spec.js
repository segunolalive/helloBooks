import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import { mockStoreData } from '../__mocks__/mockData';
import { fetchBorrowedBooks,
  returnBook,
  fetchBorrowingHistory,
  getSuggestedBooks,
  readBook
} from '../../actions/bookActions/borrowedBooks';
import { fetchBooks,
  borrowBook,
  getBookCategories,
  filterBooksByCategory,
} from '../../actions/bookActions/library';
import { viewBookDetails } from '../../actions/bookActions/viewBook';
import actionTypes from '../../actions/actionTypes';
import Notify from '../__mocks__/Notify';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);


describe('Book Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('fetchBorrowedBooks', () => {
    it('creates FETCHING_BORROWED_BOOKS and GET_BORROWED_BOOKS actions', () => {
      const books = mockStoreData.bookReducer.borrowedBooks;
      moxios.stubRequest('/api/v1/users/1/books?returned=false', {
        status: 200,
        response: { books }
      });
      const expectedActions = [
        { type: actionTypes.FETCHING_BORROWED_BOOKS, status: true },
        { type: actionTypes.FETCHING_BORROWED_BOOKS, status: false },
        { type: actionTypes.GET_BORROWED_BOOKS, borrowedBooks: books }
      ];
      const store = mockStore({});
      return store.dispatch(fetchBorrowedBooks(1)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('creates FETCHING_BORROWED_BOOKS actions when request fails', () => {
      const borrowedBooks = mockStoreData.bookReducer.borrowedBooks;
      moxios.stubRequest('/api/v1/users/1/books?returned=false', {
        status: 400,
        response: borrowedBooks
      });
      const expectedActions = [
        { type: actionTypes.FETCHING_BORROWED_BOOKS, status: true },
        { type: actionTypes.FETCHING_BORROWED_BOOKS, status: false },
      ];
      const store = mockStore({});
      return store.dispatch(fetchBorrowedBooks(1)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('returnBook', () => {
    it('creates RETURN_BOOK', () => {
      moxios.stubRequest('/api/v1/users/1/books', {
        status: 200,
        response: 1
      });
      const expectedActions = [{ type: actionTypes.RETURN_BOOK, id: 1 }];
      const store = mockStore({});
      return store.dispatch(returnBook(1, 1)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('dispatches no action on request failure', () => {
      moxios.stubRequest('/api/v1/users/1/books', {
        status: 500,
        response: 1
      });
      const expectedActions = [];
      const store = mockStore({});
      return store.dispatch(returnBook(1, 1)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('fetchBorrowingHistory', () => {
    it('it dispatches GET_BORROWED_BOOKS to store', () => {
      const books = mockStoreData.bookReducer.borrowedBooks;
      moxios.stubRequest('/api/v1/users/1/books', {
        status: 200,
        response: { books }
      });
      const expectedActions = [
        { type: actionTypes.GET_BORROWED_BOOKS, borrowedBooks: books }
      ];
      const store = mockStore({});
      return store.dispatch(fetchBorrowingHistory(1)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
    it('it no action on failure', () => {
      const books = mockStoreData.bookReducer.borrowedBooks;
      moxios.stubRequest('/api/v1/users/1/books', {
        status: 500,
        response: { books }
      });
      const expectedActions = [];
      const store = mockStore({});
      return store.dispatch(fetchBorrowingHistory(1)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('viewBookDetails', () => {
    it('dispatches GET_BOOK action', () => {
      const book = mockStoreData.bookReducer.books[0];
      moxios.stubRequest('/api/v1/books/1', {
        status: 200,
        response: { book }
      });
      const expectedActions = [{ type: actionTypes.GET_BOOK, book }];
      const store = mockStore({});
      return store.dispatch(viewBookDetails(1)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('dispatches no action on failure', () => {
      const book = mockStoreData.bookReducer.books[0];
      moxios.stubRequest('/api/v1/books/1', {
        status: 400,
        response: { book }
      });
      const expectedActions = [];
      const store = mockStore({});
      return store.dispatch(viewBookDetails(1)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('fetchBooks', () => {
    it('dispatches GET_BOOK, FETCHING_MORE_BOOKS and SET_LIBRARY_PAGINATION action',
      () => {
        const { books } = mockStoreData.bookReducer;
        const { pagination } = mockStoreData.bookReducer;
        moxios.stubRequest('/api/v1/books', {
          status: 200,
          response: { books, metadata: pagination }
        });
        const expectedActions = [
          { type: actionTypes.FETCHING_MORE_BOOKS, status: true },
          { type: actionTypes.FETCHING_MORE_BOOKS, status: false },
          { type: actionTypes.GET_BOOKS, books },
          { type: actionTypes.SET_LIBRARY_PAGINATION, pagination },
        ];
        const store = mockStore({});
        return store.dispatch(fetchBooks()).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      });

    it('dispatches GET_MORE_BOOKS, FETCHING_MORE_BOOKS and SET_LIBRARY_PAGINATION actions if offset is greater than 0',
      () => {
        const { books } = mockStoreData.bookReducer;
        const { pagination } = mockStoreData.bookReducer;
        moxios.stubRequest('/api/v1/books?offset=4&', {
          status: 200,
          response: { books, metadata: pagination }
        });
        const expectedActions = [
          { type: actionTypes.FETCHING_MORE_BOOKS, status: true },
          { type: actionTypes.FETCHING_MORE_BOOKS, status: false },
          { type: actionTypes.GET_MORE_BOOKS, books },
          { type: actionTypes.SET_LIBRARY_PAGINATION, pagination },
        ];
        const store = mockStore({});
        return store.dispatch(fetchBooks({ offset: 4 })).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      });

    it('dispatches only FETCHING_MORE_BOOKS and SET_LIBRARY_PAGINATION actions if no books were found',
      () => {
        moxios.stubRequest('/api/v1/books', {
          status: 200,
          response: { books: [] }
        });
        const expectedActions = [
          { type: actionTypes.FETCHING_MORE_BOOKS, status: true },
          { type: actionTypes.FETCHING_MORE_BOOKS, status: false }
        ];
        const store = mockStore({});
        return store.dispatch(fetchBooks()).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      });

    it('dispatches only FETCHING_MORE_BOOKS and SET_LIBRARY_PAGINATION actions on failure',
      () => {
        moxios.stubRequest('/api/v1/books?limit=2&', {
          status: 400,
          response: {}
        });
        const expectedActions = [
          { type: actionTypes.FETCHING_MORE_BOOKS, status: true },
          { type: actionTypes.FETCHING_MORE_BOOKS, status: false }
        ];
        const store = mockStore({});
        return store.dispatch(fetchBooks({ limit: 2 })).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      });
  });

  describe('borrowBook', () => {
    it('it dispatches BORROW_BOOK on success', () => {
      moxios.stubRequest('/api/v1/users/1/books', {
        status: 200,
        response: { message: 'success' }
      });
      const expectedActions = [{ type: actionTypes.BORROW_BOOK, id: 1 }];
      const store = mockStore({});
      return store.dispatch(borrowBook(1, 1)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('it dispatches no actions on failure', () => {
      moxios.stubRequest('/api/v1/users/1/books', {
        status: 500,
        response: { message: 'failure' }
      });
      const expectedActions = [];
      const store = mockStore({});
      return store.dispatch(borrowBook(1, 1)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('it dispatches SET_BOOK_QUANTITY_TO_ZERO when book quantity is zer0',
    () => {
      moxios.stubRequest('/api/v1/users/1/books', {
        status: 404,
        response: {
          message: 'There are no available copies of this book at this time'
        }
      });
      const expectedActions = [
        { type: 'SET_BOOK_QUANTITY_TO_ZERO', id: 1 }
      ];
      const store = mockStore({});
      return store.dispatch(borrowBook(1, 1)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('getBookCategories', () => {
    it('dispatches GET_BOOK_CATEGORIES on success', () => {
      const categories = mockStoreData.bookReducer.categories;
      moxios.stubRequest('/api/v1/books/category', {
        status: 200,
        response: { categories, message: 'success' }
      });
      const expectedActions = [
        { type: actionTypes.GET_BOOK_CATEGORIES, categories }
      ];
      const store = mockStore({});
      return store.dispatch(getBookCategories()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('it dispatches no actions on failure', () => {
      moxios.stubRequest('/api/v1/books/category', {
        status: 500,
        response: { message: 'failure' }
      });
      const expectedActions = [];
      const store = mockStore({});
      return store.dispatch(getBookCategories()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('filterBooksByCategory', () => {
    it('dispatches GET_BOOKS on success', () => {
      const books = mockStoreData.bookReducer.books;
      moxios.stubRequest('/api/v1/books?categoryId=1', {
        status: 200,
        response: { books, message: 'success' }
      });
      const expectedActions = [
        { type: actionTypes.GET_BOOKS, books }
      ];
      const store = mockStore({});
      return store.dispatch(filterBooksByCategory(1)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('it dispatches no actions on failure', () => {
      moxios.stubRequest('/api/v1/books?categoryId=1', {
        status: 500,
        response: { message: 'failure' }
      });
      const expectedActions = [];
      const store = mockStore({});
      return store.dispatch(filterBooksByCategory(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('getSuggestedBooks', () => {
    it('dispatches GET_BOOK_SUGGESTIONS on success', () => {
      const suggestions = [{ cover: 'some cover', title: 'title' }];
      moxios.stubRequest('/api/v1/books/suggestions', {
        status: 200,
        response: { suggestions }
      });
      const expectedActions = [
        { type: actionTypes.GET_BOOK_SUGGESTIONS, suggestions }
      ];
      const store = mockStore({});
      return store.dispatch(getSuggestedBooks()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('it dispatches no actions but calls Notify.error on failure', () => {
      moxios.stubRequest('/api/v1/books/suggestions', {
        status: 500,
        response: { message: 'failure' }
      });
      const expectedActions = [];
      const store = mockStore({});
      return store.dispatch(getSuggestedBooks()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        expect(Notify.error).toHaveBeenCalled();
      });
    });
  });

  describe('readBook', () => {
    it('dispatches SET_BOOK_TO_READ', (done) => {
      const url = 'something-made-up';
      const expectedActions = [{ type: actionTypes.SET_BOOK_TO_READ, url }];
      const store = mockStore({});
      store.dispatch(readBook(url));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});
