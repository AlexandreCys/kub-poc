/**
 * Auth by password method.
 * 
 * @param {string} username 
 */
function password (username, password) {
  console.log(`Identity::Service::Password::${call.request}`);

  callback(null, call.request);
}

/**
 * Auth by jwt method.
 * 
 * @param {string} jwt 
 */
function jwt (jwt) {
  console.log(`Identity::Service::Jwt::${call.request}`);

  callback(null, call.request);
}

/**
 * Auth by key method.
 * 
 * @param {string} key 
 */
function key (key) {
  console.log(`Identity::Service::Key::${call.request}`);
  
  callback(null, call.request);
}

module.exports = {
  password,
  jwt,
  key,
};