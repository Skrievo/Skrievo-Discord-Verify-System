const client = require("../bot");

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    const command = interaction.commandName;
    let subcommand
    try {
        subcommand = interaction.options?.getSubcommand();
    } catch (error) {
    }
    if (command === "verify") {
        if (subcommand === "send") require("../commands/verify-send")(interaction);
    } else if (command === "user") {
        if (subcommand === "guilds") require("../commands/user-guilds")(interaction);
        if (subcommand === "info") require("../commands/user-info")(interaction);
        if (subcommand === "guildrefresh") require("../commands/user-guildrefresh.js")(interaction);
        if (subcommand === "bypass") require("../commands/user-bypass.js")(interaction);
    } else if (command === "guild") require("../commands/guild.js")(interaction);
})