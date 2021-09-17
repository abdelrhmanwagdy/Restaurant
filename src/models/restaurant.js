
const mongoose = require('mongoose');

const Types = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
  name: {
    type: Types.String,
    required: true,
    unique: true,
  },
  age: {
    type: Types.Number,
    required: true,
  },
  address:{
    type: Types.String,
    required: true,
  },
  owner: {
    type: Types.ObjectId,
    required: true,
    ref: 'user'
}
})



const Restaurant = mongoose.model('restaurant', userSchema)

module.exports = Restaurant
