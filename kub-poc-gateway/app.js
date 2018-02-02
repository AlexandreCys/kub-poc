const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const bearerToken = require('express-bearer-token');
const middlewares = require('./middlewares');
const gatewayConfigurations = require('./models/gatewayConfigurations');
const controllers = require('./controllers');

global.Promise = require('bluebird');

const app = express();

// initialize grpc server
require('./infrastructure/securityService/authenticationService').init();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(bearerToken());

app.use('/', controllers);

app.use(middlewares.findGatewayConfigurationMiddleware);
app.use(middlewares.extractAuthorizationMiddleware);
app.use(middlewares.validateIdentityMiddleware);



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
