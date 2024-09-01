"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("users", {
      name: "users_provider_id_foreign",
      type: "foreign key",
      fields: ["provider_id"],
      references: {
        table: "providers",
        field: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("users", "users_provider_id_foreign");
  },
};
