const adminMiddleware = (req, res, next) => {
  const currentUser = req.userData
  if (currentUser.isAdmin) {
    next()
  }
  else {
    return res.status(400).json({ message: "You don't have authorization to access !" })
  }
}

module.exports = adminMiddleware