const mongoose = require('mongoose');


const Post = new mongoose.Schema({
  title: {
    type: String,
    default: 'no title',
    min: 6,
    max: 255
  },
  body: {
    type: String,
    required: true,
    min: 6
  },
  ofUser: {
    type: String,
    min: 6,
    max: 255,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('post', Post);
