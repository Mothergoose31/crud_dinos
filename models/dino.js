'use strict';
module.exports = (sequelize, DataTypes) => {
  const dino = sequelize.define('dino', {
    name: DataTypes.STRING,
    enviroment: DataTypes.STRING,
    image: DataTypes.STRING
  }, {});
  dino.associate = function(models) {
    // associations can be defined here
  };
  return dino;
};