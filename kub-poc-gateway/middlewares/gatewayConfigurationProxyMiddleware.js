const gatewayConfigurations = require('../models/gatewayConfigurations');

const proxy = require('express-http-proxy');
const urlUtils = require('url');
const querystringUtils = require('querystring');

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
            console.log('gateway::', 'found proxy', gatewayConfiguration.originalUrl, '--->', req.originalUrl)

            return true;
        },
        proxyReqOptDecorator: function (proxyReqOpts, srcReq) {

            // todo call security here

            return proxyReqOpts;
        },
        proxyReqPathResolver(req) {
            return buildUrl(urlUtils.parse(req.url).pathname, req.query, req.gatewayConfiguration);
        }
    });
}