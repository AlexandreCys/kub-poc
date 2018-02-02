const express = require('express');
const passport = require('passport');
const services = require('../../services');
const middlewares = require('../../middlewares');

const router = express.Router();

router.get('/health', (req, res, next) => {
  return res.sendStatus(200);
});

router.get('/be/contracts/:id/cancel',
  passport.authenticate('jwt', { session: false }),
  middlewares.permissionMiddleware([
    'jobloss.contract.delete'
  ]),
  (req, res, next) => services.contractServices.contractService.cancel(req.params.id, req.user, 'user')
  .then(response => res.json(response))
);

router.get('/admin/contracts/:id/cancel',  
  passport.authenticate('jwt', { session: false }),
  middlewares.permissionMiddleware([
    'jobloss.contract.delete'
  ]),
  (req, res, next) => services.contractServices.contractService.cancel(req.params.id, req.user, 'admin')
  .then(response => res.json(response))
);

module.exports = router;