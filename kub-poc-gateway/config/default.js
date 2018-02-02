const config = {
  port: 8080,
  service: {
    security: {
      add: 'kub-poc-security-service',
      port: {
        http: '80',
        grpc: '83',
      },
    },
    jobloss: {
      add: 'kub-poc-jobloss-service',
      port: {
        http: '80',
        grpc: '83',
      },
    },
  },
};

module.exports = config;