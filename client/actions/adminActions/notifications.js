import axios from 'axios';

import actionTypes from '../actionTypes';
import API from '../api';
import queryStringFromObject from '../../utils/queryStringFromObject';
import reportNetworkError from '../reportNetworkError';


/**
 * @param  {Object} notifications
 *
 * @return {Object}      action object
 */
export const adminNotifications = notifications => ({
  type: actionTypes.GET_ADMIN_NOTIFICATIONS,
  notifications,
});

/**
 * @param  {Array} notifications
 *
 * @return {Object}      action object
 */
export const moreAdminNotifications = notifications => ({
  type: actionTypes.GET_MORE_ADMIN_NOTIFICATIONS,
  notifications,
});

/**
 * @param  {Object} pagination
 *
 * @return {Object}      action object
 */
export const setPagination = pagination => ({
  type: actionTypes.SET_NOTICATIONS_PAGINATION,
  pagination,
});

/**
 * @param  {Bool} status
 *
 * @return {Object}      action object
 */
export const fetchingNotifications = status => ({
  type: actionTypes.IS_FETCHING_NOTIFICATIONS,
  status,
});


/**
 * get admin notifications from server
 *
 * @param {Object} options
 *
 * @return {Function} dispatches an action creator
 */
export const fetchNotifications = options => (dispatch) => {
  const query = queryStringFromObject(options);
  const notificationAction = options && options.offset && options.offset > 0 ?
    moreAdminNotifications : adminNotifications;
  dispatch(fetchingNotifications(true));
  return axios.get(`${API}/admin-notifications${query}`)
    .then((response) => {
      dispatch(setPagination(response.data.metadata));
      dispatch(notificationAction(response.data.notifications));
      dispatch(fetchingNotifications(false));
    })
    .catch((error) => {
      dispatch(fetchingNotifications(false));
      reportNetworkError(error);
    });
};
