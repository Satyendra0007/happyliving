const mongoose = require("mongoose")

const roomSchema = new mongoose.Schema({
  bedType: { type: String, require: true },
  price: { type: String, require: true },
  seatAvailable: { type: String, require: true },
  thumbnail: { type: String, require: true },
  imageId: { type: String, require: true },
})

const Room = mongoose.models.Room || new mongoose.model("Room", roomSchema)
module.exports = Room;