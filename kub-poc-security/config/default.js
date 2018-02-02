const config = {
  port: '8080',
  server: {
      name: 'authentication',
      ip:'0.0.0.0',
      port: '8083',
      protoName: 'authentication',
      protoPath: 'authentication.proto',
  },
  key: {
    adminUser : {
      public: '/tmp/admin-key/public',
      private: '/tmp/admin-key/private',
    },
    b2bUser : {
      public: '/tmp/b2b-key/public',
      private: '/tmp/b2b-key/private',
    },
    internal : {
      public: '/tmp/internal-key/public',
      private: '/tmp/internal-key/private',
    },
  },
  mongo: 'mongodb://localhost:27017/authentication',
};

module.exports = config;