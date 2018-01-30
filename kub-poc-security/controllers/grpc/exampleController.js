function exampleSimple (call, callback) {
  console.log('Server: Simple Message Received = ', call.request); // {value: 1} 
  callback(null, call.request);
}

module.exports = {
  exampleSimple,
};