var userController = require('../users/userController.js');
var textController = require('../text/textController.js');
var jokeController = require('../joke/jokeController.js');

var jokes = require('../data/jokes.js');
var helpers = require('./helpers.js');

module.exports = function (app, express) {

  app.post('/jokes/users/signin', userController.signin);
  app.post('/jokes/users/signup', userController.signup);

  app.post('/jokes/users/', textController.getUsers);
  
  app.post('/jokes/jokes/', jokeController.createJoke);
  app.post('/jokes/jokes/like', jokeController.addLike);
  app.post('/jokes/jokes/dislike', jokeController.addDislike);

  //app.get('/jokes/jokes/', jokeController.getJokes);


  app.get('/jokes/jokes/', function (request, response) {
    response.send(jokes)
  });

  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);
};


