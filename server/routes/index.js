const router = require(`express`).Router();

router.use(`/meals`, require(`./mealRoutes`));

router.use(`/`, require(`./userRoutes`));

router.use(`/orders`, require(`./orderRoutes`));

module.exports = router;
