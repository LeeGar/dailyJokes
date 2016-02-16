
var userController = require('../users/userController.js');
var jokes = require('../data/jokes.js');
var helpers = require('./helpers.js'); // our custom middleware

module.exports = function (app, express) {

  app.post('/jokes/users/signin', userController.signin);
  app.post('/jokes/users/signup', userController.signup);

  app.get('/jokes/users/signedin', userController.verify);
  app.get('/jokes/jokes/', function (request, response) {
    response.send(jokes)
  });

  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);
};


