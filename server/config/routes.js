
var userController = require('../users/userController.js');

var helpers = require('./helpers.js'); // our custom middleware

module.exports = function (app, express) {


  app.post('/jokes/users/signin', userController.signin);
  app.post('/jokes/users/signup', userController.signup);
  app.get('/jokes/users/signedin', userController.verify);

  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);
};

