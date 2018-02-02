const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const controllers = require('./controllers/http/authenticationController');

global.Promise = require('bluebird');

const app = express();

require('./infrastructure/grpc/factories/serverFactory').init();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', controllers);

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