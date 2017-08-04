export default (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: {
      allowNull: false,
      type: DataTypes.STRING,
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
    borrowed: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });
  Book.associate = (models) => {
    Book.belongsToMany(models.User, {
      through: 'bookUsers',
      foreignKey: 'bookId',
      otherKey: 'userId',
    });
  };
  return Book;
};
