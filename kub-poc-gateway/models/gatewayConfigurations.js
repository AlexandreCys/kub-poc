const config = require('config');
const authenticationMode = require('./authenticationMode');

module.exports = [{
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
