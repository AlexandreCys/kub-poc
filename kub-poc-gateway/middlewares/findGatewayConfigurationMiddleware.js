const config = require('config');
const urlUtils = require('url');
const authenticationMode = require('../models/authenticationMode');
const gatewayConfigurations = require('../models/gatewayConfigurations');

function findGatewayConfig(originalUrl) {
    const config = gatewayConfigurations.find(x => originalUrl.startsWith(x.originalUrl));

    if (!config) {
        console.log('gateway::', 'Could not find a gateway configuration for', originalUrl);

        const error = new Error('Not Found');
        error.status = 404;

        throw error;
    }

    console.log('gateway::', 'Found gateway configuration for', originalUrl);

    return config;
}


module.exports = function (req, res, next) {
    try {
        const originalUrl = urlUtils.parse(req.url).pathname;
        req.gatewayConfiguration = findGatewayConfig(originalUrl);

        return next();
    } catch (err) {
        return next(err);
    }
}