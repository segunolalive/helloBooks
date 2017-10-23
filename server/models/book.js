export default (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    authors: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    total: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    cover: {
      type: DataTypes.STRING,
    },
    bookFile: {
      type: DataTypes.STRING,
    },
    categoryId: {
      type: DataTypes.INTEGER,
    }
  });
  Book.associate = (models) => {
    Book.belongsToMany(models.User, {
      through: 'BorrowedBook',
      foreignKey: 'bookId',
      otherKey: 'userId',
      unique: false,
    });
  };
  Book.associate = (models) => {
    Book.belongsTo(models.BookCategory, {
      as: 'bookCategory',
      foreignKey: 'id',
    });
  };
  return Book;
};
