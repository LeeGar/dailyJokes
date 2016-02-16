var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');


var port = process.env.PORT || 8000;
var dbUri = process.env.MONGOLAB_URI || 'mongodb://localhost/database';

var app = express();

mongoose.connect(dbUri)

require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);

app.listen(port, function (err) {
  if (err) {
    return console.log(err)
  } else {
    console.log('now listening in on port: ', port)
  }
})

module.exports = app;

