"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Password_Token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Password_Token.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
    }
  }
  Password_Token.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      reset_token: {
        type: DataTypes.STRING,
      },
      expired: {
        type: DataTypes.STRING,
      },
      user_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Password_Token",
      createdAt: "created_at",
      updatedAt: "updated_at",
      tableName: "password_tokens",
    }
  );
  return Password_Token;
};
