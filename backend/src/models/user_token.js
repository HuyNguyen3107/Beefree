"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User_Token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User_Token.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
    }
  }
  User_Token.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      refresh_token: {
        type: DataTypes.STRING,
      },
      user_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "User_Token",
      createdAt: "created_at",
      updatedAt: "updated_at",
      tableName: "user_tokens",
    }
  );
  return User_Token;
};
