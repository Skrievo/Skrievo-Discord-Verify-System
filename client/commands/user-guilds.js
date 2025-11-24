const discord = require('discord.js');

function userguildscmd(interaction) {
    // check if user has admin permissions
    if (!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.reply({
        content: 'You dont have the permission to use this command!',
        ephemeral: true
    })

    const fs = require('fs')

    const user = interaction.options.getUser('user')

    const data = fs.readFileSync('./data/guilds.json', 'utf-8')
    const guilds = JSON.parse(data)

    const userguilds = guilds[user.id]

    let fields = []

    if (!userguilds) return interaction.reply({
        content: 'This user is not verified / no guilds found',
        ephemeral: true
    })
    
    userguilds.forEach(guild => {
        fields.push({
            name: guild.name,
            value: `(${guild.id})\nOwner: ${guild.owner}`,
            inline: true
        })
    })

    // if fields has more than 25 fields, split it into multiple embeds
    if (fields.length > 24) {
        let embeds = []

        let i = 0
        let j = 0

        while (i < fields.length) {
            let embed = new discord.EmbedBuilder()
                .setTitle('Guilds of ' + user.displayName)
                .setColor('#00ff00')
                .addFields(fields.slice(i, i + 24))

            embeds.push(embed)

            i += 24
            j++
        }
        // send the embeds
        interaction.reply({
            embeds: embeds,
            ephemeral: true
        })
    } else {
        let embed = new discord.EmbedBuilder()
            .setTitle('Guilds of ' + user.displayName)
            .setColor('#00ff00')
            .addFields(fields)

        interaction.reply({
            embeds: [embed],
            ephemeral: true
        })
    }

}

module.exports = userguildscmd;