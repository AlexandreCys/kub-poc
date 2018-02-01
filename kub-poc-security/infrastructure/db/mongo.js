const logger = require('../logger');

const connect = function connect(mongoose, connectionString) {
  mongoose.connect(connectionString, {
    useMongoClient: true,
    reconnectTries: Number.MAX_VALUE,
  });

  // CONNECTION EVENTS
  // When successfully connected
  mongoose.connection.on('connected', () => {
    logger.info('Connected to mongodb');
  });

  // If the connection throws an error
  mongoose.connection.on('error', (err) => {
    logger.error('MongoDb error', err);
  });

  // When the connection is disconnected
  mongoose.connection.on('disconnected', (err) => {
    const runningIntegrationTests = !!process.env.NODE_ENV;
    if (!runningIntegrationTests) { logger.error('MongoDb disconnected', err); }
  });
};

module.exports = connect;
