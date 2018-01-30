var express = require('express');
var router = express.Router();
const request = require('request');
const fs = require('fs');

const services = require('../infrastructure/grpc/factories/clientFactory');

let token = null;

fs.readFile('/tmp/public-token/value', 'utf-8', (err, data) => {
  if(!data){
    console.error('No secret found');
  }

  token = data;
})

router.get('/', function(req, res, next) {
  services.example1.exampleSimple()
  .sendMessage({value: 1})
  .then(res => {
    console.log('Example1 CLIENT received simple message : ', res)

    console.log('token', token);
    const url = `http://kub-poc-product-service.default.svc.cluster.local${req.originalUrl}`
    console.log(`Calling ${url} ...`);
    return req.pipe(request(url)).pipe(res);  
  })
  .catch(err => console.error(err));


});

router.get('/health', function(req, res, next) {
  return res.sendStatus(200);
});

module.exports = router;
