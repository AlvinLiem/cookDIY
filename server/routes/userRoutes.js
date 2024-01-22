const PaymentController = require("../Controllers/PaymentController");
const UserController = require("../Controllers/UserController");
const { authentication } = require("../middleware/authentication");

const router = require(`express`).Router();

router.post(`/register`, UserController.register);

router.post(`/login`, UserController.login);

router.post(`/google-login`, UserController.googleLogin);

router.post(
  `/payment/midtrans/notification`,
  PaymentController.getMidtransNotifications
);

router.use(authentication);

router.get(`/users`, UserController.profile);

router.put(`/users`, UserController.editProfile);

router.post(`/payment/midtrans/token/:id`, PaymentController.getMidtransToken);

module.exports = router;
