module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Books',
      'cover',
      {
        type: Sequelize.STRING,
      }
    );
  },
  down(queryInterface /* , Sequelize */) {
    return queryInterface.dropTable('Books');
  }
};
