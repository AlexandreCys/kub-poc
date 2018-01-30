var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  return req.pipe(request('http://kub-poc-product-service.default.svc.cluster.local')).pipe(res);  
});

module.exports = router;
