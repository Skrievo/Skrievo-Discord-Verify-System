const client = require("../bot");
const discord = require('discord.js');

// create a new command

const commands = [] 

commands.push(new discord.SlashCommandBuilder()
    .setName('verify')
    .setDescription('Verify yourself')
    .addSubcommand(subcommand =>
        subcommand
            .setName('send')
            .setDescription('Send a verification message')
    )
)

commands.push(new discord.SlashCommandBuilder()
    .setName('user')
    .setDescription('Get information about a user')
    .addSubcommand(subcommand => 
        subcommand
            .setName('guilds')
            .setDescription('Get the guilds of a user')
            .addUserOption(option =>
                option
                    .setName('user')
                    .setDescription('The user to get the guilds of')
                    .setRequired(true)
            )
    )
    .addSubcommand(subcommand => 
        subcommand
            .setName('info')
            .setDescription('Get information about a user')
            .addUserOption(option =>
                option
                    .setName('user')
                    .setDescription('The user to get the information of')
                    .setRequired(true)
            )
    )
    .addSubcommand(subcommand => 
        subcommand
            .setName('guildrefresh')
            .setDescription('Refresh User Guilds')
            .addUserOption(option =>
                option
                    .setName('user')
                    .setDescription('The user to refresh the information of')
                    .setRequired(true)
            )
    )
    .addSubcommand(subcommand => 
        subcommand
            .setName('bypass')
            .setDescription('Bypass User for Verification (Recheck Only)')
            .addUserOption(option =>
                option
                    .setName('user')
                    .setDescription('The user to bypass')
                    .setRequired(true)
            )
    )
)

commands.push(new discord.SlashCommandBuilder()
    .setName('guild')
    .setDescription('Pull Users to a new Server')
)

commands.forEach(command => {
    const rawdata = command.toJSON()

    // set the command to the client
    client.application.commands.create(rawdata)
})