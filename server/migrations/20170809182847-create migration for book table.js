module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('Books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      authors: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      total: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      category: {
        type: Sequelize.STRING,
      },
      cover: {
        type: Sequelize.STRING,
      },
      bookFile: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
  },
  down(queryInterface /* , Sequelize */) {
    return queryInterface.dropTable('Books');
  }
};
