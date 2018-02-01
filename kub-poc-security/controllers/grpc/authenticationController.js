const authenticationsServices = require('../../services/authentications');

/**
 * Auth by password method.
 * 
 * @param {string} call.request.username 
 * @param {string} call.request.password 
 * @param {string} call.request.type 
 */
function password (call, callback) {
  console.log(`Identity::Controller::Password::${call.request}`);

  return authenticationsServices.authenticationService.password(call.request.username, call.request.password, call.request.type)
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

  if() {
    return callback({
      code: 400,
      message: "invalid input",
      status: grpc.status.INTERNAL
    }); 
  }

  return callback(null, authenticationsServices.authenticationService.jwt(
    call.request.jwt,
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