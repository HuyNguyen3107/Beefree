"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Blacklist_Token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Blacklist_Token.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      token: {
        type: DataTypes.TEXT,
      },
      expired: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Blacklist_Token",
      createdAt: "created_at",
      updatedAt: "updated_at",
      tableName: "blacklist_token",
    }
  );
  return Blacklist_Token;
};
