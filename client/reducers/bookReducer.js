import deepclone from 'deepclonejs';
import actionTypes from '../actions/actionTypes';
import initialState from './initialState';


/**
 * Reducer that handles book actions
 *
 * @param {Object} state   initial state for the auth section of the store
 * @param {Object} action  the dispatched action
 *
 * @returns {Object}       new state of the book section of the store
 */
const bookReducer = (state = initialState.bookReducer, action) => {
  let books, borrowedBooks;
  switch (action.type) {
    case actionTypes.FETCHING_BORROWED_BOOKS:
      return { ...state, fetchingBorrowedBooks: action.status };
    case actionTypes.GET_BORROWED_BOOKS:
      return { ...state, borrowedBooks: action.borrowedBooks };
    case actionTypes.BORROW_BOOK:
      books = deepclone(state.books);
      books = books.map((book) => {
        if (book.id === action.id) {
          book.total -= 1;
        }
        return book;
      });
      return { ...state, books };
    case actionTypes.SET_BOOK_QUANTITY_TO_ZERO:
      books = deepclone(state.books);
      books = books.map((book) => {
        if (book.id === action.id) {
          book.total = 0;
        }
        return book;
      });
      return { ...state, books };
    case actionTypes.RETURN_BOOK:
      borrowedBooks = state.borrowedBooks.filter(book =>
        book.id !== action.id
      );
      return { ...state, borrowedBooks };
    case actionTypes.GET_BOOK:
      return { ...state, currentBook: action.book };
    case actionTypes.GET_BOOKS:
      return { ...state, books: action.books };
    case actionTypes.CREATE_BOOK:
      return { ...state, books: [...state.books, action.book] };
    case actionTypes.EDIT_BOOK_INFO:
      books = state.books.filter(book => book.id !== action.book.id);
      return { ...state, books: [...books, action.book] };
    case actionTypes.GET_BOOK_SUGGESTIONS:
      return { ...state, suggestedBooks: action.suggestions };
    case actionTypes.GET_MORE_BOOKS:
      return { ...state, books: [...state.books, ...action.books] };
    case actionTypes.FETCHING_MORE_BOOKS:
      return { ...state, fetchingBooks: action.status };
    case actionTypes.ADD_BOOK_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, action.category]
      };
    case actionTypes.GET_BOOK_CATEGORIES:
      return { ...state, categories: action.categories };
    case actionTypes.DELETE_BOOK:
      books = state.books.filter(book => book.id !== action.id);
      return { ...state, books };
    case actionTypes.SET_LIBRARY_PAGINATION:
      return { ...state, pagination: action.pagination };
    case actionTypes.SET_BOOK_TO_READ:
      return { ...state, bookToRead: action.url };
    default:
      return state;
  }
};

export default bookReducer;
