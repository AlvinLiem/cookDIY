"use strict";

const formatData = require("../helpers/fetchDataMealDB");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let data = await formatData(1);
    data.map((el) => {
      el.createdAt = el.updatedAt = new Date();
      return el;
    });
    await queryInterface.bulkInsert(`Meals`, data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Meals", null, {
      restartIdentity: true,
    });
  },
};
