const jwtService = require('../../infrastructure/jwt/jwtService');

/**
 * Auth by password method.
 * 
 * @param {string} username 
 * @param {string} password 
 * @param {string} type
 * @return {jwt}
 */
function password (username, password, type) {
  console.log(`Identity::Service::Password::${call.request}`);

  return new Promise(jwtService.sign({
    permissions : [],
    partners : [],
    isAdmin : false,
  }, type));
}

/**
 * Auth by jwt method.
 * 
 * @param {string} jwt 
 * @return {jwt}
 */
function jwt (jwt, type) {
  console.log(`Identity::Service::Jwt::${call.request}`);

  return new Promise(jwtService.sign({
    permissions : [],
    partners : [],
    isAdmin : false,
  }, 'internal'));
}

/**
 * Auth by key method.
 * 
 * @param {string} key 
 * @return {jwt}
 */
function key (key) {
  console.log(`Identity::Service::Key::${call.request}`);
  
  return new Promise(jwtService.sign({
    permissions : [],
    partners : [],
    isAdmin : false,
  }, 'internal'));
}

module.exports = {
  password,
  jwt,
  key,
};