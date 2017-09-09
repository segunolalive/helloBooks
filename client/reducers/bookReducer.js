import actionTypes from '../actions/actionTypes';

const bookReducer = (state = [], action = {}) => {
  let newState;
  switch (action.type) {
    case actionTypes.GET_BOOK:
      return [...state, action.payload];
    case actionTypes.GET_BOOKS:
      return [...state, action.payload];
    case actionTypes.GET_BORROWED_BOOKS:
      return [...state, action.payload];
    case actionTypes.SEARCH_BOOKS:
      return [...state, action.payload];
    case actionTypes.FILTER_BOOKS_CATEGORY:
      return [...state, action.payload];
    case actionTypes.READ_BOOK:
      return [...state, action.payload];
    case actionTypes.RETURN_BOOK:
      newState = state.filter(book => book.id !== action.payload.book.id);
      return newState;
    case action.DELETE_BOOK:
      newState = state.filter(book => book.id !== action.payload.id);
      return newState;
    default:
      return state;
  }
};

export default bookReducer;
