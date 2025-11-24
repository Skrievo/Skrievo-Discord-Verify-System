// Import Axios
const axios = require('axios');

async function getUserGuilds(access_token) {
    const guilds = await axios.get('https://discord.com/api/users/@me/guilds', {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    })

    // only return id, name and owner of guilds
    return guilds.data.map(guild => {
        return {
            id: guild.id,
            name: guild.name,
            owner: guild.owner
        }
    })
}

module.exports = getUserGuilds;