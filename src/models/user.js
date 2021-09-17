const mongoose = require('mongoose');

const Types = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
  name: {
    type: Types.String,
    required: true
  },
  loginField: {
    type: Types.String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true,
  },
  password: {
    type: Types.String,
    required: true,
    trim: true,
    minlength: 7,
    required: true
  }
})


userSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()
  
  delete userObject.password

  return userObject
}

const User = mongoose.model('user', userSchema)

module.exports = User