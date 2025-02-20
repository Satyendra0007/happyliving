const Contact = require("../models/contact-model")

const contact = async (req, res) => {
  try {
    const newMessage = await Contact.create(req.body)
    res.status(200).json({ message: "Message Send Successfully " })
  } catch (error) {
    console.error(error)
    res.send(500).json("Internal server error")
  }
}

module.exports = contact