import actionTypes from '../actions/actionTypes';

export default (state = { pagination: {} }, action) => {
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
