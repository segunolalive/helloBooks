export default {
  authReducer: {
    authLoading: false,
    user: {},
    isLoggedIn: false,
  },
  bookReducer: {
    books: [],
    pagination: {},
    categories: [],
    borrowedBooks: [],
    fetchingBooks: false,
    fetchingBorrowedBooks: false,
  },
  notificationReducer: {
    pagination: {},
    notifications: [],
    fetchingNotifications: false,
  },
  transactionReducer: {
    pagination: {},
    transactions: [],
    allBorrowed: [],
    fetchingHistory: false,
    fetchingTransactions: false,
  }
};
