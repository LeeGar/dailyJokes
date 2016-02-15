var jwt = require('jwt-simple');

module.exports = {
  errorLogger: function (error, request, response, next) {
    console.error(error.stack);
    next(error);
  },
  errorHandler: function (error, request, response, next) {
    response.send(500, {error: error.message});
  },
  decode: function (request, response, next) {
    var token = request.headers['x-access-token'];
    var user;
    if (!token) {
      return response.send(403); 
    }
    try {
      user = jwt.decode(token, 'secret');
      request.user = user;
      next();
    } catch (error) {
      return next(error);
    }
  }
};
