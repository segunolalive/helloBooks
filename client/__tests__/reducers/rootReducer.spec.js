import rootReducer from '../../reducers/rootReducer';
import initialState from '../../reducers/initialState';
import { logoutUser } from '../../actions/authActions/logout';


describe('Root Reducer', () => {
  it('should return initial state for unkwon action types', () => {
    const action = { type: null };
    const newState = rootReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });

  it('handles action of type LOGOUT', () => {
    const action = logoutUser();
    const newState = rootReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
});
