
const Room = require("../models/room-model")
const { deleteIMage } = require("../util/cloudinary")
const cloudinary = require('cloudinary').v2; // Import Cloudinary's Node.js SDK
const streamifier = require('streamifier');

const addRoom = async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  try {

    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: '/Hostel/room' },
      async (err, result) => {
        if (err) {
          return res.status(500).json({ error: 'Upload to Cloudinary failed', details: err });
        }
        await Room.create({ ...req.body, thumbnail: result.secure_url, imageId: result.public_id })
        return res.status(200).json({ message: "Room Added " })
      }
    );
    streamifier.createReadStream(file.buffer).pipe(uploadStream);
  }
  catch (err) {
    return res.status(500).json({ message: "internal server errror" })
  }
}

const getRoom = async (req, res) => {
  try {
    const room = await Room.find()
    return res.status(200).json(room)
  } catch (error) {
    return res.status(400).json({ message: "Internal Server Error" })
  }
}

const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findOne({ _id: req.params.id })
    await deleteIMage(room.imageId)
    await Room.deleteOne({ _id: req.params.id })
    return res.status(200).json({ message: "Room Deleted" })
  } catch (error) {
    return res.status(400).json({ message: "Internal Server Error" })
  }
}

const editRoom = async (req, res) => {
  try {
    await Room.updateOne({ _id: req.params.id }, { $set: { ...req.body } })
    return res.status(200).json({ message: "Room Updated " })
  } catch (error) {
    return res.status(400).json({ message: "Internal Server Error" })
  }
}

module.exports = { addRoom, editRoom, deleteRoom, getRoom }