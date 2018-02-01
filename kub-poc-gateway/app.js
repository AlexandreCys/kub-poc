var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var gatewayMiddleware = require('./gatewayMiddleware');

var app = express();

var clientFactory = require('./infrastructure/grpc/factories/clientFactory').init();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use(gatewayMiddleware);

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