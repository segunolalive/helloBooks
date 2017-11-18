import deepclone from 'deepclonejs';
import actionTypes from '../actions/actionTypes';

const bookReducer = (state = { pagination: {} }, action = {}) => {
  let newState, books, borrowedBooks;
  switch (action.type) {
    case actionTypes.RETURN_BOOK:
      borrowedBooks = state.borrowedBooks.filter(book =>
        book.id !== action.id
      );
      return { ...state, borrowedBooks };
    case actionTypes.GET_ALL_BORROWED:
      return { ...state, allBorrowed: action.books };
    case actionTypes.GET_BORROWED_BOOKS:
      return { ...state, borrowedBooks: action.borrowedBooks };
    case actionTypes.GET_TRANSACTION_HISTORY:
      return { ...state, transactions: action.transactions };
    case actionTypes.GET_BOOK:
      return { ...state, currentBook: action.book };
    case actionTypes.GET_BOOKS:
      return { ...state, books: action.books };
    case actionTypes.GET_MORE_BOOKS:
      return { ...state, books: [...state.books, ...action.books] };
    case actionTypes.BORROW_BOOK:
      books = deepclone(state.books);
      books = books.map((book) => {
        if (book.id === action.id) {
          book.total -= 1;
        }
        return book;
      });
      return { ...state, books };
    case actionTypes.FETCH_MORE_BOOKS:
      return { ...state, fetchingBooks: action.status };
    case actionTypes.GET_BOOK_CATEGORIES:
      return { ...state, categories: action.categories };
    case actionTypes.SEARCH_BOOKS:
      return { ...state, books: action.books };
    case actionTypes.FILTER_BOOKS_CATEGORY:
      return { ...state, books: action.books };
    case actionTypes.READ_BOOK:
      return { ...state, readBook: action.book };
    case action.DELETE_BOOK:
      newState = state.filter(book => book.id !== action.id);
      return newState;
    case actionTypes.SET_PAGINATION:
      return { ...state, pagination: action.pagination };
    default:
      return state;
  }
};

export default bookReducer;
