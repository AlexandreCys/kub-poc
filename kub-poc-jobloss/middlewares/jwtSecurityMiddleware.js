const fs = require('fs');
const config = require('config');
const passportJWT = require('passport-jwt');
const validate = require('jsonschema').validate;

const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
  secretOrKey: fs.readFileSync(config.key.internal.public, "utf8"),
};

const jwtPayloadJsonSchema = {
  type: 'object',
  properties: {
    idIdentity: {
      type: 'integer',
      required: true,
    },
    permissions: {
      type: 'array',
      required: true,
    },
    partners: {
      type: 'array',
      required: true,
    },
    isAdmin: {
      type: 'boolean',
      required: true,
    },
  },
};

const strategy = new JwtStrategy(jwtOptions, (jwtPayload, next) => {
  console.log(validate(jwtPayload, jwtPayloadJsonSchema));
  if (!jwtPayload || validate(jwtPayload, jwtPayloadJsonSchema).errors.length) {
    return next(false);
  }

  console.log(`[HTTP]JOBLOSS::JwtSecurityMiddleware::Token::Payload::${JSON.stringify(jwtPayload)}`);

  next(null, jwtPayload);
  return null;
});

module.exports = strategy;