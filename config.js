require("dotenv").config();
const config = {};

config.guildid = ""; // Guild ID

// Default Bot Settings
config.bot = {
    token: process.env.TOKEN, // Bot Token (Change this in the .env File)
    user: {
        enabled: false, // If enabled the Name and Avatar will be overwritten
        name: "Verify Bot",
        avatar: "",
    },
    color: "#2b2b2b", // Default Embed Color
    activity_enabled: true, // If disabled Bot wont override Activity (if multiple Bots are running on same Token)
    activitys: [
        {
            name: "through the matrix",
            type: "Watching",
            status: "idle",
        },
        {
            name: "with your data",
            type: "Playing",
            status: "dnd",
        },
        {
            name: "in your life",
            type: "Competing",
            status: "online",
        },
    ],
    intervall: 10 * 1000, // Intervall of Activity Change
};

config.server = {
    // INFO: If Bot is running on a Server wich hasnt a public IP its recommended to use a Domain for Proxy.
    ip: "", // Domain or IP Adress of Server
    port: 6001, // Port of Server wich is free and open
    https: false, // If you use a Domain with SSL you can set this to true -> to install cert just run the command "npm run cert"

    proxy: {
        enabled: true, // If you use a Proxy or Jumphost to connect to the Server set this to true
        ip: "verify.codebotz.net", // Domain or IP Adress of Proxy
        https: true, // Important for Discord OAuth2 Requests
    },

    // Check https://discord.com/developers/applications/ for more information
    oauth2: {
        client_id: "1140741872084598826", // Client ID of Discord Application
        client_secret: process.env.CLIENT_SECRET, // Client Secret of Discord Application (Change this in the .env File)
        default_route: "/auth", // Default Route for OAuth2 Callback
        scopes: ["identify", "guilds.join", "guilds", "email"], // Scopes for OAuth2
    },
};

// Just dont touch this if you dont know what your are doing
if (config.server.proxy.enabled) {
    config.server.oauth2.redirect_url = config.server.proxy.https
        ? "https://" + config.server.proxy.ip + config.server.oauth2.default_route
        : "http://" + config.server.proxy.ip + config.server.oauth2.default_route;
} else {
    config.server.oauth2.redirect_url = config.server.https
        ? "https://" +
        config.server.ip +
        ":" +
        config.server.port +
        config.server.oauth2.default_route
        : "http://" +
          config.server.ip +
          ":" +
          config.server.port +
          config.server.oauth2.default_route;
}

config.server.discordurl = `https://discord.com/api/oauth2/authorize?client_id=${config.server.oauth2.client_id}&redirect_uri=${config.server.oauth2.redirect_url}&response_type=code&scope=${config.server.oauth2.scopes.join('%20')}`;

config.server.discordurl_noguildjoin = config.server.discordurl.replace("guilds.join", "");

config.verify = {
    // If you dont want the image for example just remove the line
    embed: {
        title: "Verify", // Title of Embed
        description: "Please click on Verify on this message to verify yourself and have access to the channels.", // Description of Embed
        color: "#2d1f54", // Color of Embed
        fields: [
            {
                name: "Verify (With Guild Join)",
                value: "This will verify yourself and give the bot the permission to join the servers for you. We will use it in case Discord ever takes down our server.",
                inline: true
            },
            {
                name: "Verify (No Guild Join)",
                value: "This will verify yourself but the bot has no permissions to join the new server for you in case Discord will take it down.",
                inline: true
            },
            {
                name: "Additional Information",
                value: "When you buy one product from CODEBOTZ you have to give the bot the permission to join servers for you and enable DM from the bot."
            }
        ],
        image: "https://media.discordapp.net/attachments/1061453021902544978/1140418112940945418/cdbz2.png", // Image of Embed
        banner: "https://media.discordapp.net/attachments/1148993838678032384/1148993948241625158/verify.png", // Banner of Embed
        author: {
            name: "Verify Bot", // Name of Author
            iconURL: "https://media.discordapp.net/attachments/1061453021902544978/1140418112940945418/cdbz2.png", // Icon of Author
            url: "https://discord.gg/CODEBOTZ", // URL of Author
        },
        footer: {
            text: "Verify Bot by CODEBOTZ", // Text of Footer
            iconURL: "https://media.discordapp.net/attachments/1061453021902544978/1140418112940945418/cdbz2.png", // Icon of Footer
        },
        timestamp: true, // If true the Embed will have a Timestamp
    },
    buttons: [
        {
            label: "Verify (With Guild Join)", // Label of Button
            style: 5, // Style of Button (https://discord.com/developers/docs/interactions/message-components#button-object-button-styles)
            emoji: "✅", // Emoji of Button
            url: config.server.discordurl
        },
        {
            label: "Verify (No Guild Join)", // Label of Button
            style: 5, // Style of Button (https://discord.com/developers/docs/interactions/message-components#button-object-button-styles)
            emoji: "✅", // Emoji of Button
            url: config.server.discordurl_noguildjoin
        },
        {
            label: "FAQ", // Label of Button
            style: 2, // Style of Button (https://discord.com/developers/docs/interactions/message-components#button-object-button-styles)
            emoji: "❓", // Emoji of Button
            custom_id: "faq", // Custom ID of Button
        }
    ],
    faq: {
        id: "faq", // Custom ID of Button
        title: "Verify", // Title of Embed
        description: "Here you find the most asked questions.", // Description of Embed
        color: "#2d1f54", // Color of Embed
        image: "https://media.discordapp.net/attachments/1061453021902544978/1140418112940945418/cdbz2.png", // Image of Embed
        banner: "https://media.discordapp.net/attachments/1148993838678032384/1148993948241625158/verify.png", // Banner of Embed
        fields: [
            {
                name: "Why do I have to go through a verification process to join your Discord server?",
                value: "We ask members to verify themselves on our Discord server to create a safe and enjoyable community. This process helps us keep out fake or harmful accounts, ensuring a better experience for everyone."
            },
            {
                name: "What information do you collect during the verification process?",
                value: "When you verify yourself, we collect the following information:\n\n- User Guilds: This helps us spot and prevent fake accounts from entering the server.\n- Email: We gather your email for future use in our web panel system, which will provide extra features and benefits.\n- IP Address (hashed): We collect hashed IP addresses to identify and manage multiple accounts from the same IP, helping to maintain server security.\n- City, Region, and Country (based on IP): This data is used for analytics, giving us insights into the geographical distribution of our community members."
            },
            {
                name: "What does 'joins server for you' mean during the verification process?",
                value: "'Joins server for you' is a safety net. In case Discord ever takes down our server, this function ensures you won't lose access to our service and we dont loose the connection to you. It's our way of ensuring that you can continue to be part of the community, even in unexpected situations."
            },
            {
                name: "Will my data be shared with third parties?",
                value: "Absolutely not. We are committed to safeguarding your privacy. Your data will never be sold, shared in a Discord channel, or exposed to external parties."
            },
            {
                name: "How is my data stored and protected?",
                value: "Your data is stored securely. We hash your IP address to keep it anonymous, and we follow industry standards to protect your personal information from unauthorized access or disclosure."
            },
            {
                name: "Can I choose not to provide certain information during verification?",
                value: "Due to the fact that you don't have to provide information by yourself because it's all done by Discord or your browser, there's no way to avoid giving certain data away. However, please rest assured that we don't collect unnecessary data, and we prioritize your privacy. You can trust that your information is handled with care."
            },
            {
                name: "Can I request the removal of my data from your records?",
                value: "Yes, you can request the removal of your data. However, please be aware that doing so comes with a risk – you may lose access to your purchased products, and you won't be able to buy new ones. Removing your data means severing ties with your account's history on our server."
            },
            {
                name: "Is my personal information safe with you?",
                value: "Yes, your personal information is safe with us. We take data security and privacy seriously and have implemented measures to protect your information from unauthorized access or disclosure."
            }
        ],
        author: {
            name: "Verify Bot", // Name of Author
            iconURL: "https://media.discordapp.net/attachments/1061453021902544978/1140418112940945418/cdbz2.png", // Icon of Author
            url: "https://discord.gg/CODEBOTZ", // URL of Author
        },
        footer: {
            text: "Verify Bot by CODEBOTZ", // Text of Footer
            iconURL: "https://media.discordapp.net/attachments/1061453021902544978/1140418112940945418/cdbz2.png", // Icon of Footer
        },
        timestamp: true, // If true the Embed will have a Timestamp
    },
    roles: {
        remove: [], // Roles wich will be removed after Verification
        add: ["1140405831658110996"], // Roles wich will be added after Verification
    },
    bypass: "1153375895013306512", // Roles wich can bypass the Verification & recheck
}

config.security = {
    account: {
        enabled: true, // If enabled the Account Age will be checked
        age: 7 * 24 * 60 * 60 * 1000, // Minimum Account Age in ms (7 Days)
        action: "ban" // ban, kick, none
    },
    guilds: {
        enabled: false, // If enabled the Guilds from User will be checked
        blacklist: ["613425648685547542"], // Guilds wich the User is not allowed to be in
        action: "ban"
    },
    ip: {
        enabled: true, // If enabled the IP will be checked
        anti_proxy: true,
        anti_tor: true,
        anti_vpn: true,
        anti_relay: true,
        anti_isp: {
            // Block certain Internet Service Providers (Telecom for example)
            enabled: false,
            blacklist: ["telecom"]
        },
        action: "none" // If action is none the User just dont get verified
    },
    geolocation: {
        enabled: false, // If enabled the Geolocation will be checked
        blacklist: ["US", "CA", "GB", "AU", "NZ"], // Blacklisted Countries
        action: "ban"
    },
    discord: {
        enabled: true, // If enabled Discord Settings will be checked
        verified: true, // If enabled the User must be verified on Discord
        mfa_enabled: false, // If enabled the User must have MFA enabled (not recommended)
        action: "ban"
    }
}

config.log = {
    enabled: true, // If enabled the Bot will log to Discord
    channel: "1140461791479070720", // Channel ID of Log Channel
    colors: {
        none: "#ffffff",
        verify: "#00ff00",
        unverify: "#000000",
        kick: "#ff5500",
        ban: "#ff0000",
    },
    embed: {
        title: "Verify Logs", // Title of Embed
        description: "A user tried to verify himself or refresher did his job", // Description of Embed
        color: "#2d1f54", // Color of Embed (will get overwritten by color in config.log.colors)
        image: "https://media.discordapp.net/attachments/1061453021902544978/1140418112940945418/cdbz2.png", // Image of Embed
        banner: "https://media.discordapp.net/attachments/1148993838678032384/1148993948241625158/verify.png", // Banner of Embed
        author: {
            name: "Verify Bot", // Name of Author
            iconURL: "https://media.discordapp.net/attachments/1061453021902544978/1140418112940945418/cdbz2.png", // Icon of Author
            url: "https://discord.gg/CODEBOTZ", // URL of Author
        },
        footer: {
            text: "Verify Bot by CODEBOTZ", // Text of Footer
            iconURL: "https://media.discordapp.net/attachments/1061453021902544978/1140418112940945418/cdbz2.png", // Icon of Footer
        },
        fields: [
            {
                name: "User ID",
                value: "```{userid}```",
                inline: false
            },
            {
                name: "Username",
                value: "```{username}```",
                inline: true
            },
            {
                name: "Action",
                value: "```{action}```",
                inline: true
            },
            {
                name: "Reason",
                value: "```{reason}```",
                inline: false
            }
        ],
        timestamp: true, // If true the Embed will have a Timestamp
    }
}

module.exports = config;