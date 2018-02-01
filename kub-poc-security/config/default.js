const config = {
  server: {
      name: 'authentication',
      ip:'0.0.0.0',
      port: '8083',
      protoName: 'authentication',
      protoPath: 'authentication.proto',
  },
  mongo: 'mongodb://localhost:27017/authentication',
  loggers: {
    level: 'debug',
    loggly: {
      use: false,
    },
  },
};

module.exports = config;