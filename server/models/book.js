export default (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: DataTypes.STRING,
    authors: DataTypes.STRING,
    total: DataTypes.INTEGER,
    borrowed: DataTypes.INTEGER
  });
  Book.associate = (models) => {
    // Book.belongsT
    Book.belongsToMany(models.User, {
      through: 'bookUsers',
      foreignKey: 'bookId',
      otherKey: 'userId',
    });
  };
  return Book;
};
