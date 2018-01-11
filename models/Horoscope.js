'use strict';
module.exports = function(sequelize, DataTypes) {
  var Horoscope_Tables = sequelize.define('Horoscope_Tables', {
    Zodiac: DataTypes.STRING,
    Todays_horoscope: DataTypes.STRING,
    description: DataTypes.STRING,
    date_range: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
      }
    }
  });
  return Horoscope_Tables;
};
