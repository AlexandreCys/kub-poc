const grpc = require('grpc');
const grpc_promise = require('grpc-promise');

let clientInstance = null;

function init() {
  const protoPath = __dirname + '/contracts/authentication.proto';
  const proto = grpc.load(protoPath)['authentication']; // load pacakage

  createClient(proto);
}

function createClient(proto) {
  const serviceInstance = proto['Authentication']; // load service
  const client = new serviceInstance('kub-poc-security-service:83', grpc.credentials.createInsecure());

  grpc_promise.promisifyAll(client);

  console.log('Connected to security service: kub-poc-security-service:83)');

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