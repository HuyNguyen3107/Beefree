"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      first_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(200),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(200),
      },
      avatar: {
        type: Sequelize.STRING(300),
      },
      status: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      provider_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      access_token: {
        type: Sequelize.STRING(500),
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
    await queryInterface.dropTable("users");
  },
};
