const config = {
  port: 8080,
  service: {
    security: {
      add: '0.0.0.0',
      port: {
        http: '7070',
        grpc: '8083',
      },
    },
    jobloss: {
      add: '0.0.0.0',
      port: {
        http: '6060',
        grpc: '8084',
      },
    },
  },
};

module.exports = config;