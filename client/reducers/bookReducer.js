import actionTypes from '../actions/actionTypes';

const bookReducer = (state = [], action = {}) => {
  let newState;
  switch (action.type) {
    case action.GET_BOOK:
      return action.payload;
    case action.GET_BOOKS:
      return action.payload;
    case action.SEARCH_BOOKS:
      return action.payload;
    case action.FILTER_BOOKS_CATEGORY:
      return action.payload;
    case action.READ_BOOK:
      return action.payload;
    case action.RETURN_BOOK:
      newState = state.map((book) => {
        if (book.id === action.payload.id) {
          book.
        }
      });
      return newState;
    case action.DELETE_BOOK:
      newState = state.filter(book => book.id !== action.payload.id);
      return newState;
    default:
      return state;
  }
};

export default bookReducer;
