var Joke = require('./jokeModel.js');
var Q = require('q');

var findJoke = Q.nbind(Joke.findOne, Joke);
var createJoke = Q.nbind(Joke.create, Joke);
var findAll = Q.nbind(Joke.find, Joke);

module.exports = {

  getJokes: function (request, response, next) {
    findJoke({}).then(function (jokes) {
      response.json(jokes);
    });
  },

  createJoke: function (request, response, next) {
    var type = request.body.type;
    var message = request.body.message;
    var likes = request.body.likes;
    var dislikes = request.body.likes;

    findJoke({message: message})
    .then(function (joke) {
      if (joke) {
        next(new Error('Joke already found'))
      } else {
        return createJoke({
          type: type,
          message: message,
          likes: likes,
          dislikes: dislikes
        });
      }
    }).fail(function (error) {
      next(error);
    })
  },

  addLike: function (request, response, next) {
    var message = request.body.message;

    findJoke({message: message})
    .then(function (joke) {
      if (!joke) {
        return next(new Error('Joke not found'));
      } else {
        joke.likes++;
        joke.save(function (error) {
          if (error) {
            next(new Error('Error occured liking'))
          } else {
            next();
          }
        })
      }
    });
  },

  addDislike: function (request, response, next) {
    var message = request.body.message;

    findJoke({message: message})
    .then(function (joke) {
      if (!joke) {
        return next(new Error('Joke not found'));
      } else {
        joke.dislikes++;
        joke.save(function (error) {
          if (error) {
            next(new Error('Error occured liking'))
          } else {
            next();
          }
        })
      }
    });
  }

}