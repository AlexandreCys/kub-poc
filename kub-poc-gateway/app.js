var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const bearerToken = require('express-bearer-token');
const gatewayConfigurations = require('./models/gatewayConfigurations');

const middlewares = require('./middlewares');

var gatewayMiddleware = require('./proxyMiddleware');

var app = express();

require('./infrastructure/securityService/authenticationService').init();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use(bearerToken());
app.use(middlewares.gatewayConfigMiddleware);
app.use(middlewares.authorizationMiddleware);

gatewayConfigurations.forEach(x => app.use(x.originalUrl, middlewares.gatewayConfigurationProxyMiddleware(x)));

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