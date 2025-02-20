const mongoose = require("mongoose")

const mongoDbUri = process.env.MONGODB_URI;

const connectDb = async () => {
  try {
    return mongoose.connect(mongoDbUri)
  } catch (error) {
    return new Error(error)
  }
}

module.exports = connectDb