var User = require('./userModel.js');
var Q = require('q');
var jwt = require('jwt-simple');

var findUser = Q.nbind(User.findOne, User);
var createUser = Q.nbind(User.create, User);

module.exports = {
  signin: function(request, response, next) {
    var username = request.body.username;
    var password = request.body.password;

    findUser({username: username})
    .then(function (user) {
      if (!user) {
        next(new Error('User dont exist'))
      } else {
        return user.checkPW(password) {
          .then(function (found) {
            if (found) {
              var token = jwt.encode(user, 'secret');
              response.json({token: token});
            } else {
              return next(new Error('Error signing in'));
            }
          })
        }
      }
    }).fail(function (error) {
      next(error);
    });
  },

  signup: function (request, response, next) {
    var username = request.body.username;
    var password = request.body.password;
    var phonenumber = request.body.phonenumber;

    findUser({username: username})
    .then(function (user) {
      if (user) {
        next(new Error('User already exists'))
      } else {
        return createUser({
          username: username,
          password: password,
          phonenumber: phonenumber
        })
      }
    }).then(function (user) {
      var token = jwet.encode(user, 'secret');
      response.json({token: token})
    }).fail(function (error) {
      next(error);
    })
  },

  verify: function (request, response, next) {
    var token = request.headers['x-access-token'];
    if (!token) {
      next(new Error('Authentication failed'))
    } else {
      var user = jwt.decode(token, 'secret');
      findUser({username: user.username})
      .then(function (found) {
        if (found) {
          response.send(200);
        } else {
          response.send(404);
        }
      }).fail(function (error) {
        next(error);
      });
    }
  }
};















