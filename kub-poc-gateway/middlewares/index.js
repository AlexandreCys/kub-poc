const extractAuthorizationMiddleware = require('./extractAuthorizationMiddleware');
const findGatewayConfigurationMiddleware = require('./findGatewayConfigurationMiddleware');
const gatewayConfigurationProxyMiddleware = require('./gatewayConfigurationProxyMiddleware');
const validateIdentityMiddleware = require('./validateIdentityMiddleware');

module.exports = {
    extractAuthorizationMiddleware,
    findGatewayConfigurationMiddleware,
    gatewayConfigurationProxyMiddleware,
    validateIdentityMiddleware,
};