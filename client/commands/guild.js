const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require("discord.js")

async function guilds(interaction) {
    const embed = new EmbedBuilder()
        .setTitle("Member Transfer")
        .setDescription("Is the Bot already on the new server where the members should get pulled on?")

    const row = new ActionRowBuilder()

    row.addComponents(new ButtonBuilder()
        .setCustomId("yes")
        .setLabel("Yes")
        .setStyle(3),
        new ButtonBuilder()
        .setCustomId("no")
        .setLabel("No")
        .setStyle(4)
    )

    interaction.reply({
        embeds: [embed],
        components: [row],
        ephemeral: true
    })
}

module.exports = guilds