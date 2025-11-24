const config =  require("../../config")
const client = require("../bot")
const fs = require('fs')

async function userbypasscmd(interaction) {
    const user = interaction.options.getUser('user')

    const data = fs.readFileSync('./data/users.json', 'utf-8')
    const users = JSON.parse(data)
    
    const userdata = users[user.id]

    if (!userdata) return interaction.reply({
        content: 'This user is not verified',
        ephemeral: true
    })

    if (userdata.bypass) return interaction.reply({
        content: 'This user is already bypassed',
        ephemeral: true
    })

    userdata.bypass = true

    let member = await client.guilds.cache.get(config.guildid).members.fetch(user.id)

    member.roles.add(config.verify.bypass)

    fs.writeFileSync('./data/users.json', JSON.stringify(users))

    interaction.reply({
        content: 'Successfully bypassed the user',
        ephemeral: true
    })
}

module.exports = userbypasscmd