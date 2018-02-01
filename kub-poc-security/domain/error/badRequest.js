const grpc = require('grpc');

module.exports = {
  code: 400,
  message: "grpc.status.INTERNAL",
  status: grpc.status.INTERNAL
};