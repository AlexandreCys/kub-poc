const request = require('request');

const gatewayMapping = [{
        originalUrl: '/be/jobloss',
        to: {
            service: 'kub-poc-product-service',
            postfix: '/be'
        }
    },
    {
        originalUrl: '/admin/jobloss',
        to: {
            service: 'kub-poc-product-service',
            postfix: '/admin'
        }
    }
];

function gateway(req, res, next) {
    console.log('gateway::', 'received request for', req.originalUrl);

    const mappedUrl = gatewayMapping.find(x => req.originalUrl.startsWith(x.originalUrl));

    if (!mappedUrl) {
        console.log('gateway::', 'Could not find a mapping route for', req.originalUrl);

        const error = new Error('Not Found');
        error.status = 404;

        return next(error);
    }

    // todo: call security service

    const url = buildUrl(req.originalUrl, mappedUrl);

    console.log('gateway::', 'calling', url);

    return res.status(200).json({});
};

function buildUrl(originalUrl, gatewayMappedUrl) {
    // remove the part that was used to identity the url from the original url;
    let postfixUrl = originalUrl.substring(gatewayMappedUrl.originalUrl.length);

    if (postfixUrl && !postfixUrl.startsWith('/')) {
        postfixUrl = `/${postfixUrl}`;
    }

    let mappedPostfixUrl = gatewayMappedUrl.to.postfix || '';

    if (mappedPostfixUrl && !mappedPostfixUrl.startsWith('/')) {
        mappedPostfixUrl = `/${mappedPostfixUrl}`;
    }

    return `http://${gatewayMappedUrl.to.service}.default.svc.cluster.local${mappedPostfixUrl}${postfixUrl}`;
}

module.exports = gateway;