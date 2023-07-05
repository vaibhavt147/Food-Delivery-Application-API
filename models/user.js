"use strict";
module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define(
    "users",
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
      phonenumber: {
        type: DataTypes.INTEGER,
        unique: true,
      },
      emailid: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      timestamps: true,
      freezeTableName: true,
      tableName: "users",
    }
  );

  return User;
};
