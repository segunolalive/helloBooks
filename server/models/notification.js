export default (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    type: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    bookTitle: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING,
    }
  });
  return Notification;
};
