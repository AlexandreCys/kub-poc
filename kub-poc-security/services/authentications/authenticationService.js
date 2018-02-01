const grpcErrors = require('../../domain/error');
const jwtService = require('../../infrastructure/jwt/jwtService');

/**
 * Auth by password method.
 * 
 * @param {string} username 
 * @param {string} password 
 * @param {string} type
 * @return {jwt}
 */
function password (userName, password, type) {
  console.log(`Identity::Service::Password::${JSON.stringify({userName, password, type})}`);

  return new Promise((resolve, reject) => {

    //FAKE CHECK login/password
    if(userName !== 'acy' || password !== '1234') {
      return reject(grpcErrors.unauthorized);
    }
    //FAKE CHECK login/password

    return resolve(jwtService.sign({
      permissions : [],
      partners : [],
      isAdmin : false,
    }, type));
  });
}

/**
 * Auth by jwt method.
 * 
 * @param {string} jwt 
 * @return {jwt}
 */
function jwt (jwt, type) {
  console.log(`Identity::Service::Jwt::${JSON.stringify({jwt, type})}`);

  return new Promise((resolve, reject) => {
    
    //FAKE CHECK jwt
    if(jwt !== 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ') {
      return reject(grpcErrors.unauthorized);
    }
    //FAKE CHECK jwt

    return resolve(jwtService.sign({
      permissions : [],
      partners : [],
      isAdmin : false,
    }, 'internal'));
  });
}

/**
 * Auth by key method.
 * 
 * @param {string} key 
 * @return {jwt}
 */
function key (key) {
  console.log(`Identity::Service::Key::${JSON.stringify({key})}`);
  
  return new Promise((resolve, reject) => {
    
    //FAKE CHECK key
    if(key !== 'm9Jaa91fes21MbwPSe3cshAcPQY62rta') {
      return reject(grpcErrors.unauthorized);
    }
    //FAKE CHECK jwt

    return resolve(jwtService.sign({
      permissions : [],
      partners : [],
      isAdmin : false,
    }, 'internal'));
  });
}

module.exports = {
  password,
  jwt,
  key,
};