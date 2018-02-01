const grpc = require('grpc');

module.exports = {
  code: 401,
  message: "grpc.status.UNAUTHENTICATED",
  status: grpc.status.UNAUTHENTICATED
};