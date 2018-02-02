const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const bearerToken = require('express-bearer-token');
const middlewares = require('./middlewares');
const gatewayConfigurations = require('./models/gatewayConfigurations');

global.Promise = require('bluebird');

const app = express();

require('./infrastructure/securityService/authenticationService').init();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(bearerToken());
app.use(middlewares.gatewayConfigMiddleware);
app.use(middlewares.authorizationMiddleware);

gatewayConfigurations.forEach(x => app.use(x.originalUrl, middlewares.gatewayConfigurationProxyMiddleware(x)));

app.use(function (err, req, res, next) {
  console.error(err);
  const status = err.status || 500;
  res.status(status)
    .json({
      status,
      message: (status === 500) ? undefined : err.message,
    });
});

module.exports = app;