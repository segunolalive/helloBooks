export default (sequelize, DataTypes) => {
  const BorrowedBook = sequelize.define('BorrowedBook', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    bookId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    returned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    hooks: {
      afterCreate: (borrowed) => {
        const Book = sequelize.model('Book');
        Book.findById(borrowed.bookId).then((book) => {
          if (book.total > 0) {
            book.update({
              quantity: book.quantity - 1,
            });
          }
        }).catch(error => error);
      }
    }
  });
  return BorrowedBook;
};
