const express = require('express');
const router = express.Router();

router.get('/health', (req, res, next) => {
    return res.sendStatus(200);
});

module.exports = router;
