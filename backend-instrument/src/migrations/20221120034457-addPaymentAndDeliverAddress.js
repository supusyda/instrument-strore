"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("receipts", "payment", {
      type: Sequelize.TEXT,
      alowNull: true,
    });
    await queryInterface.addColumn("receipts", "deliverAdress", {
      type: Sequelize.TEXT,
      alowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
