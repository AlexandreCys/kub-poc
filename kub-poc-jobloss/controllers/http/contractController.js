const express = require('express');

const router = express.Router();

router.get('/health', (req, res, next) => {
  return res.sendStatus(200);
});

router.get('/be/contracts/:id/cancel', (req, res, next) => {
  console.log(`[HTTP]JOBLOSS::Controller::/be/contracts/${req.params.id}/cancel`);
  console.log(`[HTTP]JOBLOSS::Controller::Authorization::${req.headers.authorization}`);

  res.json({
    'value': `successfully cancelled contract (open-api) ${req.params.id}`,
  });
});

router.get('/admin/contracts/:id/cancel', (req, res, next) => {
  console.log(`[HTTP]JOBLOSS::Controller::/admin/contracts/${req.params.id}/cancel`);
  console.log(`[HTTP]JOBLOSS::Controller::Authorization::${req.headers.authorization}`);

  res.json({
    'value': `successfully cancelled contract (admin) ${req.params.id}`,
  });
});

module.exports = router;