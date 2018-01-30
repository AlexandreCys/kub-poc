var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({
    'value': 'hello from admin',
  });
});

module.exports = router;