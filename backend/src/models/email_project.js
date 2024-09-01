"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Email_Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Email_Project.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
    }
  }
  Email_Project.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      project_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      type: {
        type: DataTypes.STRING,
      },
      data: {
        type: DataTypes.TEXT,
      },
      tag: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      },
      subject: {
        type: DataTypes.STRING,
      },
      pre_header: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.STRING,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Email_Project",
      createdAt: "created_at",
      updatedAt: "updated_at",
      tableName: "email_projects",
    }
  );
  return Email_Project;
};
