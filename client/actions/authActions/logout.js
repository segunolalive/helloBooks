import actionTypes from '../actionTypes';


export const logoutUser = () => ({ type: actionTypes.LOGOUT });

/**
 * action creator for logging a user out
 *
 * @returns {Function} function that dispatches a logout action
 */
export default () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch(logoutUser());
};
