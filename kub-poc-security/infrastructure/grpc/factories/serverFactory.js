const config = require('config');
const grpc = require('grpc');

function init() {
  const server = config.server;
  const protoPath = __dirname + '/../../../contracts/' + server.protoPath;
  
  const proto = grpc.load(protoPath)[server.protoName];
  
  createServer(server, proto);
}

function createServer(serverData, proto) {
  const server = new grpc.Server();
  const controller = require(`../../../controllers/grpc/${serverData.name}Controller.js`)

  server.addService(proto.Example1.service, controller);
  server.bind(`${serverData.ip}:${serverData.port}`, grpc.ServerCredentials.createInsecure());
  server.start();
}

module.exports = {
  init,
};