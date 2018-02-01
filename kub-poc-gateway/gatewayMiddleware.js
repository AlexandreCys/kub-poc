const url = require('url');
const config = require('config');
const querystring = require('querystring');
const request = require('request');

const authenticationMode = {
    apiKey: 'apiKey',
    b2bUser: 'b2bUser', // dashboard user
    adminUser: 'adminUser', // ninja backoffice
};

const gatewayConfiguration = [
    {
        originalUrl: '/auth',
        to: {
            service: config.service.security.add,
            port: config.service.security.port.http,
        }
    },
    {
        originalUrl: '/be/jobloss',
        authenticationModes: [authenticationMode.apiKey, authenticationMode.b2bUser],
        to: {
            service: config.service.jobloss.add,
            port: config.service.jobloss.port.http,
            postfix: '/be'
        }
    },
    {
        originalUrl: '/admin/jobloss',
        authenticationModes: [authenticationMode.adminUser],
        to: {
            service: config.service.jobloss.add,
            port: config.service.jobloss.port.http,
            postfix: '/admin'
        }
    }
];

function gateway(req, res, next) {
    // heatlh endpoint for k8s
    if (req.originalUrl === '/health') {
        return res.sendStatus(200);
    }
    const originalUrl = url.parse(req.url).pathname;

    console.log('gateway::', 'received request for', originalUrl);

    try {
        const gatewayConfig = findGatewayConfig(originalUrl);
        const authorizationToken = extractAuthorization(req, gatewayConfig);

        const requestOptions = buildRequestForGatewayConfig(originalUrl, 
            req.method, 
            req.body, 
            req.query, 
            req.headers, 
            gatewayConfig, 
            authorizationToken
        );

        console.log('gateway::', 'extracted token', authorizationToken);
        console.log('gateway::', 'calling', requestOptions.url);

        //return req.pipe(request(requestOptions)).pipe(res);

        console.log(requestOptions);

        request(requestOptions, function (error, response, body) {
            if (!error) {
                res.write(response.statusCode);
            } else {
                //response.end(error);
                res.write(error);
            }
            res.end( );
        });
    } catch (err) {
        return next(err);
    }
}

/**
 * Get the gateway configuration based on the url
 * 
 * @param {any} originalUrl 
 */
function findGatewayConfig(originalUrl) {
    const config = gatewayConfiguration.find(x => originalUrl.startsWith(x.originalUrl));

    if (!config) {
        console.log('gateway::', 'Could not find a mapping route for', originalUrl);

        const error = new Error('Not Found');
        error.status = 404;

        throw error;
    }

    return config;
}

/**
 * 
 * 
 * @param {any} originalUrl 
 * @param {any} queryStrings 
 * @param {any} headers 
 * @param {any} gatewayConfig 
 * @param {any} authorizationToken 
 * @returns 
 */
function buildRequestForGatewayConfig(originalUrl, method, body, queryStrings, headers, gatewayConfig, authorizationToken) {
    const url = buildUrl(originalUrl, queryStrings, gatewayConfig);

    let requestOptions = {
        url,
        method,
        body: JSON.stringify(body),
        headers,
    };

    if (authorizationToken) {
        requestOptions.headers.Authorization = `Bearer ${authorizationToken.token}`;
    }

    return requestOptions;
}

/**
 * Build the destination url
 * 
 * @param {string} originalUrl - The original url
 * @param {object} gatewayConfig - The gateway configuration object
 * @returns 
 */
function buildUrl(originalUrl, queryStrings, gatewayConfig) {
    // remove the part that was used to identity the url from the original url;
    let postfixUrl = originalUrl.substring(gatewayConfig.originalUrl.length);

    if (postfixUrl && !postfixUrl.startsWith('/')) {
        postfixUrl = `/${postfixUrl}`;
    }

    let mappedPostfixUrl = gatewayConfig.to.postfix || '';

    if (mappedPostfixUrl && !mappedPostfixUrl.startsWith('/')) {
        mappedPostfixUrl = `/${mappedPostfixUrl}`;
    }

    const queryString = querystring.stringify(queryStrings);

    //return `http://${gatewayConfig.to.service}.default.svc.cluster.local${mappedPostfixUrl}${postfixUrl}?${queryString}`;
    console.log(`http://${gatewayConfig.to.service}:${gatewayConfig.to.port}${mappedPostfixUrl}${postfixUrl}?${queryString}`);
    return `http://${gatewayConfig.to.service}:${gatewayConfig.to.port}${mappedPostfixUrl}${postfixUrl}?${queryString}`;
}

/**
 * Extract the authorization information from the request
 * 
 * @param {any} req 
 * @param {object} gatewayConfig 
 * @returns {mode, token}
 */
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
            delete req.query['apikey'];

            return {
                mode: authenticationMode.b2bUser,
                token: req.query['apikey'],
            };
        }

        if (req.headers['Qover-Api-Key']) {
            // remove original header
            delete req.headers['Qover-Api-Key'];

            return {
                mode: authenticationMode.b2bUser,
                token: req.headers['Qover-Api-Key'],
            };
        }
    }

    return null;
}

module.exports = gateway;