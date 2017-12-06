import authReducer from '../../reducers/authReducer';
import initialState from '../../reducers/initialState';
import { setLoginStatus, loginUser } from '../../actions/authActions/login';
import { authLoading, signUpUser } from '../../actions/authActions/signup';


let action;
let newState;
const user = { id: 2, name: 'segun' };

describe('Auth Reducer', () => {
  it('should return initial state for unkwon action types', () => {
    action = { type: null };
    newState = authReducer(initialState.authReducer, action);
    expect(newState).toEqual(initialState.authReducer);
    expect(newState.isLoggedIn).toEqual(false);
    expect(newState.authLoading).toEqual(false);
    expect(newState.user).toEqual({});
  });
  it('should handle action with type AUTH_LOADING', () => {
    action = authLoading(true);
    newState = authReducer(initialState.authReducer, action);
    expect(newState.authLoading).toEqual(true);
  });
  it('should handle action with type LOGIN', () => {
    action = loginUser(user);
    newState = authReducer(initialState.authReducer, action);
    expect(newState.user).toEqual(user);
  });
  it('should handle action with type SIGN_UP', () => {
    action = signUpUser(user);
    newState = authReducer(initialState.authReducer, action);
    expect(newState.user).toEqual(user);
  });
  it('should handle action with type SET_LOGIN_STATUS', () => {
    action = setLoginStatus(true);
    newState = authReducer(initialState.authReducer, action);
    expect(newState.isLoggedIn).toEqual(true);
  });
});
