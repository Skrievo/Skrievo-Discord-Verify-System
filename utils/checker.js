// Do some Checks of the Config and Stuff
// Import Configs
require("dotenv").config();
const config = require("../config");

// Import Modules
const http = require('http'); // Needed for port check
const axios = require("axios"); // Needed for redirect url check

async function port_check() {
    const server = http.createServer().listen(config.server.port);
    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.error("Port " + config.server.port + " is already in use ✗");
            process.exit(1);
        } else {
            console.error(err);
            process.exit(1);
        }
    });
    server.close();
}

async function redircturl_check() {
    await axios.get(`https://discord.com/api//applications/@me`, { headers: { Authorization: `Bot ${process.env.TOKEN}`}}).then((res) => {
        const redirect_url = res.data.redirect_uris
        if (!redirect_url) {
            console.error("Redirect url is not added to discord developer portal ✗\nGo to https://discord.com/developers/applications and add: " + config.server.oauth2.redirect_url + " to the redirect url under the oauth2 tab");
            process.exit(1);
        }
        let found = false;
        redirect_url.forEach((url) => {
            if (url == config.server.oauth2.redirect_url) {
                found = true;
            }
        })
        if (!found) {
            console.error("- Redirect url ✗\nHOW TO SOLVE ISSUE?\nGo to https://discord.com/developers/applications and add: " + config.server.oauth2.redirect_url + " to the redirect url under the oauth2 tab");
            process.exit(1);
        }
    }).catch((err) => {
        console.error("An error occured while checking redirect url, check your Bot Token ✗");
        process.exit(1);
    })
}

async function checkconfig() {
    console.log("- Checking Config ...");
    await port_check();
    await redircturl_check();
    console.log("- Config Valid ✓");
    // Starting API
    console.log("- Starting API ...");
    require("../api/server")
    console.log("- Starting Client ...");
    require("../client/bot")
}

checkconfig();