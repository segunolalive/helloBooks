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
    category: {
      type: DataTypes.STRING,
    },
    cover: {
      type: DataTypes.STRING,
    },
    bookfile: {
      type: DataTypes.STRING,
    },
    total: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });
  Book.associate = (models) => {
    Book.belongsToMany(models.User, {
      through: 'BorrowedBook',
      foreignKey: 'bookId',
      otherKey: 'userId',
    });
  };
  return Book;
};
