"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("email_projects", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      project_id: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      name: {
        type: Sequelize.STRING(100),
      },
      type: {
        type: Sequelize.STRING(10),
      },
      data: {
        type: Sequelize.TEXT,
      },
      builder_data: {
        type: Sequelize.TEXT,
      },
      tag: {
        type: Sequelize.STRING(200),
      },
      description: {
        type: Sequelize.TEXT,
      },
      subject: {
        type: Sequelize.STRING(190),
      },
      pre_header: {
        type: Sequelize.STRING(130),
      },
      status: {
        type: Sequelize.STRING(30),
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("email_projects");
  },
};
