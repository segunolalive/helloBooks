import actionTypes from '../actions/actionTypes';


export const logoutUser = () => ({ type: actionTypes.LOGOUT });

/**
 * @param {Function} dispatch
 * @returns {Object} Object containing action type
 */
export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch(logoutUser());
};
