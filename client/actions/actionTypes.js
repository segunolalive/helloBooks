import keyMirror from './keyMirror';

const actionList = [
  'SIGN_UP',
  'LOGIN',
  'UPDATE_PROFILE',
  'GET_BOOK',
  'GET_BOOKS',
  'BORROW_BOOK',
  'RETURN_BOOK',
  'CREATE_BOOK',
  'READ_BOOK',
  'EDIT_BOOK_INFO',
  'DELETE_BOOK',
  'UPLOAD_BOOK_FILE',
  'UPLOAD_BOOK_COVER',
  'SAVE_STATE',
  'GET_SAVED_STATE'
];


const actionTypes = keyMirror(actionList);

export default actionTypes;
