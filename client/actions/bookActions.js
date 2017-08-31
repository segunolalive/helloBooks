import actionTypes from './actionTypes';

export function getBook (id) {
  return {
    type: actionTypes.GET_BOOK,
    id,
  }
};

export function getBooks () {
  return {
    type: actionTypes.GET_BOOKS,
  }
};

export function readBook (id) {
  return {
    type: actionTypes.READ_BOOK,
    id,
  }
};

export function deleteBook (id) {
  return {
    type: actionTypes.DELETE_BOOK,
    id,
  };
};

export function createBook (payload) {
  return {
    type: actionTypes.CREATE_BOOK,
    payload,
  };
};

export function editBookInfo (payload) {
  return {
    type: actionTypes.EDIT_BOOK_INFO,
    payload,
  };
};

export function borrowBook (id) {
  return {
    type: actionTypes.BORROW_BOOK,
    id,
  };
};

export function returnBook (id) {
  return {
    type: actionTypes.RETURN_BOOK,
    id,
  };
};

export function uploadBookFile (payload) {
  return {
    type: actionTypes.UPLOAD_BOOK_FILE,
    payload,
  }
};

export function uploadBookCover (payload) {
  return {
    type: actionTypes.UPLOAD_BOOK_COVER,
    payload,
  }
};
