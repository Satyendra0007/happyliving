const express = require("express")
const router = express.Router()
const userMiddleware = require("../middlewares/user-middleware")
const adminMiddleware = require("../middlewares/admin-middleware")
const roomController = require('../controllers/room-controller')
const multer = require("multer")


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.route("/").get(roomController.getRoom)
  .post(userMiddleware, adminMiddleware, upload.single('image'), roomController.addRoom)
router.route("/:id").delete(userMiddleware, adminMiddleware, roomController.deleteRoom)
  .patch(userMiddleware, adminMiddleware, roomController.editRoom)


module.exports = router