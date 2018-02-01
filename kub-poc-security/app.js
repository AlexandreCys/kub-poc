const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

global.Promise = require('bluebird');

var controllers = require('./controllers/http/authenticationController');
const app = express();

require('./infrastructure/grpc/factories/serverFactory').init();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use('/', controllers);

// error handler
app.use(function (err, req, res, next) {
  console.error(err);
  const status = err.status || 500;

  // render the error page
  res.status(status)
    .json({
      status,
      message: (status === 500) ? undefined : err.message,
    });
});

module.exports = app;