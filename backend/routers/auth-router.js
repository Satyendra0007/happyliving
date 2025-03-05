const express = require("express")
const authController = require("../controllers/auth-controller")
const userMiddleware = require("../middlewares/user-middleware")
const multer = require("multer")
const { body } = require("express-validator")

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router()

router.route("/login").post(
  body("email").notEmpty().isString().isEmail(),
  body("password").notEmpty().isString().isLength({ min: 8 }),
  authController.logIn)

router.route("/signup").post(upload.single('image'),
  body("name").notEmpty().isString(),
  body("email").notEmpty().isString().isEmail(),
  body("phone").notEmpty().isString().isLength(10),
  body("password").notEmpty().isString().isLength({ min: 8 }),
  authController.signUp)

router.route("/user").get(userMiddleware, authController.getUserData)
router.route("/receipt").get(userMiddleware, authController.getReciepts)

module.exports = router