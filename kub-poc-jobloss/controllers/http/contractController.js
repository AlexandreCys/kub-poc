const express = require('express');
const passport = require('passport');
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
  (req, res, next) => res.json({
    'status': `CANCELED`,
    'cancelType': 'user',
    'contractId': req.params.id,
  })
);

router.get('/admin/contracts/:id/cancel',  
  passport.authenticate('jwt', { session: false }),
  middlewares.permissionMiddleware([
    'jobloss.contract.delete'
  ]),
  (req, res, next) => res.json({
    'status': `CANCELED`,
    'cancelType': 'admin',
    'contractId': req.params.id,
  })
);

module.exports = router;