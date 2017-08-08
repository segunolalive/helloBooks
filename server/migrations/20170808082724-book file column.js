module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Books',
      'bookfile',
      {
        type: Sequelize.STRING,
      }
    );
  },
  down(queryInterface /* , Sequelize */) {
    return queryInterface.dropTable('Books');
  }
};
