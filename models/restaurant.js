"use strict";
module.exports = function (sequelize, DataTypes) {
  const Restaurant = sequelize.define(
    "restaurants",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      fssailicense: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: true,
      freezeTableName: true,
      tableName: "restaurants",
    }
  );

  return Restaurant;
};
