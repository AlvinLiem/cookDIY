"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Meal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Meal.hasMany(models.Order);
    }
  }
  Meal.init(
    {
      idMeal: DataTypes.STRING,
      strMeal: DataTypes.STRING,
      strCategory: DataTypes.STRING,
      strArea: DataTypes.STRING,
      strInstructions: DataTypes.STRING,
      strMealThumb: DataTypes.STRING,
      strYoutube: DataTypes.STRING,
      ingredient: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Meal",
    }
  );
  return Meal;
};
