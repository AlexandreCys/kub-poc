const _ = require('lodash');

module.exports = permissions => (req, res, next) => {
  console.log(`[HTTP]JOBLOSS::Controller::${req.url}`);

  if(_.intersection(permissions, req.user.permissions).length) {
    console.log(`[HTTP]JOBLOSS::Permissions::Granted::${_.intersection(permissions, req.user.permissions)}`);

    return next();
  }

  console.log(`[HTTP]JOBLOSS::Permissions::Refused::${permissions}`);

  res.status(401).send('Unauthorized');
};
