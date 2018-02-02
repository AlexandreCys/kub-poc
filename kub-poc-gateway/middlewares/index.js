const authorizationMiddleware = require('./authorizationMiddleware');
const gatewayConfigMiddleware = require('./gatewayConfigMiddleware');
const gatewayConfigurationProxyMiddleware = require('./gatewayConfigurationProxyMiddleware');

module.exports = {
    authorizationMiddleware,
    gatewayConfigMiddleware,
    gatewayConfigurationProxyMiddleware,
};