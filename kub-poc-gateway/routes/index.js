var express = require('express');
var router = express.Router();
const request = require('request');

router.get('/', function(req, res, next) {
  const url = `http://kub-poc-product-service.default.svc.cluster.local${req.originalUrl}`
  console.log(`Calling ${url} ...`);
  return req.pipe(request(url)).pipe(res);  
});

router.get('/health', function(req, res, next) {
  return res.sendStatus(200);
});

module.exports = router;
