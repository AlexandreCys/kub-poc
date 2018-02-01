const jwt = require('jsonwebtoken');
const moment = require('moment');

const conf = {
  adminUser:  {
    val: 6,
    uni: 'months',
    privateKey: fs.readFileSync('/tmp/admin-key/private', "utf8"),
    publicKey: fs.readFileSync('/tmp/admin-key/public', "utf8"),
  },
  b2bUser:  {
    val: 6,
    uni: 'months',
    privateKey: fs.readFileSync('/tmp/b2b-key/private', "utf8"),
    publicKey: fs.readFileSync('/tmp/b2b-key/public', "utf8"),
  },
  internal:  {
    val: 1,
    uni: 'mins',
    privateKey: fs.readFileSync('/tmp/internal-key/private', "utf8"),
    publicKey: fs.readFileSync('/tmp/internal-key/public', "utf8"),
  },
};

/**
 * Generate a jwt token
 *
 * @param {object} data
 * @returns {jwt} token
 */
function sign(data, userType) {
  const payload = {
    exp: moment.utc().add(conf[userType].val, conf[userType].uni).valueOf(),
    permissions : data.permissions,
    partners : data.partners,
    isAdmin : data.isAdmin,
  };

  return jwt.sign(payload, conf[userType].privateKey, { algorithm: 'RS256' });
}

/**
 * Verify jwt token
 * 
 * @param {jwt} token 
 * @param {string} userType
 * @returns {boolean}
 */
function verify(token, userType) {
  return jwt.verify(token, keys.publicKey, { algorithms: ['RS256'] }, (err, decoded) => {
    if (err) { return false; }

    return true;
  });
}

module.exports = {
  sign,
  verify,
};
