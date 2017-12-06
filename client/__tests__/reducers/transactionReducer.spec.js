import transactionReducer from '../../reducers/transactionReducer';
import initialState from '../../reducers/initialState';
import { fetchHistoryAction,
  fetchingHistory,
  getTransactionHistory,
  getMoreTransactionHistory,
  fetchingTransactions,
  setTransactionPagination
} from '../../actions/history';

let action,
  newState;

const history = {
  allBorrowed: [{ id: 1 }, { id: 2 }],
  transactions: [{}, {}],
  pagination: { pageSize: 1, pageNumber: 2, total: 10 },
};

describe('Transaction Reducer', () => {
  it('should return initial state for unknown action types', () => {
    action = { type: null };
    newState = transactionReducer(initialState.transactionReducer,
      action);
    expect(newState).toEqual(initialState.transactionReducer);
  });

  it('should handle actions of type GET_ALL_BORROWED', () => {
    action = fetchHistoryAction(history.allBorrowed);
    newState = transactionReducer(initialState.transactionReducer, action);
    expect(newState).not.toEqual(initialState.transactionReducer);
    expect(newState.allBorrowed).toEqual(history.allBorrowed);
  });

  it('should handle actions of type FETCHING_HISTORY', () => {
    action = fetchingHistory(true);
    newState = transactionReducer(initialState.transactionReducer, action);
    expect(newState).not.toEqual(initialState.transactionReducer);
    expect(newState.fetchingHistory).toEqual(true);
  });

  it('should handle actions of type GET_TRANSACTION_HISTORY', () => {
    action = getTransactionHistory(history.transactions);
    newState = transactionReducer(initialState.transactionReducer, action);
    expect(newState).not.toEqual(initialState.transactionReducer);
    expect(newState.transactions).toEqual(history.transactions);
  });

  it('should handle actions of type GET_MORE_TRANSACTIONS', () => {
    const moreTransactions = [{ userId: 1, bookId: 4 }];
    action = getMoreTransactionHistory(moreTransactions);
    initialState.transactionReducer.transactions = history.transactions;
    newState = transactionReducer(initialState.transactionReducer, action);
    expect(newState).not.toEqual(initialState.transactionReducer);
    expect(newState.transactions).toEqual([...history.transactions, ...moreTransactions]);
  });

  it('should handle actions of type SET_TRANSACTIONS_PAGINATION', () => {
    action = setTransactionPagination(history.pagination);
    newState = transactionReducer(initialState.transactionReducer, action);
    expect(newState).not.toEqual(initialState.transactionReducer);
    expect(newState.pagination).toEqual(history.pagination);
  });

  it('should handle actions of type FETCHING_TRANSACTIONS', () => {
    action = fetchingTransactions(true);
    newState = transactionReducer(initialState.transactionReducer, action);
    expect(newState).not.toEqual(initialState.transactionReducer);
    expect(newState.fetchingTransactions).toEqual(true);
  });
});
