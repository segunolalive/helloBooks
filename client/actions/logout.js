import actionTypes from '../actions/actionTypes';


export const logoutUser = () => ({ type: actionTypes.LOGOUT });

/**
 * @param {Function} dispatch - user
 * @returns {Object} - Object containing action type and user
 */
export const logout = () => (dispatch) => {
  sessionStorage.removeItem('token');
  dispatch(logoutUser());
};
