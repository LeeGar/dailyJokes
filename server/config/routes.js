var userController = require('../users/userController.js');
var jokes = require('../data/jokes.js');
var helpers = require('./helpers.js');
var textController = require('../text/textController.js');

module.exports = function (app, express) {

  app.post('/jokes/users/signin', userController.signin);
  app.post('/jokes/users/signup', userController.signup);
  //app.get('/jokes/users/signedin', userController.verify);

  app.post('/jokes/users/', textController.getUsers);

  
  app.post('/jokes/jokes/', function (request, response) {
    if (request.body[1] === 'like') {
      jokes.jokes[request.body[0]].likes +=1;
    } else if (request.body[1] === 'dislike') {
      jokes.jokes[request.body[0]].dislikes +=1;
    }
  });

  app.get('/jokes/jokes/', function (request, response) {
    response.send(jokes)
  });

  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);
};


