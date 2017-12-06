import deepclone from 'deepclonejs';
import actionTypes from '../actions/actionTypes';
import initialState from './initialState';


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
    case actionTypes.RETURN_BOOK:
      borrowedBooks = state.borrowedBooks.filter(book =>
        book.id !== action.id
      );
      return { ...state, borrowedBooks };
    case actionTypes.GET_BOOK:
      return { ...state, currentBook: action.book };
    case actionTypes.GET_BOOKS:
      return { ...state, books: action.books };
    case actionTypes.GET_MORE_BOOKS:
      return { ...state, books: [...state.books, ...action.books] };
    case actionTypes.FETCHING_MORE_BOOKS:
      return { ...state, fetchingBooks: action.status };
    case actionTypes.GET_BOOK_CATEGORIES:
      return { ...state, categories: action.categories };
    case actionTypes.DELETE_BOOK:
      return state.books.filter(book => book.id !== action.id);
    case actionTypes.SET_LIBRARY_PAGINATION:
      return { ...state, pagination: action.pagination };
    default:
      return state;
  }
};

export default bookReducer;
