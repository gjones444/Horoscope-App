'use strict';
module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
    Name: DataTypes.STRING,
    Birthdate: DataTypes.STRING,
    Zodiac: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
      }
    }
  });
  return Users;
};
