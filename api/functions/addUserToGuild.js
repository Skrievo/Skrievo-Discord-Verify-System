// Import Config
const config = require('../../config');

// Get Client
const client = require('../../client/bot');

async function addUserToGuild(access_token, userid, guildid) {
    // Add User to Guild via discord.js
    try {
        const member = await client.guilds.cache.get(guildid || config.guildid).members.add(userid, {
                accessToken: access_token
            }
        )
        // Return Member Object
        return member
    }
    catch (e) {
        // Return Error
        return {status: false, reason: "User is allready banned from the guild", action: "none"}
    }
}

module.exports = addUserToGuild;