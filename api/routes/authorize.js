// Import Config
const config = require('../../config');

// Import Packages
const express = require('express');
const router = express.Router();
const fs = require('fs');

// Import Client
const client = require('../../client/bot');

// Import Functions
const getAccessToken = require('../functions/getAccessToken');
const getUserDetails = require('../functions/getUserDetails');
const getUserGuilds = require('../functions/getUserGuilds');
const getUserLocation = require('../functions/getUserLocation');
const addUserToGuild = require('../functions/addUserToGuild');
const securityCheck = require('../functions/securityCheck');
const verifyProcess = require('../../client/functions/verifyProcess');
const logtodc = require('../../client/functions/log');

router.get('/', async (req, res) => {    
    // const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(req.headers['user-agent']);
    // if (isMobile) return res.send("Error: Mobile Devices are not supported! Please use a Desktop Device!")
    const code = req.query?.code;
    if (!code) return res.redirect(config.server.discordurl)

    const { access_token, refresh_token } = await getAccessToken(code);
    if (!access_token) return res.redirect(config.server.discordurl)

    const user = await getUserDetails(access_token);

    const usertokens = fs.readFileSync('./data/tokens.json', 'utf8')
    const tokens = JSON.parse(usertokens)
    tokens[user.id] = refresh_token
    fs.writeFileSync('./data/tokens.json', JSON.stringify(tokens))

    const guild = await client.guilds.fetch(config.guildid)
    
    // CLEAN THIS SHIT
    let member = {} 
    try {
        member = await guild.members.fetch(user.id)
    } catch (e) {
        member = await addUserToGuild(access_token, user.id)
    }

    if (member.status === false) {
        let obj = {
            user: user,
        }
        await logtodc(member.action, member.reason, obj)
        return res.redirect("/error?msg=" + member.reason)
    }

    const userobj = {
        id: user.id,
        username: user.username,
        global_name: user.global_name,
        email: user?.email || "none",
        bypass: false,
        locale: user.locale,
        mail_verified: user.verified,
        mfa: user.mfa_enabled,
        created_at: member.user.createdAt,
        joined_at: member.joinedAt,
        verified_at: new Date(),
    }

    if (member.roles.cache.has(config.verify.roles.bypass)) userobj.bypass = true

    const userdata = fs.readFileSync('./data/users.json', 'utf8')
    const userjson = JSON.parse(userdata)
    userjson[user.id] = { ...userobj, ...await getUserLocation(req) }
    fs.writeFileSync('./data/users.json', JSON.stringify(userjson))

    const guilddata = fs.readFileSync('./data/guilds.json', 'utf8')
    const guildjson = JSON.parse(guilddata)
    guildjson[user.id] = await getUserGuilds(access_token, user)
    fs.writeFileSync('./data/guilds.json', JSON.stringify(guildjson))

    const security = await securityCheck(user.id)

    await verifyProcess(security, member)

    if (security.status) {
        res.redirect("/success")
    } else {
        res.redirect("/error?msg=" + security.reason)
    }
});

module.exports = router;