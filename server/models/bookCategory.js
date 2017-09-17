export default (sequelize, DataTypes) => {
  const BookCategory = sequelize.define('BookCategory', {
    category: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
  });
  BookCategory.associate = (models) => {
    BookCategory.hasMany(models.Book, {
      foreignKey: 'BookCategory',
      as: 'books',
    });
  };
  return BookCategory;
};
