const authenticationMode = require('../models/authenticationMode');

function extractAuthorization(req, gatewayConfig) {
    // access with a JWT token
    if (gatewayConfig.authenticationModes && gatewayConfig.authenticationModes.includes(authenticationMode.adminUser) && req.token) {
        // remove original header
        delete req.headers.Authorization;

        return {
            mode: authenticationMode.adminUser,
            token: req.token,
        };
    }

    // access with a JWT token
    if (gatewayConfig.authenticationModes && gatewayConfig.authenticationModes.includes(authenticationMode.b2bUser) && req.token) {
        // remove original header
        delete req.headers.Authorization;

        return {
            mode: authenticationMode.b2bUser,
            token: req.token,
        };
    }

    // access with an api key
    if (gatewayConfig.authenticationModes && gatewayConfig.authenticationModes.includes(authenticationMode.apiKey)) {
        if (req.query['apikey']) {
            const apiKey = req.query['apikey'];
            delete req.query['apikey'];

            return {
                mode: authenticationMode.apiKey,
                token: apiKey,
            };
        }

        if (req.headers['Qover-Api-Key']) {
            const apiKey = req.headers['Qover-Api-Key'];
            // remove original header
            delete req.headers['Qover-Api-Key'];

            return {
                mode: authenticationMode.apiKey,
                token: apiKey,
            };
        }
    }

    return null;
}

module.exports = function (req, res, next) {
    const gatewayConfiguration = req.gatewayConfiguration;
    const authorizationToken = extractAuthorization(req, gatewayConfiguration);

    console.log('gateway::', 'extracted token', authorizationToken);

    req.authorization = authorizationToken;

    return next();
};