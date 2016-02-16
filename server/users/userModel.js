var Q = require('q');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    unique: true
  },
  phonenumber: {
    type: String,
    required: true
  },
  salt: String,
  preference: Array
  
});

userSchema.methods.checkPW = function(incomingPass) {
  var savedPW = this.password;

  return Q.promise(function (res, reject) {
    bcrypt.compare(incomingPass, savedPW, function (error, matched) {
      if (error) {
        reject(error);
      } else {
        res(matched);
      }
    })
  })
};

userSchema.pre('save', function (next) {
  var user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, function (error, salt) {
    if (error) {
      return next(error);
    }
    bcrypt.hash(user.password, salt, null, function (error, hashed) {
      if (error) {
        return next(error);
      } else {
        user.password = hashed;
        user.salt = salt;
        next();
      }
    });
  });
});

module.exports = mongoose.model('users', userSchema);