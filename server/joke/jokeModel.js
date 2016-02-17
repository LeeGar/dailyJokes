var Q = require('q');
var mongoose = require('mongoose');

var jokeSchema = new mongoose.Schema({
  type: String,
  message: String,
  likes: Number,
  dislikes: Number
})

jokeSchema.pre('save', function (next) {
  next();
})

module.exports = mongoose.model('jokes', jokeSchema);