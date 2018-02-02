const grpc = require('grpc');
const config = require('config');
const grpc_promise = require('grpc-promise');

let clientInstance = null;

function init() {
  const protoPath = __dirname + '/contracts/authentication.proto';
  const proto = grpc.load(protoPath)['authentication']; // load pacakage

  createClient(proto);
}

function createClient(proto) {
  const serviceInstance = proto['Authentication']; // load service
  const client = new serviceInstance(`${config.services.security.add}:${config.services.security.port.grpc}`, grpc.credentials.createInsecure());

  grpc_promise.promisifyAll(client);

  console.log(`[gRPC]GATEWAY::ConnectedTo::SECURITY::(${config.services.security.add}:${config.services.security.port.grpc})`);

  clientInstance = client;
}

function authenticateWithApiKey(apiKey) {
  return clientInstance.key()
    .sendMessage({
      key: apiKey,
    });
}

module.exports = {
  init,
  authenticateWithApiKey,
};