export default {
  user: {
    firstName: 'firstName',
    lastName: 'lastName',
    username: 'username',
    password: 'password',
    email: 'email@email.com',
  },
  authResponse: {
    message: 'Welcome back Segun',
    id: 1,
    isAdmin: true,
    name: 'Segun',
    email: 'segun@ola.com',
    token: 'eyJhbGci.I6MQ0fQ.mqnk8I'
  },
};

export const mockStoreData = {
  authReducer: {
    user: {
      id: 2,
      firstName: 'segun',
      lastName: 'ola',
      isAdmin: true,
    },
    isLoggedIn: true
  },
  bookReducer: {
    categories: [
      { id: 1, category: 'javascript' },
      { id: 2, category: 'ruby' },
    ],
    borrowedBooks: [{
      id: 1,
      title: 'awesome',
      author: 'temi',
    }],
    books: [
      {
        id: 1,
        authors: 'temi, segun',
        title: 'awesome',
        cover: 'https://image/upload/cloudinary-stub/to2ila7jbe.jpg',
        total: 10,
      },
      {
        id: 2,
        title: 'awesome book',
        author: 'temitayo',
      },
    ],
    fetchingBorrowedBooks: false,
    pagination: {
      pageNumber: 1,
      pageCount: 1,
      pageSize: 10,
      total: 10,
    }
  },
  transactionReducer: {
    transactions: [
      {
        id: 1,
        type: 'return',
        bookTitle: 'fish',
        username: 'Segun',
        createdAt: '2017-11-24T12:24:28.753Z',
        updatedAt: '2017-11-24T12:24:28.753Z'
      }
    ],
    allBorrowed: [
      {
        id: 1,
        borrowedBook: {
          userId: 1,
          bookId: 1,
          returned: true,
          createdAt: '2017-11-08T15:25:43.271Z',
          updatedAt: '2017-11-23T10:20:59.699Z',
        }
      }
    ],
    pagination: {
      pageNumber: 1,
      pageCount: 1,
      pageSize: 10,
      total: 10,
    },
    fetchingHistory: false,
    fetchingTransactions: false,
  },
  notificationReducer: {
    pagination: {
      pageNumber: 1,
      pageCount: 1,
      pageSize: 10,
      total: 10,
    },
    notifications: [
      {
        id: 2,
        type: 'return',
        bookTitle: 'hellob thrrerertetrtt .',
        username: 'Segun',
        createdAt: '2017-11-25T16:45:26.258Z',
        updatedAt: '2017-11-25T16:45:26.258Z',
      }, {
        id: 1,
        type: 'borrow',
        bookTitle: 'hellob thrrerertetrtt .',
        username: 'Segun',
        createdAt: '2017-12-25T16:45:26.258Z',
        updatedAt: '2017-12-25T16:45:26.258Z',
      },
    ]
  }
};

export const GOOGLE_CLIENT_ID = '1234knbndhuhy485757';
