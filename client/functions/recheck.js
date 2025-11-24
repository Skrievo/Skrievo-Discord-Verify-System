const fs = require('fs');

const config = require('../../config');

const getAccessToken = require("../../api/functions/getAccessToken");
const logtodc = require('./log');

const client = require('../bot')

async function recheck() {
    const tokens = fs.readFileSync('./data/tokens.json', 'utf8')
    const tokensjson = JSON.parse(tokens)

    const users = fs.readFileSync('./data/users.json', 'utf8')
    const usersjson = JSON.parse(users)

    let guild = await client.guilds.fetch(config.guildid)

    // go through all tokens and refresh them
    for (const [key, value] of Object.entries(tokensjson)) {
        if (usersjson[key].bypass) continue

        const {access_token, refresh_token} = await getAccessToken(value, true)

        if (!access_token) {
            let member = {}
            try {
                member = await guild.members.fetch(key)
                if (member) {
                    for (const role of config.verify.roles.remove) {
                        member.roles.add(role);
                    }
                    for (const role of config.verify.roles.add) {
                        member.roles.remove(role);
                    }
                }
            } catch (e) {
            }

            // remove username from users.json
            let userdata = fs.readFileSync('./data/users.json', 'utf8')
            let userjson = JSON.parse(userdata)
            member.user = userjson[key]

            delete tokensjson[key]
            await logtodc('unverify', `Error while refreshing ${key} (Deauthroized App)`, member)
            fs.writeFileSync('./data/tokens.json', JSON.stringify(tokensjson))

            // remove user from tokens.json
            continue
        } else {
            tokensjson[key] = refresh_token
            fs.writeFileSync('./data/tokens.json', JSON.stringify(tokensjson))
            // wait 5 seconds to not get rate limited
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }



}

module.exports = recheck;