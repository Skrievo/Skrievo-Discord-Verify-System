// Import Axios
const axios = require('axios');

async function getUserDetails(access_token) {
    // Send Request to Discord API to get the User Details
    const res = await axios.get('https://discord.com/api/users/@me', {
        headers: {
            // Add the Access Token to the Request for Authorization
            'Authorization': `Bearer ${access_token}`
        }
    }).catch(err => {
        
        console.log("cant get user details")
        const id = "null"
        return { id }
    })
    return res.data;
}

module.exports = getUserDetails;