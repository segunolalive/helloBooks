import { logoutUser } from '../../actions/logout';
import actionTypes from '../../actions/actionTypes';


describe('LOGOUT', () => {
  it('should create an action with type of LOGOUT', () => {
    const expected = { type: actionTypes.LOGOUT };
    expect(logoutUser()).toEqual(expected);
  });
});
