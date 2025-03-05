const router = require("express").Router();
const paymentController = require("../controllers/payment-controller")
const bodyParser = require("body-parser")
const userMiddleware = require('../middlewares/user-middleware')


router.use(bodyParser.json())

router.route("/create/:roomId").post(userMiddleware, paymentController.createPayment);
router.route("/verify").post(userMiddleware, paymentController.verifyPayment);
router.route("/reciept/:paymentId").get(userMiddleware, paymentController.generateReciept)

module.exports = router;