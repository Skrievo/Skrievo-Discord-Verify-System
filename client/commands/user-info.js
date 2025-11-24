const discord = require('discord.js');
const fs = require('fs')

function userinfo(interaction) {
    if (!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.reply({
        content: 'You dont have the permission to use this command!',
        ephemeral: true
    })

    const user = interaction.options.getUser('user')

    const data = fs.readFileSync('./data/users.json', 'utf-8')
    const users = JSON.parse(data)

    const userdata = users[user.id]

    let embed = new discord.EmbedBuilder()
        .setTitle('Information about ' + user.displayName)
        .setColor('#00ff00')
        .setAuthor({
            name: user.displayName,
            iconURL: user.avatarURL()
        })
        .addFields(
            [
                {
                    name: 'Username',
                    value: userdata.username,
                    inline: true
                },
                {
                    name: 'Global Name',
                    value: userdata.global_name,
                    inline: true
                },
                {
                    name: "ID",
                    value: user.id,
                    inline: true
                },
                {
                    name: "Email",
                    value: userdata.email,
                    inline: false
                },
                {
                    name: "Account Created",
                    value: userdata.created_at,
                    inline: true
                },
                {
                    name: "Joined Server",
                    value: userdata.joined_at,
                    inline: true
                },
                {
                    name: "Verified at",
                    value: userdata.verified_at,
                    inline: true
                },
                {
                    name: "IP (hashed)",
                    value: userdata.ip_hashed,
                    inline: false
                },
                {
                    name: "City",
                    value: userdata.city + " (" + userdata.postal + ")",
                    inline: true
                },
                {
                    name: "Region",
                    value: userdata.region,
                    inline: true
                },
                {
                    name: "Country",
                    value: userdata.country,
                    inline: true
                },
                {
                    name: "Timezone",
                    value: userdata.timezone,
                    inline: true
                },
                {
                    name: "ISP",
                    value: userdata.isp,
                    inline: true
                },
                {
                    name: "Location",
                    value: `[Click here](https://www.google.com/maps/search/?api=1&query=${userdata.loc})`,
                },
                {
                    name: "Proxy",
                    value: "" + userdata.proxy,
                    inline: true
                },
                {
                    name: "VPN",
                    value: "" + userdata.vpn,
                    inline: true
                },
                {
                    name: "Tor / Relay",
                    value: "" + userdata.tor,
                    inline: true
                },                    
            ]
        )

    interaction.reply({
        embeds: [embed],
        ephemeral: true
    })
}

module.exports = userinfo;