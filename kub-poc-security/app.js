// Global Promise
global.Promise = require('bluebird');

require('./infrastructure/grpc/factories/serverFactory').init();
