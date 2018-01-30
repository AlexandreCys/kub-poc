const grpc = require('grpc');
const grpc_promise = require('grpc-promise');

const servers = [
  {
    name: 'example1',
    ip:'kub-poc-security-service',
    port: '83',
    protoName: 'example1',
    protoPath: 'example1.proto',
  },
];

function init() {
  servers.forEach((server) => {
    const protoPath = __dirname + '/../../../contracts/' + server.protoPath;
    const proto = grpc.load(protoPath)[server.protoName];
    
    createClient(server, proto);
  });
}

function createClient(serverData, proto) {
  const serviceName = serverData.protoName.charAt(0).toUpperCase() + serverData.protoName.slice(1);
  const serviceInstance = proto[serviceName];
  const client = new serviceInstance(`${serverData.ip}:${serverData.port}`,grpc.credentials.createInsecure());

  grpc_promise.promisifyAll(client);

  console.log(`Example1 SERVICE connected to : ${serverData.name}(${serverData.ip}:${serverData.port})`)

  exports[serverData.name] = client;
}

module.exports = exports = {
  init,
};