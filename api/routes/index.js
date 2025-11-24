const express = require('express');
const router = express.Router();

const config = require('../../config');

router.get('/', (req, res) => {
    // redirect to authorize
    res.redirect(config.server.oauth2.default_route);
});

module.exports = router;