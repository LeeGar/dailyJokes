var plivo = require('plivo');
var jwt = require('jwt-simple');
var User = require('../users/userModel.js');
var Q = require('q');
var jokes = require('../data/jokes.js');
var keys = require('./textKeys.js');




var findUser = Q.nbind(User.findOne, User);

var p = plivo.RestAPI({
  authId: keys.keys[0].authId,
  authToken: keys.keys[0].authToken
})

var params = {
  'src': null,
  'dst': null,
  'text': null,
  'url': null,
  'method': 'POST'
}

module.exports.getUsers = function (request, response, next) {

var token = request.headers['x-access-token'];
var user = jwt.decode(token, 'secret');
findUser({username: user.username})
  .then(function (found) {
    if (found) {
      console.log('requested number', found.phonenumber)
    
      params.src = '13303498481'
      params.dst =  '1'+found.phonenumber
      params.text = jokes.jokes[request.body[0]].message;

      return p.send_message(params, function (status, response) {
        console.log('status: ', status);
        console.log('Message UUID', response['message_uuid']);
        console.log('response: ', response)
      })

      response.send([found.username, found.phonenumber]);
      next();
    }
  })

};

