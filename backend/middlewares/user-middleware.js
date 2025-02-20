const jwt = require("jsonwebtoken")
const User = require("../models/User-model")

const userMiddleware = async (req, res, next) => {

  const token = req.header("Authorization")
  if (!token) {
    res.status(400).json({ message: "Authorization Token Not Provided !" })
  }
  else {
    const authToken = token.replace("Bearer", "").trim()
    try {
      const isVarified = jwt.verify(authToken, process.env.SECURITY_KEY);
      const userData = await User.findOne({ email: isVarified.email }).select({
        password: 0
      })
      req.userData = userData
      next()
    }
    catch (error) {
      console.log(error)
      res.status(400).json({ message: "Invalid Token !" })
    }
  }
}

module.exports = userMiddleware