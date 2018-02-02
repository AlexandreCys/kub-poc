const proxy = require('express-http-proxy');
const urlUtils = require('url');
const querystringUtils = require('querystring');

const gatewayConfigurations = require('../models/gatewayConfigurations');
const authenticationService = require('../infrastructure/securityService/authenticationService');

function buildUrl(urlPathname, queryStrings, gatewayConfig) {
    let mappedPostfixUrl = gatewayConfig.to.postfix || '';

    if (mappedPostfixUrl && !mappedPostfixUrl.startsWith('/')) {
        mappedPostfixUrl = `/${mappedPostfixUrl}`;
    }

    const queryString = querystringUtils.stringify(queryStrings);

    return `${mappedPostfixUrl}${urlPathname}?${queryString}`;
}

module.exports = function (gatewayConfiguration) {
    console.log('gateway::','create proxy for', gatewayConfiguration.originalUrl, 'to', `http://${gatewayConfiguration.to.service}:${gatewayConfiguration.to.port}`)
    
    return proxy(`http://${gatewayConfiguration.to.service}:${gatewayConfiguration.to.port}`, {
        filter: function (req, res) {
            console.log('gateway::', 'Found proxy', gatewayConfiguration.originalUrl);

            return true;
        },
        proxyReqOptDecorator: function (proxyReqOpts, srcReq) {
            // Add authorization on request
            if(srcReq.authorization){
                proxyReqOpts.headers.Authorization = `Bearer ${srcReq.authorization}`;
            }

            return proxyReqOpts;
        },
        proxyReqPathResolver(req) {
            const url = buildUrl(urlUtils.parse(req.url).pathname, req.query, req.gatewayConfiguration);

            console.log('gateway::', 'Calling service', url);

            return url
        }
    });
}