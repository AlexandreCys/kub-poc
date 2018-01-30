var express = require('express');
var router = express.Router();
const request = require('request');
const fs = require('fs');

let token = null;

fs.readFile('/tmp/public-token/value', 'utf-8', (err, data) => {
  if(!data){
    console.error('No secret found');
  }

  token = data;
})

router.get('/', function(req, res, next) {
  console.log('token', token);
  const url = `http://kub-poc-product-service.default.svc.cluster.local${req.originalUrl}`
  console.log(`Calling ${url} ...`);
  return req.pipe(request(url)).pipe(res);  
});

router.get('/health', function(req, res, next) {
  return res.sendStatus(200);
});

module.exports = router;
