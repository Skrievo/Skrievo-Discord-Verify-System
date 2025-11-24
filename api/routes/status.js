const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // Status Response
    const uptime = process.uptime();
    const uptimeString = `${Math.floor(uptime / 86000)}d ${Math.floor(uptime / 3600)}h ${Math.floor((uptime % 3600) / 60)}m ${Math.floor(uptime % 60)}s`;
    res.json({
        status: 'up',
        uptime: uptime,
        uptime_str: uptimeString,
        timestamp: Date.now(),
        powerd_by: 'CODEBOTZ',
    })
});

module.exports = router;