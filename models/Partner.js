"use strict";
module.exports = function (sequelize, DataTypes) {
  const Partner = sequelize.define(
    "partners",
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
      email: {
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
      tableName: "partners",
    }
  );

  return Partner;
};
