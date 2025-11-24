const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // redirect to authorize
    res.redirect("https://discord.gg/codebotz");
});

module.exports = router;