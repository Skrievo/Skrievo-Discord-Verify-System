const { ActionRowBuilder, ButtonBuilder } = require("discord.js")
const config = require("../../config")

function buttoncreator(name) {
    // Create a new Button Array
    let buttons = []
    // Get the config path
    let args = name.split(".")
    // Get the config
    let conf = config
    // Get Item from config
    args.forEach(arg => {
        conf = conf[arg]
    })

    // Loop through the config of buttons
    conf.forEach(button => {
        // Create a new ButtonBuilder
        let buttonbuilder = new ButtonBuilder()
            .setLabel(button.label)
            .setStyle(button.style)

        // Add Emoji if there is one
        if (button.emoji) 
            buttonbuilder
                .setEmoji(button.emoji)

        // Add URL or Custom ID
        if (button.style === 5) {
            buttonbuilder
                .setURL(button.url)
        } else {
            buttonbuilder
                .setCustomId(button.custom_id)
        }

        // Add Button to the Array
        buttons.push(buttonbuilder)
    })
    
    // Return the Array
    const row = new ActionRowBuilder()
        .addComponents(buttons)

    return row
}

module.exports = buttoncreator;