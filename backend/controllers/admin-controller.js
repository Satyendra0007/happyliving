const User = require("../models/User-model")
const Room = require("../models/room-model")
const Contact = require("../models/contact-model")
const Payment = require("../models/payment-model")

const fetchAllUserData = async (req, res) => {
  try {
    const allUsers = await User.find({}, { password: 0 })
    return res.status(200).json(allUsers)
  } catch (error) {
    return res.status(500).json({ messsage: "Internal Server Error !" })
  }
}

const fetchAllContactData = async (req, res) => {
  try {
    const allMessages = await Contact.find({})
    return res.status(200).json(allMessages)
  } catch (error) {
    return res.status(500).json({ messsage: "Internal Server Error !" })
  }
}

const deleteUser = async (req, res) => {
  try {
    const deleteUser = await User.deleteOne({ _id: req.params.id })
    res.status(200).json({ message: "User Deleted Successfully !" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal Server Error " })
  }
}

const deleteMessage = async (req, res) => {
  try {
    const deleteMessage = await Contact.deleteOne({ _id: req.params.id })
    res.status(200).json({ message: "Message Deleted Successfully !" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal Server Error " })
  }
}

const getReciepts = async (req, res) => {
  try {
    const allReciepts = await Payment.find({})
    return res.status(200).json(allReciepts)
  } catch (error) {
    return res.status(500).json({ messsage: "Internal Server Error !" })
  }
}


module.exports = { fetchAllContactData, fetchAllUserData, deleteUser, deleteMessage, getReciepts }