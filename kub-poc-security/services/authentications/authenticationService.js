const grpcErrors = require('../../domain/error');
const jwtService = require('../../infrastructure/jwt/jwtService');


const identity = {
  1: {
    idIdentity : 1,
    permissions : ['jobloss.contract.delete'],
    partners : [1],
    isAdmin : false,
  },
  2: {
    idIdentity : 2,
    permissions : ['jobloss.contract.delete'],
    partners : [],
    isAdmin : true,
  },
  3: {
    idIdentity : 3,
    permissions : [],
    partners : [],
    isAdmin : true,
  },
}

/**
 * Auth by password method.
 * @type HTTP
 * 
 * @param {string} username 
 * @param {string} password 
 * @param {string} type
 * @return {jwt}
 */
function password (userName, password, type) {
  console.log(`[HTTP]SECURITY::Service::Password::${JSON.stringify({ userName, password, type })}`);

  let userIdentity = {};

  return new Promise((resolve, reject) => {

    //Fake Association
    if (userName === 'acy' && password === '1234') { userIdentity = identity['1']; } else
    if (userName === 'cde' && password === '1234') { userIdentity = identity['2']; } else 
    if (userName === 'spa' && password === '1234') { userIdentity = identity['3']; } else 
    { 
      return reject()
    };
    //Fake Association

    console.log(userIdentity)

    return resolve(jwtService.sign(userIdentity, type));
  });
}

/**
 * Auth by jwt method.
 * @type gRPC
 * 
 * @param {string} jwt 
 * @return {jwt}
 */
function jwt (jwt, type) {
  console.log(`[HTTP]SECURITY::Service::Jwt::${JSON.stringify({ jwt, type })}`);

  let userIdentity = {};

  return new Promise((resolve, reject) => {

    if(jwtService.verify(jwt, type)) {
      //Fake Association
      if (jwtService.verify(jwt, type).idIdentity === 1) { userIdentity = Object.assign(identity['1'], type) } else
      if (jwtService.verify(jwt, type).idIdentity === 2) { userIdentity = Object.assign(identity['2'], type) } else
      if (jwtService.verify(jwt, type).idIdentity === 3) { userIdentity = Object.assign(identity['3'], type) } else
      { 
        return reject(grpcErrors.unauthorized);
      };
      //Fake Association
    } else {
      return reject(grpcErrors.unauthorized);
    }

    return resolve(jwtService.sign(userIdentity, 'internal'));
  });
}

/**
 * Auth by key method.
 * @type gRPC
 * 
 * @param {string} key 
 * @return {jwt}
 */
function key (key) {
  console.log(`[HTTP]SECURITY::Service::Key::${JSON.stringify({ key })}`);

  let identity = {};
  
  return new Promise((resolve, reject) => {

    //Fake Association
    if(key === 'm9Jaa91fes21MbwPSe3cshAcPQY62rta') { userIdentity = identity['3'] } else
    { 
      return reject(grpcErrors.unauthorized);
    };
    //Fake Association

    return resolve(jwtService.sign(userIdentity, 'internal'));
  });
}

module.exports = {
  password,
  jwt,
  key,
};