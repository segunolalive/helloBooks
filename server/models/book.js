'use strict';
module.exports = function(sequelize, DataTypes) {
  var Book = sequelize.define('Book', {
    title: DataTypes.STRING,
    authors: DataTypes.STRING,
    total: DataTypes.INTEGER,
    borrowed: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Book;
};