const express = require('express')
const adminController = require("../controllers/admin-controller")
const userMiddleware = require("../middlewares/user-middleware")
const adminMiddleware = require("../middlewares/admin-middleware")

const router = express.Router()

router.route("/users").get(userMiddleware, adminMiddleware, adminController.fetchAllUserData)
router.route("/users/:id").delete(userMiddleware, adminMiddleware, adminController.deleteUser)
router.route("/messages").get(userMiddleware, adminMiddleware, adminController.fetchAllContactData)
router.route("/messages/:id").delete(userMiddleware, adminMiddleware, adminController.deleteMessage)
router.route("/reciepts").get(userMiddleware, adminMiddleware, adminController.getReciepts)

module.exports = router