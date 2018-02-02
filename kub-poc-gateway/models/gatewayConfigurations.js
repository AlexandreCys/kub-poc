const config = require('config');
const authenticationMode = require('./authenticationMode');

module.exports = [{
        originalUrl: '/identity',
        to: {
            service: config.get('services.security.add'),
            port: config.get('services.security.port.http'),
        }
    },
    {
        originalUrl: '/be/jobloss',
        authenticationModes: [authenticationMode.apiKey, authenticationMode.b2bUser],
        to: {
            service: config.get('services.jobloss.add'),
            port: config.get('services.jobloss.port.http'),
            postfix: '/be'
        }
    },
    {
        originalUrl: '/admin/jobloss',
        authenticationModes: [authenticationMode.adminUser],
        to: {
            service: config.get('services.jobloss.add'),
            port: config.get('services.jobloss.port.http'),
            postfix: '/admin'
        }
    }
];
