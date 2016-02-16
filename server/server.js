var express = require('express');
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost/database');

require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);

app.listen(8000);

module.exports = app;
