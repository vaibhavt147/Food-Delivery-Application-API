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
      phonenumber: {
        type: DataTypes.INTEGER,
        unique: true,
      },
      emailid: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
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
