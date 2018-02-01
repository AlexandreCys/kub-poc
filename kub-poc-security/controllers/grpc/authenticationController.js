const authenticationsServices = require('../../services/authentications');

/**
 * Auth by password method.
 * 
 * @param {string} call.request.userName 
 * @param {string} call.request.password 
 * @param {string} call.request.type 
 */
function password (call, callback) {
  console.log(`Identity::Controller::Password::${call.request}`);

  return authenticationsServices.authenticationService.password(call.request.userName, call.request.password, call.request.type)
  .returns(token => callback(null, token))
  .catch(err => callback(err));
}

/**
 * Auth by jwt method.
 * 
 * @param {string} call.request.jwt 
 */
function jwt (call, callback) {
  console.log(`Identity::Controller::Jwt::${call.request}`);

  return authenticationsServices.authenticationService.jwt(call.request.jwt, call.request.type)
  .returns(token => callback(null, token))
  .catch(err => callback(err));
}

/**
 * Auth by key method.
 * 
 * @param {string} call.request.key 
 */
function key (call, callback) {
  console.log(`Identity::Controller::Key::${call.request}`);
  
  return authenticationsServices.authenticationService.key(call.request.key)
  .returns(token => callback(null, token))
  .catch(err => callback(err));
}

module.exports = {
  password,
  jwt,
  key,
};