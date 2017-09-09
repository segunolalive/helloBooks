import actionTypes from '../actions/actionTypes';

const bookReducer = (state = {}, action = {}) => {
  let newState;
  switch (action.type) {
    case actionTypes.RETURN_BOOK:
      newState = state.borrowedBooks.filter(book =>
        book.id !== action.id
      );
      return { ...state, borrowedBooks: newState };
    case actionTypes.GET_BORROWED_BOOKS:
      return { ...state, borrowedBooks: action.borrowedBooks };
    case actionTypes.GET_BOOK:
      return [...state, action.payload]; // FIXME:
    case actionTypes.GET_BOOKS:
      return [...state, action.payload]; // FIXME:
    case actionTypes.SEARCH_BOOKS:
      return [...state, action.payload]; // FIXME:
    case actionTypes.FILTER_BOOKS_CATEGORY:
      return [...state, action.payload]; // FIXME:
    case actionTypes.READ_BOOK:
      return [...state, action.payload]; // FIXME:
    case action.DELETE_BOOK:
      newState = state.filter(book => book.id !== action.payload.id);
      return newState;
    default:
      return state;
  }
};

export default bookReducer;
