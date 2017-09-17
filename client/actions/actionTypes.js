import keyMirror from './keyMirror';

const actionList = [
  'SIGN_UP',
  'LOGIN',
  'LOGOUT',
  'SET_LOGIN_STATUS',
  'UPDATE_PROFILE',
  'GET_BOOK',
  'GET_BOOKS',
  'GET_BORROWED_BOOKS',
  'GET_BOOK_CATEGORIES',
  'BORROW_BOOK',
  'RETURN_BOOK',
  'CREATE_BOOK',
  'READ_BOOK',
  'EDIT_BOOK_INFO',
  'DELETE_BOOK',
  'UPLOAD_BOOK_FILE',
  'UPLOAD_BOOK_COVER',
  'SAVE_STATE',
  'GET_SAVED_STATE',
  'GET_ADMIN_NOTIFICATIONS',
];


const actionTypes = keyMirror(actionList);

export default actionTypes;
