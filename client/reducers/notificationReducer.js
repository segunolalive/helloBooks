import actionTypes from '../actions/actionTypes';

export default (state = [], action = {}) => {
  switch (action.type) {
    case actionTypes.GET_ADMIN_NOTIFICATIONS:
      return action.notifications;
    default:
      return state;
  }
};
