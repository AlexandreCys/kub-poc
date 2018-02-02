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
  console.log(`[HTTP]SECURITY::Service::Password::${JSON.stringify({ userName, password, type })}`);

  let permissions = [];
  let partners = [];
  let isAdmin = false;

  return new Promise((resolve, reject) => {
    //FAKECHECK : login/password
    if(userName === 'acy' && password === '1234') {
      permissions = ['jobloss.'];
      partners = [];
      isAdmin = [];
    } else if(userName === 'cde' && password === '1234') {
      permissions = [];
      partners = [];
      isAdmin = [];
    } else {
      return reject(grpcErrors.unauthorized);
    }
    //FAKECHECK : login/password

    return resolve(jwtService.sign({
      permissions,
      partners,
      isAdmin,
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
  console.log(`[HTTP]SECURITY::Service::Jwt::${JSON.stringify({ jwt, type })}`);

  return new Promise((resolve, reject) => {
    
    //FAKECHECK : jwt
    if(jwt !== 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ') {
      return reject(grpcErrors.unauthorized);
    }
    //FAKECHECK : jwt

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
  console.log(`[HTTP]SECURITY::Service::Key::${JSON.stringify({ key })}`);
  
  return new Promise((resolve, reject) => {
    
    //FAKECHECK : key
    if(key !== 'm9Jaa91fes21MbwPSe3cshAcPQY62rta') {
      return reject(grpcErrors.unauthorized);
    }
    //FAKECHECK : key

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