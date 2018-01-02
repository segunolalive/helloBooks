import actionTypes from '../actions/actionTypes';
import initialState from './initialState';


/**
 * Reducer that handles user authentication
 *
 * @param {Object} state   initial state for the notification
 *                         section of the store
 * @param {Object} action  the dispatched action
 *
 * @returns {Object}       new state of the notification section of the store
 */
export default (state = initialState.notificationReducer, action) => {
  switch (action.type) {
    case actionTypes.GET_ADMIN_NOTIFICATIONS:
      return { ...state, notifications: action.notifications };
    case actionTypes.GET_MORE_ADMIN_NOTIFICATIONS:
      return {
        ...state,
        notifications: [...state.notifications, ...action.notifications]
      };
    case actionTypes.SET_NOTICATIONS_PAGINATION:
      return { ...state, pagination: action.pagination };
    case actionTypes.IS_FETCHING_NOTIFICATIONS:
      return { ...state, fetchingNotifications: action.status };
    default:
      return state;
  }
};
