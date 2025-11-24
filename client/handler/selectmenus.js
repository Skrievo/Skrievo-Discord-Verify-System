const client = require("../bot");
const discord = require('discord.js');
const config = require("../../config")

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isStringSelectMenu()) return;

    if (interaction.customId === "guilds") {
        const guild = await client.guilds.fetch(interaction.values[0])

        const embed = new discord.EmbedBuilder()
            .setTitle("Are you sure to proceed?")
            .setAuthor({
                name: guild.name,
                iconURL: guild.iconURL()
            })
            .setFooter({
                text: guild.id,
                iconURL: guild.iconURL()
            })

        interaction.update({
            content: null,
            embeds: [embed],
            components: [new discord.ActionRowBuilder().addComponents(
                new discord.ButtonBuilder()
                .setCustomId("absolutely")
                .setLabel("Yes")
                .setStyle(3),
                new discord.ButtonBuilder()
                .setCustomId("noo")
                .setLabel("No")
                .setStyle(4)
            )],
            ephemeral: true
        })
    }
})