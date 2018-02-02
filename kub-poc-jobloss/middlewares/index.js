const jwtSecurityMiddleware = require('./jwtSecurityMiddleware');
const permissionMiddleware = require('./permissionMiddleware');

module.exports = {
  jwtSecurityMiddleware,
  permissionMiddleware,
};
