const config = require('../config');

const discord = require('discord.js');

const client = new discord.Client({
    intents: [
        discord.GatewayIntentBits.GuildMembers,
        discord.GatewayIntentBits.Guilds,
        discord.GatewayIntentBits.GuildMessages,
    ],
    autoReconnect: true,
});

client.on('ready', () => {
    console.log('- Client Running ✓');
    require('./handler/commands')
    require('./functions/commandcreator')
    require('./handler/buttons')
    require('./handler/bypassrole')
    require('./handler/selectmenus')

    const recheck = require('./functions/recheck')

    // recheck()
    setInterval(() => {
        recheck()
    }, 1000 * 60 * 60 * 12)
})

client.login(config.bot.token)

module.exports = client;