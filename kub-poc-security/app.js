require('./infrastructure/grpc/factories/serverFactory').init();
require('./infrastructure/db/mongo')(require('mongoose'), config.mongo);
