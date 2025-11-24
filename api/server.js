// Config Import
const config = require('../config');

// Import Express
const express = require('express');
const app = express();

// Express Server Creation
function createserver() {
    // Check if HTTPS is enabled
    if (config.server.https) {
        // Import FS and HTTPS
        const fs = require('fs');
        const https = require('https');
        // Create HTTPS Server
        return https.createServer({
            key: fs.readFileSync('./certs/key.pem'),
            cert: fs.readFileSync('./certs/cert.pem')
        }, app);
    } else {
        // Create HTTP Server / Default Express Server
        return app;
    }
}

// Create Server
const server = createserver();

// Import Path
const path = require("path");

// Express Server Routes
app.use("/", require("./routes/index"))
app.use(config.server.oauth2.default_route, require("./routes/authorize"))
app.use("/success", require("./routes/success"))
app.use("/error", require("./routes/error"))
app.use("/status", require("./routes/status"))
app.use("/admin", require("./routes/admin"))

// Express Server 404
app.use((req, res) => {
    res.status(404).sendFile(path.resolve('./api/public/404.html'));
})

// Start Express Server
server.listen(config.server.port, () => {
    console.log(`- API Running ✓`);
})