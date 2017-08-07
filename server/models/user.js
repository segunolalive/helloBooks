module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    // isAdmin: {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: false,
    // },
  });

  User.associate = (models) => {
    User.belongsToMany(models.Book, {
      through: 'bookUsers',
      foreignKey: 'userId',
      otherKey: 'bookId',
    });
  };
  return User;
};
