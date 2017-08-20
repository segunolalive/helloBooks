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
  });
  return BorrowedBook;
};
