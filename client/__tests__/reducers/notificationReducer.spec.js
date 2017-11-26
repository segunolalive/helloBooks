import notificationReducer from '../../reducers/notificationReducer';
import initialState from '../../reducers/initialState';
import { setLoginStatus, loginUser } from '../../actions/adminActions/books';
import { adminNotifications,
  moreAdminNotifications,
  setPagination,
  fetchingNotifications,
  fetchNotifications } from '../../actions/adminActions/notifications';


let action;
let newState;
const notifications = ['new notification'];
const moreNotifications = ['newer notification'];
const pagination = {
  pageSize: 1,
  pageNumber: 1,
  pageCount: 1,
  total: 1
};

describe('Notification Reducer', () => {
  it('should return initial state for unknown action types', () => {
    action = { type: null };
    newState = notificationReducer(initialState.notificationReducer, action);
    expect(newState).toEqual(initialState.notificationReducer);
    expect(newState.fetchingNotifications).toEqual(false);
  });
  it('should handle actions of type GET_ADMIN_NOTIFICATIONS', () => {
    action = adminNotifications(notifications);
    newState = notificationReducer(initialState.notificationReducer, action);
    expect(newState).not.toEqual(initialState.notificationReducer);
    expect(newState.notifications).toEqual(notifications);
  });
  it('should handle actions of type GET_MORE_ADMIN_NOTIFICATIONS', () => {
    action = moreAdminNotifications(moreNotifications);
    newState = notificationReducer(initialState.notificationReducer, action);
    expect(newState).not.toEqual(initialState.notificationReducer);
    expect(newState.notifications[0]).toEqual(moreNotifications[0]);
    expect(JSON.stringify(newState.notifications))
      .toEqual(JSON.stringify(moreNotifications));
    expect(newState.notifications).toHaveLength(1)
  });
  it('should handle actions of type SET_NOTICATIONS_PAGINATION', () => {
    action = setPagination(pagination);
    newState = notificationReducer(initialState.notificationReducer, action);
    expect(newState).not.toEqual(initialState.notificationReducer);
    expect(newState.pagination).toEqual(pagination);
  });
  it('should handle actions of type IS_FETCHING_NOTIFICATIONS', () => {
    action = fetchingNotifications(true);
    newState = notificationReducer(initialState.notificationReducer, action);
    expect(newState).not.toEqual(initialState.notificationReducer);
    expect(newState.fetchingNotifications).toEqual(true);
  });
});
