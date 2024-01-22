"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Meals", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      idMeal: {
        type: Sequelize.STRING,
      },
      strMeal: {
        type: Sequelize.STRING,
      },
      strCategory: {
        type: Sequelize.STRING,
      },
      strArea: {
        type: Sequelize.STRING,
      },
      strInstructions: {
        type: Sequelize.TEXT,
      },
      strMealThumb: {
        type: Sequelize.STRING,
      },
      strYoutube: {
        type: Sequelize.STRING,
      },
      ingredient: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Meals");
  },
};
