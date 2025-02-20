const Mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userSchema = new Mongoose.Schema({
  name: {
    require: true,
    type: String
  },
  email: {
    require: true,
    type: String
  },
  phone: {
    require: true,
    type: String
  },
  password: {
    require: true,
    type: String
  },

  image: {
    type: String,
    require: true
  },
  imageId: {
    type: String,
    require: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
})

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      const salt = await bcrypt.genSalt(10)
      this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
      console.log(error)
    }
  }
  else {
    next()
  }
})

userSchema.methods.validatePassword = async function (password) {
  return bcrypt.compare(password, this.password)
}

userSchema.methods.generateToken = function () {
  try {
    return jwt.sign(
      {
        email: this.email,
        userId: this._id
      },
      process.env.SECURITY_KEY,
      {
        expiresIn: "30d"
      }
    )
  } catch (error) {
    console.log(error)
  }
}


const User = Mongoose.models.User || new Mongoose.model("User", userSchema)
module.exports = User