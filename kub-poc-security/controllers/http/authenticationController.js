var express = require('express');
var router = express.Router();

const authenticationsServices = require('../../services/authentications');

router.post('/password', function (req, res, next) {
  console.log('auth::', 'received call for cancelling password', req.params.id);

  authenticationsServices.authenticationService.password(req.body.userName, req.body.password, req.body.type)
  .then(token => 
    res.json({ token })
  );
});

module.exports = router;