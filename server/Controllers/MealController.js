const { Meal } = require(`../models/index`);

class MealController {
  static async list(req, res, next) {
    try {
      const data = await Meal.findAll();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async detail(req, res, next) {
    try {
      const { id } = req.params;
      const data = await Meal.findByPk(id);

      if (!data) {
        throw { name: `Data not Found` };
      }
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MealController;
