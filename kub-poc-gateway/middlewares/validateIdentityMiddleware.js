const authenticationService = require('../infrastructure/securityService/authenticationService');
const authenticationMode = require('../models/authenticationMode');

function authenticate(req) {
    if (req.authorization.mode === authenticationMode.apiKey) {
        return authenticationService
            .withApiKey(req.authorization.token);
    } else {
        return authenticationService
            .withJwtToken(req.authorization.token, req.authorization.mode);
    }
}

module.exports = function (req, res, next) {
    if (req.authorization) {
        console.log('gateway::', 'Validating identity for authorization', req.authorization);

        authenticate(req)
            .then((data) => {
                console.log('gateway::', 'Identity validated, received short lived token', data);

                if (data && data.slToken) {
                    req.authorization = data;
                }

                return next();
            })
            .catch(err => {
                if (err.code === 401) {
                    var authenticationError = new Error();
                    authenticationError.status = 401;
                    return next(authenticationError);
                }

                return next(err);
            });
    } else {
        return next();
    }
}