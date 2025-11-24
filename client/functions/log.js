const embedcreator = require('./embedcreator')
const client = require('../bot')

// Import Config
const config = require('../../config');

async function logtodc(action, reason, member) {
    const embed = await embedcreator('log.embed')
    let color = config.log.colors[action]
    embed.setColor(color)

    const fields = JSON.parse(JSON.stringify(embed.data.fields));

    // replace field values with the actual values
    fields.forEach(field => {
        field.value = field.value.replace('{action}', action)
        field.value = field.value.replace('{reason}', reason)
        field.value = field.value.replace('{username}', member.user.username)
        field.value = field.value.replace('{userid}', member.user.id)
        field.value = field.value.replace('{usermention}', member?.toString() || "<@" + member.user?.id + ">")
    })

    embed.data.fields = fields;

    let guild = await client.guilds.fetch(config.guildid)
    let channel = guild.channels.cache.get(config.log.channel)

    if (!channel) return console.log('Log Channel not found')

    return channel.send({embeds: [embed]})
    
}

module.exports = logtodc;