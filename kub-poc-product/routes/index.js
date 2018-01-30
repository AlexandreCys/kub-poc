var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({
    'value': 'hello world'
  });
});

router.get('/health', function(req, res, next) {
  return res.sendStatus(200);
});

module.exports = router;