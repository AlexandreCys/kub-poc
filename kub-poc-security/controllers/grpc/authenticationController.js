const authenticationsServices = require('../../services/authentications');

/**
 * Auth by password method.
 * 
 * @param {string} call.request.username 
 * @param {string} call.request.password 
 */
function password (call, callback) {
  console.log(`Identity::Controller::Password::${call.request}`);

  callback(null, authenticationsServices.authenticationService.password(
    call.request.username,
    call.request.password
  ));
}

/**
 * Auth by jwt method.
 * 
 * @param {string} call.request.jwt 
 */
function jwt (call, callback) {
  console.log(`Identity::Controller::Jwt::${call.request}`);

  callback(null, authenticationsServices.authenticationService.jwt(
    call.request.jwt
  ));
}

/**
 * Auth by key method.
 * 
 * @param {string} call.request.key 
 */
function key (call, callback) {
  console.log(`Identity::Controller::Key::${call.request}`);
  
  callback(null, authenticationsServices.authenticationService.key(
    call.request.key 
  ));
}

module.exports = {
  password,
  jwt,
  key,
};