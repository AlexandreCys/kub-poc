const authenticationsServices = require('../../services/authentications');

/**
 * Auth by jwt method.
 * 
 * @param {string} call.request.jwt 
 */
function jwt (call, callback) {
  console.log(`Identity::Controller::Jwt::${JSON.stringify(call.request)}`);

  return authenticationsServices.authenticationService.jwt(call.request.jwt, call.request.type)
  .then(token => callback(null, token))
  .catch(err => callback(err));
}

/**
 * Auth by key method.
 * 
 * @param {string} call.request.key 
 */
function key (call, callback) {
  console.log(`Identity::Controller::Key::${JSON.stringify(call.request)}`);
  
  return authenticationsServices.authenticationService.key(call.request.key)
  .then(token => callback(null, token))
  .catch(err => callback(err));
}

module.exports = {
  jwt,
  key,
};