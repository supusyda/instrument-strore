"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.changeColumn("typedetails", "typeKeyMap", {
      type: Sequelize.STRING,
      alowNull: true,
    });
    await queryInterface.changeColumn("typedetails", "isActive", {
      type: Sequelize.BOOLEAN,
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
