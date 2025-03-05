const mongoose = require("mongoose")

const paymentSchema = new mongoose.Schema({
  userId: { type: String, require: true },
  paymentId: { type: String, require: true },
  amount: { type: Number, reqiure: true },
  name: { type: String, reqiure: true }
})

const Payment = mongoose.models.Payment || new mongoose.model("Payment", paymentSchema)
module.exports = Payment;