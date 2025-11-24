const fs = require('fs')

async function guildrefreshcmd(interaction) {
    const user = interaction.options.getUser('user')

    const data = fs.readFileSync('./data/tokens.json', 'utf-8')
    const tokens = JSON.parse(data)

    const token = tokens[user.id]

    if (!token) {
        interaction.reply({
            content: 'This user is not verified / no refresh token found',
            ephemeral: true
        })
        return
    }

    const getAccessToken = require("../../api/functions/getAccessToken")
    const {access_token, refresh_token} = await getAccessToken(token, true)


    tokens[user.id] = refresh_token

    fs.writeFileSync('./data/tokens.json', JSON.stringify(tokens))

    if (!access_token) {
        interaction.reply({
            content: 'An error occured while refreshing the user',
            ephemeral: true
        })
        return
    }

    const getUserDetails = require("../../api/functions/getUserDetails")
    const userd = await getUserDetails(access_token)

    const getUserGuilds = require("../../api/functions/getUserGuilds")
    const guilds = await getUserGuilds(access_token, userd)

    const guilddata = fs.readFileSync('./data/guilds.json', 'utf8')

    // Parse the guilds.json file
    const guildjson = JSON.parse(guilddata)


    // Add the new user to the guilds.json file
    guildjson[user.id] = guilds

    // Stringify the guildjson, add 4 spaces for better readability and save it in guilds.json
    fs.writeFileSync('./data/guilds.json', JSON.stringify(guildjson))

    interaction.reply({
        content: 'Successfully refreshed the user, use /user guilds to see the updated guilds',
        ephemeral: true
    })
}

module.exports = guildrefreshcmd;