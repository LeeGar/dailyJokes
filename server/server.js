var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var port = process.env.PORT || 3000;
var dbUri = process.env.MONGOLAB_URI || 'mongodb://localhost/jokes';

var app = express();

mongoose.connect(dbUri);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true});
app.use(express.static(__dirname + '/../client'));


app.use('jokes/users', userRouter);
app.use('jokes/jokes', jokesRouter);

app.listen(port, function (error) {
  if (error) {
  console.error(error)
  }
  console.log('now listening in on port: ', port)
});

module.exports = app;

