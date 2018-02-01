var express = require('express');
var router = express.Router();

router.get('/be/contracts/:id/cancel', function (req, res, next) {
  console.log('header', req.headers.authorization);
  console.log('jobloss::', 'received call for cancelling contract (open-api)', req.params.id);

  res.json({
    'value': `successfully cancelled contract (open-api) ${req.params.id}`,
  });
});

router.get('/admin/contracts/:id/cancel', function (req, res, next) {
  console.log('jobloss::', 'received call for cancelling contract (admin)', req.params.id);

  res.json({
    'value': `successfully cancelled contract (admin) ${req.params.id}`,
  });
});

router.get('/health', function(req, res, next) {
  return res.sendStatus(200);
});

module.exports = router;