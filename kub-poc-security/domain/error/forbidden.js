const grpc = require('grpc');

module.exports = {
  code: 403,
  message: "grpc.status.PERMISSION_DENIED",
  status: grpc.status.PERMISSION_DENIED
};