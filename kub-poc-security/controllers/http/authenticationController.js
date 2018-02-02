const express = require('express');
const authenticationsServices = require('../../services/authentications');

const router = express.Router();

router.get('/health', (req, res, next) => {
  return res.sendStatus(200);
});

router.post('/login', (req, res, next) => {
  console.log(`[HTTP]SECURITY::Controller::Password::${JSON.stringify(req.body)}`);

  authenticationsServices.authenticationService.password(req.body.username, req.body.password, req.body.type)
  .then(token => 
    res.json({ token })
  )
  .catch(err => res.status(401).send('Unauthorized'))
});

module.exports = router;