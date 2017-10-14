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
    membershipType: {
      allowNull: false,
      type: DataTypes.ENUM,
      values: ['bronze', 'silver', 'gold'],
      defaultValue: 'bronze',
    },
  });

  User.beforeCreate(user => hashPassword(user), { individualHooks: true });
  User.beforeUpdate((user) => {
    if (user.changed('password')) {
      user = hashPassword(user);
    }
  });

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
