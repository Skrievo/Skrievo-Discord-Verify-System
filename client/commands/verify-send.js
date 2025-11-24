async function verifysendcmd(interaction) {
    // check if user has admin permissions
    if (!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.reply({
        content: 'You dont have the permission to use this command!',
        ephemeral: true
    })

    const embedcreator = require('../functions/embedcreator')
    const buttoncreator = require('../functions/buttoncreator')

    const embed = await embedcreator('verify.embed')
    const buttons = buttoncreator('verify.buttons')

    interaction.channel.send({
        embeds: [embed],
        components: [buttons]
    })

    interaction.reply({
        content: 'Successfully sent the verify embed!',
        ephemeral: true
    })
}

module.exports = verifysendcmd;