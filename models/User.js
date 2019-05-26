const mongoose = require('mongoose');


const User = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 255,
    min: 6
  },
  password: {
    type: String,
    min: 6,
    max: 1025,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('user', User);
