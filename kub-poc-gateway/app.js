const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const bearerToken = require('express-bearer-token');
const gatewayMiddleware = require('./gatewayMiddleware');

global.Promise = require('bluebird');

const app = express();

require('./infrastructure/securityService/authenticationService').init();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(bearerToken());
app.use(gatewayMiddleware);

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