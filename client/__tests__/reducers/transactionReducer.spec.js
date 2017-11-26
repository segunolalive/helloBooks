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
  transactions: [{}, {}]
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
});
