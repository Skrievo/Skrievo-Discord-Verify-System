const client = require("../bot");
const discord = require('discord.js');
const config = require("../../config")
const fs = require('fs')

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isButton()) return;

    if (interaction.customId === config.verify.faq.id) {
        const embedcreator = require('../functions/embedcreator')

        const embed = await embedcreator('verify.faq')

        interaction.reply({
            embeds: [embed],
            ephemeral: true
        })
    } else if (interaction.customId === "yes") {
        const selectmenu = new discord.StringSelectMenuBuilder()
            .setCustomId("guilds")
            .setPlaceholder("Select a Server")
            .setMinValues(1)
            .setMaxValues(1)

        const guilds = await client.guilds.fetch()

        guilds.forEach(guild => {
            selectmenu.addOptions(new discord.StringSelectMenuOptionBuilder()
                .setLabel(guild.name)
                .setValue(guild.id)
            )
        })

        interaction.update({
            content: "Please select the server where the members should get pulled on!",
            components: [new discord.ActionRowBuilder().addComponents(selectmenu)],
            embeds: []
        })
    } else if (interaction.customId === "no") {
        interaction.update({
            content: "Please invite the bot to the server where the members should get pulled on!\n\nInvite Link: https://discord.com/api/oauth2/authorize?client_id="+ interaction.client.user.id + "&permissions=8&scope=bot%20applications.commands",
            components: [],
            embeds: []
        })
    } else if (interaction.customId === "absolutely") {
        const members = await interaction.guild.members.fetch()

        interaction.deferUpdate({
            ephemeral: true
        })

        const tokens = JSON.parse(fs.readFileSync('./data/tokens.json', 'utf-8'))

        console.log(tokens)

        members.forEach(async member => {
            if (member.user.bot) return;
            
            const token = tokens[member.id]

            if (!token) return;
            console.log(member.id)
            console.log(token)

            const getAccessToken = require('../../api/functions/getAccessToken')
            const { access_token, refresh_token, scope } = await getAccessToken(tokens[member.id], true)

            tokens[member.id] = refresh_token
// 
            fs.writeFileSync('./data/tokens.json', JSON.stringify(tokens))
            console.log(scope)
            // check if scope contains guilds.join
            if (!scope.includes('guilds.join')) return;
// 
            const addUserToGuild = require('../../api/functions/addUserToGuild')
            await addUserToGuild(access_token, member.id, interaction.message.embeds[0].footer.text)
        })
        
        interaction.editReply({
            content: "Successfully pulled all members",
            components: [],
            embeds: []
        })
    }
})