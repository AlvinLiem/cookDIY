const { Order, Meal } = require(`../models/index`);
const { Op } = require(`sequelize`);

class OrderController {
  static async buy(req, res, next) {
    try {
      const { MealId } = req.params;
      const UserId = req.user.id;

      const meal = await Meal.findByPk(MealId);
      if (!meal) {
        throw { name: `Data not Found` };
      }

      const orderId = `CDIY-${Date.now()}-${UserId}-${MealId}`;

      const order = await Order.create({ MealId, UserId, orderId });

      res.status(201).json(order);
    } catch (error) {
      next(error);
    }
  }

  static async list(req, res, next) {
    try {
      const UserId = req.user.id;

      const orders = await Order.findAll({
        include: Meal,
        where: { UserId },
      });

      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }

  static async del(req, res, next) {
    try {
      const { id } = req.params;
      const UserId = req.user.id;

      const order = await Order.findByPk(id);

      if (!order) {
        throw { name: `Data not Found` };
      }

      if (req.user.role !== `admin`) {
        if (order.UserId !== UserId) {
          throw { name: `Forbidden Access` };
        }
      }

      await Order.destroy({
        where: { [Op.and]: [{ id }, { UserId }] },
      });

      res.status(200).json({ message: `Order canceled` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = OrderController;
