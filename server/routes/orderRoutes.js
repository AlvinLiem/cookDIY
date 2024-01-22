const { authentication } = require("../middleware/authentication");
const OrderController = require(`../Controllers/OrderController`);

const router = require(`express`).Router();

router.use(authentication);

router.get(`/`, OrderController.list);

router.post(`/:MealId`, OrderController.buy);

router.delete(`/:id`, OrderController.del);

module.exports = router;
