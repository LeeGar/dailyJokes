
var userController = require('../users/userController.js');
var jokes = require('../data/jokes.js');
var helpers = require('./helpers.js');
// var cron = require('cron');

module.exports = function (app, express) {

  app.post('/jokes/users/signin', userController.signin);
  app.post('/jokes/users/signup', userController.signup);

  app.post('/jokes/jokes/', function (request, response) {
    console.log('request: ', request.body)
    console.log('jokes.jokes:', jokes.jokes[request.body[0]])
    jokes.jokes[request.body[0]].likes += 1;
  });

  app.get('/jokes/users/signedin', userController.verify);
  
  app.get('/jokes/jokes/', function (request, response) {
    response.send(jokes)
  });

  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);
};


