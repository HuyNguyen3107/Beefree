"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Page_Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Page_Project.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
    }
  }
  Page_Project.init(
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
      builder_data: {
        type: DataTypes.TEXT,
      },
      tag: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      },
      meta_title: {
        type: DataTypes.STRING,
      },
      meta_description: {
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
      modelName: "Page_Project",
      createdAt: "created_at",
      updatedAt: "updated_at",
      tableName: "page_projects",
    }
  );
  return Page_Project;
};
