var express = require('express');
var router = express.Router();
const request = require('request');

router.get('/', function(req, res, next) {
  console.log('Calling http://kub-poc-product-service.default.svc.cluster.local ...');
  return req.pipe(request('http://kub-poc-product-service.default.svc.cluster.local')).pipe(res);  
});

router.get('/health', function(req, res, next) {
  return res.sendStatus(200);
});

module.exports = router;
