import axios from 'axios';

import actionTypes from '../actions/actionTypes';
import API from './api';
import notify from './notify';


const adminNotifications = notifications => ({
  type: actionTypes.GET_ADMIN_NOTIFICATIONS,
  notifications,
});

/**
 * get admin notifications from server
 * @return {Function} dispatches an action creator
 */
export const fetchNotifications = () => dispatch => (
  axios.get(`${API}/admin-notifications`)
    .then(response => dispatch(adminNotifications(response.data.notifications)),
      error => notify.error(error.response.data.message)
    )
    .catch(error => notify.error(error))
);
