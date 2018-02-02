const config = {
  port: 8080,
  services: {
    security: {
      add: '0.0.0.0',
      port: {
        http: '8181',
        grpc: '9191',
      },
    },
    jobloss: {
      add: '0.0.0.0',
      port: {
        http: '8282',
      },
    },
  },
};

module.exports = config;