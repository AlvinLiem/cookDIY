const MealController = require("../Controllers/MealController");

const router = require(`express`).Router();

router.get(`/`, MealController.list);

router.get(`/:id`, MealController.detail);

module.exports = router;
