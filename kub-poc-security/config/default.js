const config = {
  server: {
      name: 'example',
      ip:'0.0.0.0',
      port: '8083',
      protoName: 'example1',
      protoPath: 'example1.proto',
  },
  database: {},
  loggers: {
    level: process.env.LOGS_LEVEL,
    loggly: {
      use: process.env.LOGS_LOGGLY !== 'false',
      subdomain: process.env.LOGS_LOGGLY_SUBDOMAIN,
      token: process.env.LOGS_LOGGLY_TOKEN,
      tag: process.env.LOGS_LOGGLY_TAG,
    },
  },
  files: {
    tmpLocation: '/tmp/',
  },
};

module.exports = config;