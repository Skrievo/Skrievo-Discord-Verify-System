const config = require('../../config');
const axios = require('axios');

async function getAccessToken(code, refresh) {
    // Define Post Request Data
    let data = {
        client_id: config.server.oauth2.client_id,
        client_secret: config.server.oauth2.client_secret,
    }

    // Depending on the Request Type (Refresh or Code) add the needed Data
    if (!refresh) {
        data.grant_type = 'authorization_code';
        data.code = code;
        data.redirect_uri = config.server.oauth2.redirect_url;
        data.scope = config.server.oauth2.scopes.join('%20');
    } else {
        data.grant_type = 'refresh_token';
        data.refresh_token = code;
    }

    // Create Response Object
    let res = {};
    
    // Send Post Request to Discord API
    const rest = await axios.post('https://discord.com/api/oauth2/token', data, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).catch((err) => {
        // If an Error Occured set the Response Object to null
        // console.log(err)
        res.data = {
            access_token: null,
            refresh_token: null
        }
    });

    console.log(rest.data)

    
    // If no Error Occured set the Response Object to the Response Data
    if (rest) res.data = rest.data;
    
    // Return the Response Object
    return res.data
}

module.exports = getAccessToken;