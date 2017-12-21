import actionTypes from '../actionTypes';


export const logoutUser = () => ({ type: actionTypes.LOGOUT });

/**
 * @param {Function} dispatch
 * @returns {Object} Object containing action type
 */
export default () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch(logoutUser());
};
