import { hashPassword } from '../helpers/helpers';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: { isEmail: true, }
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  User.beforeCreate(user => hashPassword(user), { individualHooks: true });

  User.associate = (models) => {
    User.belongsToMany(models.Book, {
      through: 'BorrowedBook',
      foreignKey: 'userId',
      otherKey: 'bookId',
      unique: false,
    });
  };
  return User;
};
