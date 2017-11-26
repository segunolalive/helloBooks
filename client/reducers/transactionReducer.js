import actionTypes from '../actions/actionTypes';
import initialState from './initialState';


export default (state = initialState.transactionReducer, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_BORROWED:
      return { ...state, allBorrowed: action.books };
    case actionTypes.FETCHING_HISTORY:
      return { ...state, fetchingHistory: action.status };
    case actionTypes.GET_TRANSACTION_HISTORY:
      return { ...state, transactions: action.transactions };
    case actionTypes.GET_MORE_TRANSACTIONS:
      return {
        ...state,
        transactions: [...state.transactions, ...action.transactions]
      };
    case actionTypes.SET_TRANSACTIONS_PAGINATION:
      return { ...state, pagination: action.pagination };
    case actionTypes.FETCHING_TRANSACTIONS:
      return { ...state, fetchingTransactions: action.status };
    default:
      return state;
  }
};
