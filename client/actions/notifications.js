import axios from 'axios';

import actionTypes from '../actions/actionTypes';
import API from './api';
import notify from './notify';
import queryStringFromObject from '../utils/queryStringFromObject';


const adminNotifications = notifications => ({
  type: actionTypes.GET_ADMIN_NOTIFICATIONS,
  notifications,
});

const moreAdminNotifications = notifications => ({
  type: actionTypes.GET_MORE_ADMIN_NOTIFICATIONS,
  notifications,
});


const setPagination = pagination => ({
  type: actionTypes.SET_NOTICATIONS_PAGINATION,
  pagination,
});

/**
 * @param  {Bool} status
 * @return {Object}      action object
 */
const fetchingNotifications = status => ({
  type: actionTypes.IS_FETCHING_NOTIFICATIONS,
  status,
});


/**
 * get admin notifications from server
 * @param {object} options
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
    },
    error => notify.error(error.response.data.message)
    )
    .catch(error => notify.error(error));
};
