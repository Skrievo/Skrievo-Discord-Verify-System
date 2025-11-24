🔐 Advanced Skrievo Discord Verification Bot

This Discord bot provides a fully automated, secure, and customizable verification system with OAuth2 login, IP protection, logging, and role assignment.
It is designed for communities that want maximum security, automation, and anti-alt protection, while offering a modern and user-friendly verification process.

✨ Features
✅ OAuth2-Based Verification

The bot uses Discord OAuth2 to verify users securely. It supports:

Identification (Discord ID, Username)

Email collection (for future web panel features)

Guild Join permissions (optional)

Automatic redirect handling, with or without a proxy

🎨 Customizable Verification Embed

You can fully customize:

Title, description, colors

Images & banners

Author & footer

Buttons (Verify with/without Guild Join, FAQ)

📌 Two Verification Modes

Verify (With Guild Join)
Allows the bot to automatically re-add users if Discord removes the server.

Verify (No Guild Join)
For users who prefer not to give Guild Join permissions.

🔍 FAQ System

A built-in FAQ embed answers the most common questions about:

Data usage

Why verification is required

Privacy

IP handling

Account requirements

Data deletion requests

🛡️ Advanced Security Checks

The bot includes multiple layers of protection:

Account Security

Minimum account age check

Kick/ban actions on violation

Guild Blacklist

Prevent users in specific guilds from joining

Ban actions supported

IP Protection

Includes detection for:

Proxies

TOR

VPNs

Relays

ISP blacklist (optional)

Geolocation

Country blacklist

Auto-ban support

Discord Account Checks

Verified Discord account requirement

MFA requirement (optional)

🧩 Custom Roles

Add roles upon successful verification

Remove roles during verification

Bypass role for staff

📑 Logging System

Logs are sent to a Discord channel with:

User ID

Username

Action

Reason

Timestamp

Custom colors per action (verify, unverify, kick, ban)

🔧 Proxy & Non-Proxy Support

Works with:

Direct server IPs

Domains with SSL

Reverse proxies

Jumphosts for secure OAuth2 handling

Redirect URLs are generated automatically depending on your configuration.

⚙️ Bot Activity Rotation

The bot supports rotating activities every X seconds:

Watching, Playing, Competing

Custom statuses (online, idle, dnd)

📂 Configuration

All sensitive information is stored in the .env file:

TOKEN=YOUR_BOT_TOKEN
CLIENT_SECRET=YOUR_DISCORD_CLIENT_SECRET


Everything else is customizable inside config.js.

🚀 Perfect For

Secure communities

Product-based Discord servers

Verification-required servers

Anti-alt and anti-spam protection

Semi-automatic or fully-automatic membership systems
